"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash } from "lucide-react";
import GenerateQuestion, {
  GenerateQuestionProps,
  questionTypes,
} from "../components/GenerateQuestion";
import { GenerateQuestionResponse } from "@/app/question/api/generate/type";
import { CreateQuizRequest, CreateQuizResponse } from "../api/type";
import { QuestionType } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/molecules/LoadingButton";

const quizDetailFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(200),
  questions: z.array(
    z.object({
      title: z.string().max(200),
      explanation: z.string().max(300),
      type: z.nativeEnum(QuestionType),
    })
  ),
  answers: z.array(
    z.object({
      questionKey: z.string(),
      text: z.string().max(100),
      isCorrect: z.boolean(),
    })
  ),
});

export default function CreateQuizPage() {
  const [loading, setLoading] = useState(false);
  const [generatedAnswersPayload, setGeneratedAnswersPayload] = useState<{
    previousQuestionKeys: string[];
    generatedQuestions: GenerateQuestionResponse["questions"];
  } | null>(null);
  const quizForm = useForm<z.infer<typeof quizDetailFormSchema>>({
    resolver: zodResolver(quizDetailFormSchema),
    defaultValues: {
      title: "Fundamental Programming with Python",
      description: "Questions on Python syntax, if-else, and for loop.",
      questions: [],
      answers: [],
    },
  });
  const { toast } = useToast();
  const router = useRouter();

  const questionsField = useFieldArray({
    control: quizForm.control,
    name: "questions",
    keyName: "key",
  });

  const answersField = useFieldArray({
    control: quizForm.control,
    name: "answers",
  });

  useEffect(() => {
    if (!generatedAnswersPayload) return;
    const { generatedQuestions = [], previousQuestionKeys } =
      generatedAnswersPayload;
    const newQuestionFields = questionsField.fields.filter(
      (q) => !previousQuestionKeys.includes(q.key)
    );

    for (const question of generatedQuestions) {
      const questionField = newQuestionFields.find(
        (q) => q.title === question.question.title
      );
      if (!questionField) continue;
      answersField.append(
        question.answers.map((a) => ({ ...a, questionKey: questionField.key })),
        { shouldFocus: false }
      );
    }

    setGeneratedAnswersPayload(null);
  }, [answersField, generatedAnswersPayload, questionsField.fields]);

  function handleRemoveQuestion(index: number, questionKey: string) {
    questionsField.remove(index);
    const answerIndexes = quizForm
      .getValues("answers")
      .map((answer, index) => (answer.questionKey === questionKey ? index : -1))
      .filter((index) => index !== -1);
    answersField.remove(answerIndexes);
  }

  const onGenerateQuestion: GenerateQuestionProps["onGenerate"] = ({
    questions,
  }) => {
    if (!questions) return;
    questionsField.append(
      questions.map(({ question }) => ({
        title: question.title,
        explanation: question.explanation || "",
        type: question.type,
      }))
    );
    setGeneratedAnswersPayload({
      generatedQuestions: questions,
      previousQuestionKeys: questionsField.fields.map((f) => f.key),
    });
  };

  async function onSubmit(values: z.infer<typeof quizDetailFormSchema>) {
    setLoading(true);
    const request: CreateQuizRequest = {
      quiz: { title: values.title, description: values.description },
      questions: questionsField.fields.map((q) => ({
        question: { title: q.title, explanation: q.explanation, type: q.type },
        answers: values.answers
          .filter((a) => a.questionKey === q.key)
          .map((a) => ({
            text: a.text,
            isCorrect: a.isCorrect,
          })),
      })),
    };

    const { data: quiz } = await axios.post<
      CreateQuizRequest,
      AxiosResponse<CreateQuizResponse>
    >("/quiz/api", request);

    setLoading(false);
    toast({
      title: `Created quiz "${quiz.title}"`,
      description: `Quiz with ${quiz.title} created successfully`,
      action: (
        <ToastAction
          altText="See detail"
          onClick={() => router.push(`/quiz/${quiz.id}`)}
        >
          See detail
        </ToastAction>
      ),
    });
  }

  return (
    <main className="p-4">
      <Form {...quizForm}>
        <form onSubmit={quizForm.handleSubmit(onSubmit)} className="mb-4">
          <header className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">Create Quiz</h2>
            <LoadingButton className="ml-auto" size="sm" isLoading={loading}>
              Save Quiz
            </LoadingButton>
          </header>

          <section className="flex flex-col gap-4 ">
            <section className="flex gap-2">
              <FormField
                control={quizForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-80">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Quiz Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={quizForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Quiz Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle>Questions</CardTitle>
                <CardDescription>
                  Enter the details of the questions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="flex flex-col gap-4">
                  {/* Dynamic Form Array for Questions and Answers */}
                  {questionsField.fields.map((question, index) => (
                    <li
                      key={question.key}
                      className="flex items-start gap-6 pb-4 border-b border-dashed border-gray-200"
                    >
                      <div className="w-full">
                        <h3 className="text-lg font-bold mb-2">{`👉 Question ${
                          index + 1
                        }`}</h3>
                        <div className="flex gap-2 mb-2">
                          <FormField
                            control={quizForm.control}
                            name={`questions.${index}.type`}
                            render={({ field }) => (
                              <FormItem className="w-full max-w-44">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Type" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {questionTypes.map((type) => (
                                      <SelectItem
                                        value={type.value}
                                        key={type.value}
                                      >
                                        {type.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={quizForm.control}
                            name={`questions.${index}.title`}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <Input placeholder="Question Text" {...field} />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={quizForm.control}
                          name={`questions.${index}.explanation`}
                          render={({ field }) => (
                            <FormItem className="w-full mb-2">
                              <FormControl>
                                <Input
                                  placeholder="Answer explanation: why the answer is 'ABC'?"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* Dynamic Form Array for Answers */}
                        <ol className="flex items-end gap-4">
                          {answersField.fields.map(
                            (answer, answerIndex) =>
                              answer.questionKey === question.key && (
                                <li key={answer.id}>
                                  <FormField
                                    control={quizForm.control}
                                    name={`answers.${answerIndex}.text`}
                                    render={({ field }) => (
                                      <FormItem className="w-full mt-1">
                                        <FormLabel className="flex justify-end items-center gap-1 text-xs">
                                          <label
                                            htmlFor={`answers.${answerIndex}.isCorrect`}
                                          >
                                            Correct?
                                          </label>
                                          <FormField
                                            control={quizForm.control}
                                            name={`answers.${answerIndex}.isCorrect`}
                                            render={({ field: checkField }) => (
                                              <Checkbox
                                                checked={checkField.value}
                                                onCheckedChange={
                                                  checkField.onChange
                                                }
                                                id={`answers.${answerIndex}.isCorrect`}
                                              ></Checkbox>
                                            )}
                                          />
                                        </FormLabel>
                                        <FormControl>
                                          <Input
                                            placeholder="Answer Text"
                                            inputSize="sm"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </li>
                              )
                          )}
                          {/* Add Answer Button */}
                          <Button
                            onClick={() =>
                              answersField.append({
                                questionKey: question.key,
                                text: "",
                                isCorrect: false,
                              })
                            }
                            variant={"secondary"}
                            size={"sm"}
                            className="gap-1"
                            type="button"
                          >
                            <Plus size={20} /> Add Answer
                          </Button>
                        </ol>
                      </div>

                      <Button
                        size={"icon"}
                        type="button"
                        variant={"outlineDestructive"}
                        onClick={() =>
                          handleRemoveQuestion(index, question.key)
                        }
                        className="flex-shrink-0 mt-9"
                      >
                        <Trash />
                      </Button>
                    </li>
                  ))}

                  {/* Add Question Button */}
                  <Button
                    type="button"
                    onClick={() =>
                      questionsField.append({
                        title: "",
                        explanation: "",
                        type: "multipleChoice",
                      })
                    }
                    className="mt-6 w-fit gap-1"
                  >
                    <Plus /> Add Question
                  </Button>
                </ol>
              </CardContent>
            </Card>
          </section>
        </form>
      </Form>

      <GenerateQuestion
        quizTitle={quizForm.watch("title")}
        onGenerate={onGenerateQuestion}
      />
    </main>
  );
}
