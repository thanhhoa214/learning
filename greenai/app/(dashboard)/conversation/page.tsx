"use client";

import { useState } from 'react';

import axios from 'axios';
import Image from 'next/image';

import {
  Prompt,
  PromptSchema,
} from '@/components/internal/prompt';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import * as ConversationApi from '@/models/api/conversation';

import emptyIcon from '../../../public/empty.svg';

export default function ConversationPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ConversationApi.PostResponse | null>(
    null
  );

  async function onSubmit({ prompt }: PromptSchema) {
    try {
      setIsLoading(true);

      const params: ConversationApi.PostParams = { prompt };
      const { data } = await axios.post<ConversationApi.PostResponse>(
        "/api/conversation",
        params
      );
      setResponse(data);
    } catch (error: unknown) {
      console.log((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <Prompt
        placeholder="Tell me something about Viet Nam?"
        onSubmit={onSubmit}
      />
      <section className="mt-8 flex gap-4">
        {isLoading ? (
          <Skeleton className="w-full h-40 rounded-lg" />
        ) : response ? (
          <Card className="bg-gray-100 p-3">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  response.choices[0].message?.content?.replace(
                    /\n/gi,
                    "<br/>"
                  ) || "",
              }}
            ></div>
          </Card>
        ) : (
          <div className="w-full flex flex-col items-center gap-4">
            <Image priority width={128} src={emptyIcon} alt="Empty" />
            <p className="text-gray-400">Ask me something!</p>
          </div>
        )}
      </section>
    </main>
  );
}
