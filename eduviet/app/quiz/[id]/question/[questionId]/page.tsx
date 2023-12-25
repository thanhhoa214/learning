import React from "react";

import { IdParamsProp } from "@/types/missing.type";
import QuestionDetailPage from "@/app/question/[id]/page";

export default async function QuestionDetailPreview({
  params,
}: IdParamsProp<"questionId">) {
  return <QuestionDetailPage params={{ id: params.questionId }} />;
}
