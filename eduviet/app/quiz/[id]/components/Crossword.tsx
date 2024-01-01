import React from "react";
import { QuestionProps } from "../types";
import crosswordGenerator, {
  toTwoDimensionArray,
} from "@/lib/crossword-generator";
import { flatMap, sortBy } from "lodash-es";
import CrosswordItem from "./CrosswordItem";

export default function Crossword({ question }: QuestionProps) {
  const questions = question.children;
  const answers = flatMap(questions.map((c) => c.answers));
  const answerTexts = answers.map((a) => a.text);
  const crossword = crosswordGenerator(answerTexts, "Python");
  if (!crossword) return null;

  const { golden, positions } = crossword;
  const isGoldenHorizontal = false;
  const cellSize = 80;
  const detailPositions = sortBy(
    positions,
    (a) => a.location[isGoldenHorizontal ? 1 : 0]
  )
    .map((position) => ({
      position,
      question: questions.find(({ answers }) =>
        answers.some((a) => a.text === position.word)
      ),
    }))
    .filter(({ question }) => !!question);
  const goldenQuestion = questions.find(({ answers }) =>
    answers.some((a) => a.text === golden.word)
  );
  const twoDimensionArray = toTwoDimensionArray(crossword, isGoldenHorizontal);

  return (
    <section className="space-y-2">
      <h2>{question.title}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {question.explanation}
      </p>
      <table className="relative border-collapse">
        <tbody>
          {twoDimensionArray.map((row, index) => (
            <tr key={index}>
              {row.map((cell, colIndex) => (
                <td
                  className={cell && "border text-center"}
                  style={{
                    width: cellSize,
                    height: cellSize,
                    fontSize: `${cellSize * 0.5}px`,
                  }}
                  key={`${index}_${colIndex}`}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>

        {detailPositions.map(
          (position, index) =>
            position.question && (
              <CrosswordItem
                label={`${index + 1}`}
                cellSize={cellSize}
                wordPostion={position.position}
                key={position.position.word}
                question={position.question}
                className="bg-blue-100 border-black "
              />
            )
        )}

        {goldenQuestion && (
          <CrosswordItem
            label={<strong>Golden</strong>}
            question={goldenQuestion}
            cellSize={cellSize}
            wordPostion={golden}
            isHorizontal={false}
            className="bg-blue-300 border-black transition-opacity opacity-0 hover:opacity-95"
          />
        )}
      </table>
    </section>
  );
}
