"use client";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { MoreVertical, Trash } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Quiz } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";

export interface QuizCardProps {
  quiz: Quiz;
  questionCount: number;
}

export default function QuizCard({ quiz, questionCount }: QuizCardProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const { toast } = useToast();

  async function handleRemoveQuiz() {
    setIsDeleted(true);
    await axios.delete("/quiz/api/" + quiz.id);
    toast({ description: `Delete "${quiz.title}" successfully` });
  }

  if (isDeleted) return null;
  return (
    <Card key={quiz.id}>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="mb-1">{quiz.title}</CardTitle>
            <p className="text-sm leading-4 text-gray-600">
              {quiz.description}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem
                className="!text-red-500"
                onClick={handleRemoveQuiz}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Remove</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <strong>Questions Count: {questionCount}</strong>
      </CardContent>
      <CardFooter>
        <Link href={"/quiz/" + quiz.id}>
          <Button>Detail</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
