import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../../challenges/day06/input.txt");

function readFile(filePath: string) {
  const lines = fs.readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n");
  return lines.split("\n");
}

const townMap = readFile(filePath);

function movement(townMap: string[]) {
  const x: number = townMap[0].length;
  const y: number = townMap.length;
  const playerSymbols = ["^", "v", "<", ">"];
  let currentSymbol: string = "";
  let playerX: number = 0;
  let playerY: number = 0;

  //search Player position
  for (let i = 0; i < townMap.length; i++) {
    for (let j = 0; j < townMap[i].length; j++) {
      if (playerSymbols.includes(townMap[i][j])) {
        currentSymbol = townMap[i][j];
        playerX = j;
        playerY = i;
      }
    }
  }
  let isMoving = true;

  while (isMoving) {
    //console.log("--------------------");
    let playerNextX = playerX;
    let playerNextY = playerY;

    if (currentSymbol === "^") {
      playerNextY -= 1;
    } else if (currentSymbol === "v") {
      playerNextY += 1;
    } else if (currentSymbol === "<") {
      playerNextX -= 1;
    } else if (currentSymbol === ">") {
      playerNextX += 1;
    }

    if (succesfullyReachedTheBorder(playerNextX, playerNextY, townMap)) {
      isMoving = false;
      townMap[playerY] =
        townMap[playerY].substring(0, playerX) +
        "X" +
        townMap[playerY].substring(playerX + 1);
    } else if (checkCollision(playerNextX, playerNextY, townMap)) {
      currentSymbol = turnRight(currentSymbol);
    } else {
      townMap[playerY] =
        townMap[playerY].substring(0, playerX) +
        "X" +
        townMap[playerY].substring(playerX + 1);

      playerX = playerNextX;
      playerY = playerNextY;

      townMap[playerY] =
        townMap[playerY].substring(0, playerX) +
        currentSymbol +
        townMap[playerY].substring(playerX + 1);

      //console.log(townMap.join("\n"));
    }
    //console.log(townMap.join("\n"));
  }

  let count = 0;

  for (let i = 0; i < townMap.length; i++) {
    for (let j = 0; j < townMap[i].length; j++) {
      if (townMap[i][j] === "X") {
        count++;
      }
    }
  }

  return count;
}

function checkCollision(x: number, y: number, townMap: string[]) {
  if (townMap[y][x] === "#") {
    //console.log("Collision detected");
  }
  return townMap[y][x] === "#";
}

function turnRight(currentSymbol: string) {
  if (currentSymbol === "^") {
    return ">";
  } else if (currentSymbol === ">") {
    return "v";
  } else if (currentSymbol === "v") {
    return "<";
  } else {
    return "^";
  }
}

function succesfullyReachedTheBorder(x: number, y: number, townMap: string[]) {
  return (
    x === -1 || x === townMap[0].length || y === -1 || y === townMap.length
  );
}

console.log(movement(townMap));
