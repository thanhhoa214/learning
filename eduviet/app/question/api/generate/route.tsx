import { NextRequest } from "next/server";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import {
  openaiExtractionFunctionSchema,
  GenerateQuestionRequest,
  GenerateQuestionResponse,
} from "./type";
/**
 * See a full list of supported models at:
 * https://js.langchain.com/docs/modules/model_io/models/
 */
const model = new ChatOpenAI({ modelName: "gpt-3.5-turbo" }).bind({
  functions: [openaiExtractionFunctionSchema],
  function_call: { name: "extractor" },
});

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const { prompt } = (await req.json()) as GenerateQuestionRequest;
  const { additional_kwargs } = await model.invoke([new HumanMessage(prompt)]);
  const extractionReturns = additional_kwargs.function_call
    ? (JSON.parse(
        additional_kwargs.function_call.arguments
      ) as GenerateQuestionResponse)
    : null;
  return Response.json(extractionReturns);
}
