import { PostParams } from '@/models/api/conversation';

import { handlePostMessage } from '../conversation/util';

export async function POST(request: Request) {
  const params: PostParams = await request.json();
  const { prompt } = params;
  return handlePostMessage([
    {
      role: "system",
      content:
        "You are a code generator. You only generate code without explain in details. You will add comments to explain blocks code.",
    },

    { role: "user", content: prompt },
  ]);
}
