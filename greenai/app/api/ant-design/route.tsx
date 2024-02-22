import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";
import { RunnableSequence } from "langchain/schema/runnable";

import { supabaseRetriver } from "../util";
import { PostParams } from "@/models/api/conversation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const params: PostParams = await request.json();
  const { prompt } = params;

  const llm = new ChatOpenAI();
  const standaloneTemplate = PromptTemplate.fromTemplate(
    'Generate the standalone question for the prompt "{original}"'
  );
  const answerTemplate =
    PromptTemplate.fromTemplate(`You are a helpful and enthusiastic support bot who can answer a given question about Scrimba based on the context provided. Try to find the answer in the context. If you really don't know the answer, say "I'm sorry, I don't know the answer to that." And direct the questioner to email help@scrimba.com. Don't try to make up an answer. Always speak as if you were chatting to a friend.
  context: {context}
  question: {question}
  `);

  /**
  // Full type-check within FString template
  const responseChain = standaloneTemplate
    .pipe(llm)
    .pipe(new StringOutputParser())
    .pipe(supabaseRetriver)
    .pipe((documents) => ({
      question: originalQuestion,
      context: documents.map((doc) => doc.pageContent).join("\n\n"),
    }))
    .pipe(answerTemplate);
  */

  // Non strict-typed. When mapping value, answerTemplate is no longer check its inputs.
  // But meaningful code, can connect multiple chains
  const standaloneChain = standaloneTemplate
    .pipe(llm)
    .pipe(new StringOutputParser())
    .pipe(supabaseRetriver)
    .pipe((documents) => documents.map((doc) => doc.pageContent).join("\n\n"));

  const responseChain = RunnableSequence.from([
    { question: () => prompt, context: standaloneChain },
    answerTemplate,
    llm,
    new StringOutputParser(),
  ]);

  const response = await responseChain.invoke({ original: prompt });
  console.log(response);

  return NextResponse.json<string>(response);

  // const params: PostParams = await request.json();
  // const { prompt } = params;
  // return handlePostMessage([
  //   {
  //     role: "system",
  //     content:
  //       "You are a code generator. You only generate code without explain in details. You will add comments to explain blocks code.",
  //   },

  //   { role: "user", content: prompt },
  // ]);
}
