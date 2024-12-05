import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../challenges/day04/input.txt");
const exampleFilePath = path.join(
  __dirname,
  "../../challenges/day04/example.txt"
);
const example2FilePath = path.join(
  __dirname,
  "../../challenges/day04/example2.txt"
);

function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

function findXmas(filePath: string) {
  const lines = readFile(filePath)
    .split("\n")
    .map((line) => line.trim());
  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    for (let j = 0; j < currentLine.length; j++) {
      const isHorizontalForward = j <= currentLine.length - 4;
      const isHorizontalBackward = j >= 3;
      const isVerticalDown = i <= lines.length - 4;
      const isVerticalUp = i >= 3;
      const isDiagonalRightDown =
        j <= currentLine.length - 4 && i <= lines.length - 4;
      const isDiagonalRightUp = j <= currentLine.length - 4 && i >= 3;
      const isDiagonalLeftDown = j >= 3 && i <= lines.length - 4;
      const isDiagonalLeftUp = j >= 3 && i >= 3;

      if (isHorizontalForward) {
        if (
          currentLine[j] === "X" &&
          currentLine[j + 1] === "M" &&
          currentLine[j + 2] === "A" &&
          currentLine[j + 3] === "S"
        ) {
          total++;
        }
      }

      if (isHorizontalBackward) {
        if (
          currentLine[j] === "X" &&
          currentLine[j - 1] === "M" &&
          currentLine[j - 2] === "A" &&
          currentLine[j - 3] === "S"
        ) {
          total++;
        }
      }

      if (isVerticalDown) {
        if (
          lines[i][j] === "X" &&
          lines[i + 1][j] === "M" &&
          lines[i + 2][j] === "A" &&
          lines[i + 3][j] === "S"
        ) {
          total++;
        }
      }

      if (isVerticalUp) {
        if (
          lines[i][j] === "X" &&
          lines[i - 1][j] === "M" &&
          lines[i - 2][j] === "A" &&
          lines[i - 3][j] === "S"
        ) {
          total++;
        }
      }

      if (isDiagonalRightDown) {
        if (
          lines[i][j] === "X" &&
          lines[i + 1][j + 1] === "M" &&
          lines[i + 2][j + 2] === "A" &&
          lines[i + 3][j + 3] === "S"
        ) {
          total++;
        }
      }

      if (isDiagonalLeftDown) {
        if (
          lines[i][j] === "X" &&
          lines[i + 1][j - 1] === "M" &&
          lines[i + 2][j - 2] === "A" &&
          lines[i + 3][j - 3] === "S"
        ) {
          total++;
        }
      }

      if (isDiagonalRightUp) {
        if (
          lines[i][j] === "X" &&
          lines[i - 1][j + 1] === "M" &&
          lines[i - 2][j + 2] === "A" &&
          lines[i - 3][j + 3] === "S"
        ) {
          total++;
        }
      }

      if (isDiagonalLeftUp) {
        if (
          lines[i][j] === "X" &&
          lines[i - 1][j - 1] === "M" &&
          lines[i - 2][j - 2] === "A" &&
          lines[i - 3][j - 3] === "S"
        ) {
          total++;
        }
      }
    }
  }

  return total;
}

function findMas(filePath: string) {
  const lines = readFile(filePath)
    .split("\n")
    .map((line) => line.trim());

  let total = 0;
  for (let i = 1; i < lines.length - 1; i++) {
    const currentLine = lines[i];
    for (let j = 1; j < currentLine.length - 1; j++) {
      const currentChar = currentLine[j];
      const topLeftChar = lines[i - 1][j - 1];
      const topRightChar = lines[i - 1][j + 1];
      const bottomLeftChar = lines[i + 1][j - 1];
      const bottomRightChar = lines[i + 1][j + 1];

      if (currentChar === "A") {
        if (
          (topLeftChar === "M" && bottomRightChar === "S") ||
          (topLeftChar === "S" && bottomRightChar === "M")
        ) {
          if (
            (topRightChar === "M" && bottomLeftChar === "S") ||
            (topRightChar === "S" && bottomLeftChar === "M")
          ) {
            total++;
          }
        }
      }
    }
  }

  return total;
}

console.log(`Solution part 1: ${findXmas(filePath)}`);
console.log(`Solution part 2: ${findMas(filePath)}`);
