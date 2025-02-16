import { Tetromino } from "./Tetromino.mjs";
import { Block } from "./Block.mjs";

export class Board {
  width;
  height;
  boardArr;
  positionRow;
  positionCol;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.positionRow = 0;
    this.positionCol = 0;
    this.boardArr = Array(height)
      .fill(".")
      .map(() => Array(width).fill("."));

    this.fallingBlock = null;
  }

  drop(block) {
    if (this.fallingBlock) {
      throw new Error("already falling");
    }

    this.fallingBlock = block instanceof Tetromino ? block : new Block(block);
    this.placeBlockOnBoard(this.fallingBlock.rotatingShape.shape.toString());
  }

  placeBlockOnBoard(block) {
    this.positionRow = 0;
    this.positionCol = Math.floor(this.width / 2) - Math.floor(block.length / 2);
    this.boardArr[this.positionRow][this.positionCol] = block;
  }

  tick() {
    const oldRow = this.positionRow;
    this.positionRow++;

    // Move block if position is valid
    if (this.validatePosition()) {
      this.boardArr[this.positionRow][this.positionCol] = this.fallingBlock.rotatingShape.shape.toString();
      this.boardArr[oldRow][this.positionCol] = ".";
    }
  }

  validatePosition() {
    // If the bottom is reached or the next position is not an empty row
    if (this.positionRow == this.height || this.boardArr[this.positionRow][this.positionCol] != ".") {
      this.fallingBlock = null;

      return false;
    }

    return true;
  }

  hasFalling() {
    return this.fallingBlock != null;
  }

  toString() {
    let str = "";

    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        str += this.boardArr[i][j];
      }
      str += "\n";
    }

    return str;
  }
}
