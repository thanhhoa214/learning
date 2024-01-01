import { filter, indexOf, intersection, max, sortBy, uniq } from "lodash-es";

export type CrosswordLocation = [number, number];
export interface CrosswordPosition {
  location: CrosswordLocation;
  word: string;
  /** [GoldenIndex, WordIndex] */
  intersection: CrosswordLocation;
}

export interface CrosswordResult {
  width: number;
  height: number;
  golden: Omit<CrosswordPosition, "intersection">;
  positions: CrosswordPosition[];
}

export function toTwoDimensionArray(
  result: CrosswordResult,
  isGoldenHorizontal = true
): string[][] {
  const { golden, positions } = result;

  let { width, height } = result;
  if (!isGoldenHorizontal) {
    width = result.height;
    height = result.width;
  }

  // Create an empty 2D array filled with empty strings
  const crosswordArray: string[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "")
  );

  // Fill the array with words from the golden and positions
  positions.forEach((position) => {
    const [x, y] = position.location;
    const word = position.word;
    for (let i = 0; i < word.length; i++) {
      if (isGoldenHorizontal) crosswordArray[y + i][x] = word[i];
      else crosswordArray[x][y + i] = word[i];
    }
  });

  for (let i = 0; i < golden.word.length; i++) {
    const char = golden.word[i];
    const [x, y] = golden.location;
    if (isGoldenHorizontal) crosswordArray[y][x + i] = char;
    else crosswordArray[x + i][y] = char;
  }

  return crosswordArray;
}
/**
 * Crossword generator
 * - Automatically filter out duplicated words
 */
function crosswordGenerator(
  words: string[],
  golden: string
): CrosswordResult | null {
  return findPossibleResult(words, golden);
}

function findPossibleResult(
  words: string[],
  golden: string
): CrosswordResult | null {
  const result: CrosswordResult = {
    width: 0,
    height: 0,
    golden: { location: [0, 0], word: golden },
    positions: [],
  };

  const minorWords = filter(uniq(words), (w) => w !== golden);
  const intersections: Array<{ word: string; chars: string[] }> = [];
  let goldenAsArray = Array.from(golden);

  // Find intersections
  for (const word of minorWords) {
    const intersect = intersection(Array.from(word), goldenAsArray);
    if (intersect.length === 0) return null;

    intersections.push({ word, chars: intersect });
  }

  // Find intersected indices and add positions
  const sortedIntersections = sortBy(intersections, "length");
  const highs: number[] = [];
  const lows: number[] = [];
  for (const { word, chars } of sortedIntersections) {
    for (const char of chars) {
      const indexInGolden = indexOf(goldenAsArray, char);
      const indexInWord = indexOf(word, char);
      if (indexInGolden === -1) continue;
      goldenAsArray = filter(goldenAsArray, (c) => c !== char);

      highs.push(indexInWord);
      lows.push(word.length - indexInWord - 1);

      result.positions.push({
        word,
        location: [0, 0],
        intersection: [golden.indexOf(char), indexInWord],
      });
      break;
    }
  }

  // Find width/height and arrange words
  result.width = golden.length;
  const maxHigh = max(highs);
  result.height = (maxHigh || 0) + (max(lows) || 0) + 1;
  const maxHighIndex = indexOf(highs, maxHigh);
  const goldenRowIndex = result.positions[maxHighIndex].intersection[1];
  result.golden.location = [0, goldenRowIndex];
  for (let index = 0; index < result.positions.length; index++) {
    const position = result.positions[index];
    position.location = [
      position.intersection[0],
      goldenRowIndex - highs[index],
    ];
  }

  return result;
}

export default crosswordGenerator;
