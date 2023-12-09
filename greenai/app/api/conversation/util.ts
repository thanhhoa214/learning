import { NextResponse } from 'next/server';
import { ChatCompletionRequestMessage } from 'openai';

import { PostResponse } from '@/models/api/conversation';
import { auth } from '@clerk/nextjs';

import {
  getHashedUserId,
  openai,
} from '../util';

export async function handlePostMessage(
  messages: ChatCompletionRequestMessage[]
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { data } = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      user: getHashedUserId(userId),
    });
    return NextResponse.json<PostResponse>(data);
  } catch (error) {
    console.log(error);

    return new NextResponse("Internal error", { status: 500 });
  }
}
