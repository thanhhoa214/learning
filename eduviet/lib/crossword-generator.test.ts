import { expect, expectTypeOf } from "vitest";
import crosswordGenerator from "./crossword-generator";

describe("Crossword Generator", () => {
  test("my types work properly", () => {
    expectTypeOf(crosswordGenerator).toBeFunction();
  });

  test("should return correct locations", () => {
    const result = crosswordGenerator(
      ["for loop", "try catch", "do while"],
      "Python"
    );
    expect(result).not.null;
    if (result) {
      expect(result.height).eq(13);
      expect(result.width).eq(6);
    }
  });
});
