"use client";
import React from "react";
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

const quizDetailFormSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(100),
  questions: z.array(z.object({ questionText: z.string().max(100) })),
  answers: z.array(
    z.object({
      localQuestionId: z.string(),
      answerText: z.string().max(50),
      isCorrect: z.boolean(),
    })
  ),
});

export default function CreateQuizPage() {
  const form = useForm<z.infer<typeof quizDetailFormSchema>>({
    resolver: zodResolver(quizDetailFormSchema),
    defaultValues: {
      title: "Sample Title Quiz",
      description: "Sample desciprtion quiz",
      questions: [],
      answers: [],
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const {
    fields: answerFields,
    append: appendAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  function handleRemoveQuestion(index: number, localQuestionId: string) {
    removeQuestion(index);
    const answerIndexes = form
      .getValues("answers")
      .map((answer, index) =>
        answer.localQuestionId === localQuestionId ? index : -1
      )
      .filter((index) => index !== -1);
    removeAnswer(answerIndexes);
  }

  function onSubmit(values: z.infer<typeof quizDetailFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="p-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Create Quiz</h2>
        <Button className="ml-auto" size="sm">
          Save Quiz
        </Button>
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <section className="flex gap-2">
            <FormField
              control={form.control}
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
              control={form.control}
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
                {questionFields.map((question, index) => (
                  <li
                    key={question.id}
                    className="flex items-start gap-6 pb-4 border-b border-dashed border-gray-200"
                  >
                    <div className="w-full">
                      <h3 className="text-lg font-bold mb-2">{`👉 Question ${
                        index + 1
                      }`}</h3>
                      <FormField
                        control={form.control}
                        name={`questions.${index}.questionText`}
                        render={({ field }) => (
                          <FormItem className="w-full mb-2">
                            <FormControl>
                              <Input placeholder="Question Text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Dynamic Form Array for Answers */}
                      <ol className="flex items-end gap-4">
                        {answerFields
                          .filter(
                            (answer) => answer.localQuestionId === question.id
                          )
                          .map((answer, answerIndex) => (
                            <li key={answer.id}>
                              <FormField
                                control={form.control}
                                name={`answers.${answerIndex}.answerText`}
                                render={({ field }) => (
                                  <FormItem className="w-full mt-1">
                                    <FormLabel className="flex justify-between items-center text-xs">
                                      <span>{`Answer ${answerIndex + 1}`}</span>
                                      <span className="inline-flex items-center gap-1">
                                        <label
                                          htmlFor={`answers.${answerIndex}.isCorrect`}
                                        >
                                          Correct?
                                        </label>
                                        <FormField
                                          control={form.control}
                                          name={`answers.${answerIndex}.isCorrect`}
                                          render={({ field }) => (
                                            <Checkbox
                                              checked={field.value}
                                              onCheckedChange={field.onChange}
                                              id={`answers.${answerIndex}.isCorrect`}
                                            ></Checkbox>
                                          )}
                                        />
                                      </span>
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
                          ))}
                        {/* Add Answer Button */}
                        <Button
                          onClick={() =>
                            appendAnswer({
                              localQuestionId: question.id,
                              answerText: "",
                              isCorrect: false,
                            })
                          }
                          variant={"secondary"}
                          size={"sm"}
                          className="gap-1"
                        >
                          <Plus size={20} /> Add Answer
                        </Button>
                      </ol>
                    </div>

                    <Button
                      size={"icon"}
                      variant={"outlineDestructive"}
                      onClick={() => handleRemoveQuestion(index, question.id)}
                      className="flex-shrink-0 mt-9"
                    >
                      <Trash />
                    </Button>
                  </li>
                ))}

                {/* Add Question Button */}
                <Button
                  onClick={() => appendQuestion({ questionText: "" })}
                  className="mt-6 w-fit gap-1"
                >
                  <Plus /> Add Question
                </Button>
              </ol>
            </CardContent>
          </Card>
        </form>
      </Form>
    </main>
  );
}
