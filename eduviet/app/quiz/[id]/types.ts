import { QueryQuestionDetailType } from "@/app/util/queries/question.query";

export interface QuestionProps {
  question: NonNullable<QueryQuestionDetailType>;
  onSubmit?: (isCorrect: boolean) => void;
}
