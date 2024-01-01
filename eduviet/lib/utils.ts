import { QuestionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { questionTypeDictionary } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQuestionTypeGuidance(type: QuestionType) {
  return questionTypeDictionary[type];
}
