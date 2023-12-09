import { NextResponse } from 'next/server';

import {
  PostParams,
  PostResponse,
} from '@/models/api/image';
import { auth } from '@clerk/nextjs';

import {
  getHashedUserId,
  openai,
} from '../util';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const params: PostParams = await request.json();
    const { prompt, amount = 1, size = "512x512" } = params;

    if (!userId) return new NextResponse("Unauthorized", { status: 401 });
    if (!prompt)
      return new NextResponse("Please provide a prompt", { status: 400 });
    if (!amount)
      return new NextResponse("'amount' is required", { status: 400 });
    if (!size) return new NextResponse("'size' is required", { status: 400 });

    const { data } = await openai.createImage({
      prompt,
      n: amount,
      size,
      user: getHashedUserId(userId),
    });
    return NextResponse.json<PostResponse>({
      data,
      params,
    });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
