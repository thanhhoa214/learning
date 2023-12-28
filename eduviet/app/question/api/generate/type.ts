import { ZodArray, ZodObject, ZodRawShape, ZodType, z } from "zod";
import { Prisma, QuestionType } from "@prisma/client";
import zodToJsonSchema from "zod-to-json-schema";

interface GenerateQuestionRequest {
  prompt: string;
}

interface ExpectedReturnSchema extends ZodRawShape {
  questions: ZodArray<
    ZodType<{
      question: Pick<
        Prisma.QuestionCreateInput,
        "title" | "explanation" | "type"
      >;
      answers: Pick<Prisma.AnswerCreateInput, "text" | "isCorrect">[];
    }>
  >;
}

const expectedReturnSchema = z.object<ExpectedReturnSchema>({
  questions: z.array(
    z.object({
      question: z.object({
        title: z.string(),
        explanation: z.string(),
        type: z.nativeEnum(QuestionType),
      }),
      answers: z.array(z.object({ text: z.string(), isCorrect: z.boolean() })),
    })
  ),
});

const openaiExtractionFunctionSchema = {
  name: "extractor",
  description: "Extracts fields from the input.",
  parameters: zodToJsonSchema(expectedReturnSchema),
};

type GenerateQuestionResponse = z.infer<typeof expectedReturnSchema>;

export { openaiExtractionFunctionSchema };
export type { GenerateQuestionRequest, GenerateQuestionResponse };
