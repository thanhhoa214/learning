import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { QuestionProps } from "../types";

const result = "ABCD";

export default function MultipleChoice({ question }: QuestionProps) {
  return (
    <section className="space-y-2">
      <h2>{question.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {question.explanation}
      </p>
      <div className="space-y-1">
        {question.answers.map((answer, index) => (
          <Button
            key={answer.id}
            className={cn(
              "w-full justify-start text-left",
              answer.isCorrect && "bg-green-200"
            )}
            variant="outline"
          >
            {result[index]}. {answer.text}
            {answer.isCorrect && <Badge className="ml-2">Correct</Badge>}
          </Button>
        ))}
      </div>
    </section>
  );
}
