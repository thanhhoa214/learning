"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { QuestionProps } from "../types";
import { useState } from "react";

const FormSchema = z.object({
  answer: z.string(),
});

export default function ShortAnswer({ question, onSubmit }: QuestionProps) {
  const [showHint, setShowHint] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { answer: "" },
  });

  function onFormSubmit(data: z.infer<typeof FormSchema>) {
    const isCorrect = question.answers.some(
      (a) => a.text.toLowerCase() === data.answer.toLowerCase()
    );
    onSubmit
      ? onSubmit(isCorrect)
      : toast({
          variant: isCorrect ? "default" : "destructive",
          title: `You submitted the ${
            isCorrect ? "correct" : "incorrect"
          } answer`,
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data.answer, null, 2)}
              </code>
            </pre>
          ),
        });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onFormSubmit)}
        className="w-full flex flex-col justify-center items-center space-y-6"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="flex flex-col justify-center items-center">
              <FormLabel className="text-2xl">{question.title}</FormLabel>
              <FormControl>
                <Input placeholder="Type your answer here" {...field} />
              </FormControl>
              {question.hint &&
                (showHint ? (
                  <FormDescription>{question.hint}</FormDescription>
                ) : (
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowHint(true)}
                  >
                    Show hint
                  </Button>
                ))}

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="max-w-80 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
