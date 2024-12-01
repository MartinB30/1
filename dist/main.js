"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const pathOfFile = path.join(__dirname, "input.txt");
const bothLists = readFile();
const santasFirstList = bothLists[0];
const santasSecondList = bothLists[1];
function readFile() {
    const fileContent = fs.readFileSync(pathOfFile, "utf-8");
    const lines = fileContent.split("\n");
    const leftList = [];
    const rightList = [];
    for (let line of lines) {
        const parts = line.split("   ");
        const number1 = parseInt(parts[0]);
        const number2 = parseInt(parts[1]);
        leftList.push(number1);
        rightList.push(number2);
    }
    return [leftList, rightList];
}
//Part 1
function calculateDifferencePart1(santasFirstList, santasSecondList) {
    const sortedFirstList = santasFirstList.sort();
    const sortedSecondList = santasSecondList.sort();
    let totalDifference = 0;
    for (let i = 0; i < sortedFirstList.length; i++) {
        const firstNumber = sortedFirstList[i];
        const secondNumber = sortedSecondList[i];
        if (firstNumber > secondNumber) {
            totalDifference += firstNumber - secondNumber;
        }
        else if (secondNumber > firstNumber) {
            totalDifference += secondNumber - firstNumber;
        }
    }
    return totalDifference;
}
const part1Difference = calculateDifferencePart1(santasFirstList, santasSecondList);
function countSimilar(santasFirstList, santasSecondList) {
    let score = 0;
    for (let i = 0; i < santasFirstList.length; i++) {
        const firstNumber = santasFirstList[i];
        const sameNumbersInSecondList = santasSecondList.filter((number) => number === firstNumber).length;
        score += firstNumber * sameNumbersInSecondList;
    }
    return score;
}
const part2Score = countSimilar(santasFirstList, santasSecondList);
console.log(part2Score);
