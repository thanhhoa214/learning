import React from "react";
import { QuestionType } from "@prisma/client";
import MultipleChoice from "../../quiz/[id]/components/MultipleChoice";
import { QuestionProps } from "../../quiz/[id]/types";
import { prisma } from "@/lib/prisma";

import { IdParamsProp } from "@/types/missing.type";

const previewMap: Record<QuestionType, React.FC<QuestionProps>> = {
  multipleChoice: MultipleChoice,
  dragAndDrop: MultipleChoice,
  dragTheWords: MultipleChoice,
  fillInTheBlanks: MultipleChoice,
  matching: MultipleChoice,
  multipleResponse: MultipleChoice,
  trueOrFalse: MultipleChoice,
};

export default async function QuestionDetailPage({
  params: { id },
}: IdParamsProp) {
  const question = await prisma.question.findFirst({
    where: { id },
    include: { answers: true },
  });
  if (!question) return;
  const Component = previewMap[question.type];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold">Quiz Preview</h2>
      <Component question={question} />
    </div>
  );
}
