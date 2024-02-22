"use client";

import { useState } from "react";

import axios from "axios";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

import { Prompt, PromptSchema } from "@/components/internal/prompt";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import * as ConversationApi from "@/models/api/conversation";

import emptyIcon from "../../../public/empty.svg";

export default function CodePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function onSubmit({ prompt }: PromptSchema) {
    try {
      setIsLoading(true);

      const params: ConversationApi.PostParams = { prompt };
      const { data } = await axios.post<string>("/api/ant-design", params);
      setResponse(data);
    } catch (error: unknown) {
      console.log((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <Prompt placeholder="How to use Markdown in React" onSubmit={onSubmit} />
      <section className="mt-8 flex gap-4">
        {isLoading ? (
          <Skeleton className="w-full h-40 rounded-lg" />
        ) : response ? (
          <Card className="bg-gray-100 p-3">
            <ReactMarkdown
              components={{
                pre: ({ node, ...props }) => (
                  <div className="overflow-auto w-full bg-gray-800 text-white p-2 rounded-lg mt-2 mb-4">
                    <pre {...props} />
                  </div>
                ),
                code: ({ node, ...props }) => <code {...props} />,
              }}
            >
              {response}
            </ReactMarkdown>
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
