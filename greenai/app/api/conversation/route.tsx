import { NextResponse } from 'next/server';

import { PostParams } from '@/models/api/conversation';

import { handlePostMessage } from './util';

export async function POST(request: Request) {
  const params: PostParams = await request.json();
  const { prompt } = params;
  if (!prompt)
    return new NextResponse("Please provide a prompt", { status: 400 });

  return handlePostMessage([{ role: "user", content: prompt }]);
}
