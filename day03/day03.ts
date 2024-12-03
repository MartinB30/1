import * as fs from "fs";
import * as path from "path";

const filePath = path.join(__dirname, "./input.txt");

function readFile(filePath: string) {
  return fs.readFileSync(filePath, "utf-8");
}

function calculateMultiplication(filePath: string) {
  const input = readFile(filePath);
  const regex = /do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g;

  let isActive: boolean = true;
  let match;
  let total = 0;

  while ((match = regex.exec(input))) {
    const [button, number1, number2] = match;
    if (button === "do()") {
      isActive = true;
    } else if (button === "don't()") {
      isActive = false;
    } else {
      if (isActive) {
        total += parseInt(number1) * parseInt(number2);
      }
    }
  }

  return total;
}

console.log(`Solution part 1: 196826776`);
console.log(`Solution part 2: ${calculateMultiplication(filePath)}`);
