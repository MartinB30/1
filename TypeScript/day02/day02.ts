import * as fs from "fs";
import * as path from "path";

function countSafeReport() {
  const data = readFile(path.join(__dirname, "../../challenges/day02/input.txt"));
  const lines = data.map((line) => getNumbers(line));
  let count = 0;

  for (let i = 0; i < lines.length; i++) {
    if (isSafe(lines[i]) || isSafeWithRemoval(lines[i])) {
      count++;
    }
  }
  return count;
}

function isSafe(numbers: number[]) {
  for (let i = 0; i < numbers.length; i++) {
    const diff = numbers[i + 1] - numbers[i];

    if (diff === 0 || diff > 3 || diff < -3) {
      return false;
    }

    if (i > 0) {
      const prevDiff = numbers[i] - numbers[i - 1];
      if ((prevDiff > 0 && diff < 0) || (prevDiff < 0 && diff > 0)) {
        return false;
      }
    }
  }
  return true;
}

function isSafeWithRemoval(numbers: number[]) {
  for (let i = 0; i < numbers.length; i++) {
    const sliceCurrent = numbers.slice(0, i);
    const sliceNext = numbers.slice(i + 1);
    const modifiedList = sliceCurrent.concat(sliceNext);

    if (isSafe(modifiedList)) {
      return true;
    }
  }
  return false;
}

function readFile(filePath: string) {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return fileContent.split("\n");
}

function getNumbers(line: string) {
  return line
    .split(" ")
    .map((currentNumber) => parseInt(currentNumber.trim(), 10));
}

console.log(`Solution part 1: 242`);
console.log(`Solution part 2: ${countSafeReport()}`);
