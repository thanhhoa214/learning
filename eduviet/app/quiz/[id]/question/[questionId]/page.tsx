import React from "react";

import { IdParamsProp } from "@/types/missing.type";
import QuestionDetailPage from "@/app/question/[id]/page";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default async function QuestionDetailPreview({
  params,
}: IdParamsProp<"questionId">) {
  return (
    <>
      <QuestionDetailPage params={{ id: params.questionId }} />
      <Button variant="ghost" className="float-right">
        Next <ChevronRight />
      </Button>
    </>
  );
}
