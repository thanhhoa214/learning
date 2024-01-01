import { QuestionType } from "@prisma/client";
import Crossword from "@/app/quiz/[id]/components/Crossword";
import MultipleChoice from "./MultipleChoice";
import { QuestionProps } from "../types";
import ShortAnswer from "./ShortAnswer";

const previewMap: Record<QuestionType, React.FC<QuestionProps>> = {
  multipleChoice: MultipleChoice,
  dragAndDrop: MultipleChoice,
  dragTheWords: MultipleChoice,
  fillInTheBlanks: MultipleChoice,
  matching: MultipleChoice,
  multipleResponse: MultipleChoice,
  trueOrFalse: MultipleChoice,
  crossword: Crossword,
  shortAnswer: ShortAnswer,
};

export default function QuestionRenderer({ question }: QuestionProps) {
  const Component = previewMap[question.type];
  return question && <Component question={question} />;
}
