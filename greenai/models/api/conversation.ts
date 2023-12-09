import { CreateChatCompletionResponse } from 'openai';

export interface PostParams {
  prompt: string;
}

export type PostResponse = CreateChatCompletionResponse;
