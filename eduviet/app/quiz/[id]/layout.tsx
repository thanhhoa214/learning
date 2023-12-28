import { Button } from "@/components/ui/button";
import { TableRow, TableCell, TableBody, Table } from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { startCase } from "lodash-es";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IdParamsProp } from "@/types/missing.type";
import { PenBox } from "lucide-react";

export default async function QuizDetailLayout({
  children,
  params: { id },
}: React.PropsWithChildren<IdParamsProp>) {
  const { questions, ...quiz } = await prisma.quiz.findFirstOrThrow({
    where: { id },
    include: { questions: { include: { answers: true } } },
  });

  return (
    <div className="p-4">
      <header className="flex gap-4 justify-between items-start mb-4 px-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
        <Button className="ml-auto gap-2" variant="outline">
          <PenBox /> Edit Quiz
        </Button>
      </header>

      <main className="flex gap-4">
        <div className="w-full overflow-x-auto">
          <Table className="w-full divide-y divide-gray-200">
            <TableBody className="bg-white divide-y divide-gray-200">
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <Badge>{startCase(question.type)}</Badge>
                    <h3>{question.title}</h3>
                    <p className="text-gray-500 text-xs">
                      {question.explanation}
                    </p>
                  </TableCell>
                  <TableCell>
                    {question.answers.map((a) => a.text).join(", ")}
                  </TableCell>
                  <TableCell>
                    <Link href={`/quiz/${quiz.id}/question/${question.id}`}>
                      <Button variant="outline">Preview</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <aside className="w-full space-y-4 h-[25rem] sticky top-28">
          {children}
        </aside>
      </main>
    </div>
  );
}
