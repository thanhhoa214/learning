"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import * as z from "zod";
import { Loader, Siren, Wand2 } from "lucide-react";
import { MultiSelect, OptionType } from "@/components/ui/multi-select";
import { QuestionType } from "@prisma/client";
import { startCase } from "lodash-es";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenerateQuestionResponse } from "@/app/question/api/generate/type";
import axios from "axios";
import LoadingButton from "@/components/molecules/LoadingButton";

const generateFormSchema = z.object({
  numberOfQuestion: z.coerce.number(),
  questionTypes: z.array(z.nativeEnum(QuestionType)),
  context: z.string().max(100),
});

export const questionTypes: OptionType[] = Object.values(QuestionType).map(
  (type) => ({
    value: type,
    label: startCase(type),
  })
);

export interface GenerateQuestionProps {
  quizTitle: string;
  onGenerate: (response: GenerateQuestionResponse) => void;
}

export default function GenerateQuestion({
  quizTitle,
  onGenerate,
}: GenerateQuestionProps) {
  const [loading, setLoading] = useState(false);
  const generateForm = useForm<z.infer<typeof generateFormSchema>>({
    resolver: zodResolver(generateFormSchema),
    defaultValues: {
      numberOfQuestion: 1,
      context: "",
      questionTypes: [QuestionType.multipleChoice],
    },
  });

  async function onSubmit({
    numberOfQuestion,
    questionTypes,
    context,
  }: z.infer<typeof generateFormSchema>) {
    setLoading(true);
    const { data } = await axios.post("/question/api/generate", {
      prompt: `Generate questionnaire ${numberOfQuestion} questions including question types (${questionTypes.join(
        ", "
      )}) for “${quizTitle}”. ${context}`,
    });
    // const data = {
    //   questions: [
    //     {
    //       question: {
    //         title: "What is Python?",
    //         explanation:
    //           "Python is a high-level programming language known for its simplicity and readability.",
    //         type: "multipleChoice",
    //       },
    //       answers: [
    //         { text: "A scripting language", isCorrect: true },
    //         { text: "A markup language", isCorrect: false },
    //         { text: "A compiled language", isCorrect: false },
    //         { text: "A low-level language", isCorrect: false },
    //       ],
    //     },
    //     {
    //       question: {
    //         title: "@@@ is Python?",
    //         explanation:
    //           "Python is a high-level programming language known for its simplicity and readability.",
    //         type: "multipleChoice",
    //       },
    //       answers: [
    //         { text: "@@ ## ipting language", isCorrect: true },
    //         { text: "@@ ## kup language", isCorrect: false },
    //         { text: "@@ ## piled language", isCorrect: false },
    //         { text: "@@ ## -level language", isCorrect: false },
    //       ],
    //     },
    //   ],
    // }
    setLoading(false);
    onGenerate(data);
  }

  return (
    <Alert variant="info" className="mb-4">
      <Siren className="h-6 w-6" />
      <AlertTitle className="ml-2">Generate questions with AI</AlertTitle>
      <AlertDescription className="ml-2 text-black">
        <Form {...generateForm}>
          <form onSubmit={generateForm.handleSubmit(onSubmit)}>
            Generate questionnaire{" "}
            <FormField
              control={generateForm.control}
              name="numberOfQuestion"
              render={({ field }) => (
                <FormItem className="w-14 inline-block text-center">
                  <FormControl>
                    <Input
                      inputSize="sm"
                      min={1}
                      {...field}
                      type="number"
                      className="text-center"
                    />
                  </FormControl>
                </FormItem>
              )}
            />{" "}
            questions including question types{" "}
            <FormField
              control={generateForm.control}
              name="questionTypes"
              render={({ field }) => (
                <MultiSelect
                  selected={field.value}
                  options={questionTypes}
                  {...field}
                  className="w-fit inline-block"
                />
              )}
            />{" "}
            for “{quizTitle}”.{" "}
            <FormField
              control={generateForm.control}
              name="context"
              render={({ field }) => (
                <Input
                  inputSize="sm"
                  placeholder='Addtional information such as "For grade-5 student", "4 answers for each question"'
                  {...field}
                  className="mt-1"
                />
              )}
            />
            <LoadingButton className="mt-2">
              {loading ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <Wand2 size={16} />
              )}{" "}
              Generate questions
            </LoadingButton>
          </form>
        </Form>
      </AlertDescription>
    </Alert>
  );
}
