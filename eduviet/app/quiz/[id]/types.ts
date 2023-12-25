import { Answer, Question } from "@prisma/client";

export interface QuestionProps {
  question: Question & { answers: Answer[] };
}
