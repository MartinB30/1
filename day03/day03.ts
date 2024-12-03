import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "./input.txt");

function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

function calculateMultiplication(filePath: string) {
  const input = readFile(filePath);
  const regex = /mul\((\d+),(\d+)\)/g;

  let match;
  let total = 0;

  while ((match = regex.exec(input))) {
    const x = parseInt(match[1]);
    const y = parseInt(match[2]);
    total += x * y;
  }

  return total;
}

console.log(calculateMultiplication(filePath));
