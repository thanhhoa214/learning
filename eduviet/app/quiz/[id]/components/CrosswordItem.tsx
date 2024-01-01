"use client";
import { CrosswordResult } from "@/lib/crossword-generator";
import { cn, getQuestionTypeGuidance } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { startCase } from "lodash-es";
import QuestionRenderer from "./QuestionRenderer";
import { Question } from "@prisma/client";
import { QuestionProps } from "../types";

export default function CrosswordItem({
  wordPostion: { location, word },
  question,
  cellSize = 32,
  isHorizontal = true,
  className,
  label,
}: {
  wordPostion: CrosswordResult["golden"];
  question: Question;
  label: React.ReactNode;
  cellSize?: number;
  isHorizontal?: boolean;
  className?: string;
}) {
  let [x, y] = location;
  if (!isHorizontal) [x, y] = [y, x];
  const nonCrosswordQuestion = question as unknown as QuestionProps["question"];
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <div
          className="absolute group"
          style={{
            top: `${x * cellSize}px`,
            left: `${y * cellSize}px`,
          }}
        >
          <ol
            id={`${x}-${y}`}
            className={cn(
              "flex transition-opacity cursor-pointer rounded-lg border-4 ml-[-2px] mt-[-2px] opacity-0 hover:opacity-95",
              isHorizontal ? "" : "flex-col",
              className
            )}
          >
            {Array.from(word).map((c) => (
              <li
                key={`${word}-${c}`}
                className={cn("inline-flex justify-center items-center")}
                style={{
                  width: cellSize,
                  height: cellSize,
                  fontSize: `${cellSize * 0.5}px`,
                }}
              ></li>
            ))}
          </ol>
          <label
            htmlFor={`${x}-${y}`}
            className="absolute top-0 left-0 ml-2 mt-1 "
          >
            {label}
            {/* <span className="opacity-0 group-hover:opacity-90">
              ~ {question.title}
            </span> */}
          </label>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[100rem]">
        <DialogHeader className="flex-row items-center gap-2">
          <Badge className="w-fit">{startCase(question.type)}</Badge>
          <p className="!mt-0 text-sm text-gray-500">
            {getQuestionTypeGuidance(question.type).answer}
          </p>
        </DialogHeader>
        <QuestionRenderer question={nonCrosswordQuestion} />
      </DialogContent>
    </Dialog>
  );
}
