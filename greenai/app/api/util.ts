import { createHash } from 'crypto';
import {
  Configuration,
  OpenAIApi,
} from 'openai';

const openaiConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(openaiConfiguration);

export function getHashedUserId(userId: string) {
  return createHash("md5").update(userId).digest("hex");
}
