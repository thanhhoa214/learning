import QuestionRenderer from "@/app/quiz/[id]/components/QuestionRenderer";
import { queryQuestionDetail } from "@/app/util/queries/question.query";
import { IdParamsProp } from "@/types/missing.type";
import React from "react";

export default async function QuestionDetailPage({
  params: { id },
}: IdParamsProp) {
  const question = await queryQuestionDetail(id);
  if (!question) return null;
  return (
    <div className="p-4">
      {question && <QuestionRenderer question={question} />}
    </div>
  );
}
