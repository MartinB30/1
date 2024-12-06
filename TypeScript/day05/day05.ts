import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../challenges/day05/input.txt");

function readFile(filePath: string, isUpdate: boolean = false) {
  const file = fs.readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n");
  const [rules, updates] = file.split("\n\n");

  return isUpdate
    ? updates.split("\n").map((line) => line.trim())
    : rules.split("\n").map((line) => line.trim());
}

function parser(input: string[], isUpdate: boolean = false) {
  return isUpdate
    ? input.map((line) => line.split(",").map((number) => parseInt(number)))
    : input.map((line) => line.split("|").map((number) => parseInt(number)));
}

function isUpdateValid(update: number[], rules: number[][]) {
  for (const [x, y] of rules) {
    const indexX = update.indexOf(x);
    const indexY = update.indexOf(y);

    if (indexX !== -1 && indexY !== -1 && indexX > indexY) {
      return false;
    }
  }
  return true;
}

function solutionPart1(rules: number[][], updates: number[][]): number {
  let totalMiddleSum = 0;

  for (let update of updates) {
    if (isUpdateValid(update, rules)) {
      const middleIndex = Math.floor(update.length / 2);
      const middleValue = update[middleIndex];

      totalMiddleSum += middleValue;
    }
  }

  return totalMiddleSum;
}

const parsedRules = parser(readFile(filePath));
const parsedUpdates = parser(readFile(filePath, true), true);

console.log(solutionPart1(parsedRules, parsedUpdates));

function orderUpdate(update: number[], rules: number[][]): number[] {
    return update.sort((a, b) => {
        for (const [x, y] of rules) {
            if (a === x && b === y) return -1;
            if (a === y && b === x) return 1;
        }
        return 0;
    });
}

function solutionPart2(rules: number[][], updates: number[][]): number {
    let totalMiddleSum = 0;

    for (let update of updates) {
        if (!isUpdateValid(update, rules)) {
            const orderedUpdate = orderUpdate(update, rules);
            const middleIndex = Math.floor(orderedUpdate.length / 2);
            const middleValue = orderedUpdate[middleIndex];

            totalMiddleSum += middleValue;
        }
    }

    return totalMiddleSum;
}

console.log(solutionPart2(parsedRules, parsedUpdates));