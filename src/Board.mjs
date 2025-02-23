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
    this.positionRow = 0;
    this.positionCol = Math.floor((this.width - this.fallingBlock.rotatingShape.shape.length) / 2);

    this.placeBlockOnBoard(this.fallingBlock.rotatingShape.shape);
  }

  placeBlockOnBoard(block) {
    for (let i = 0; i < block.length; i++) {
      for (let j = 0; j < block[i].length; j++) {
        this.boardArr[this.positionRow + i][this.positionCol + j] = block[i][j];
      }
    }
  }

  tick() {
    // Move block if next position is valid
    if (this.validateNextPosition()) {
      this.clearBlockOnBoard();
      this.positionRow++;
      this.boardArr[this.positionRow][this.positionCol] = this.fallingBlock.rotatingShape.shape.toString();
    }
  }

  validateNextPosition() {
    // If the bottom is reached or the next position is not an empty row
    if (this.positionRow + 1 == this.height || this.boardArr[this.positionRow + 1][this.positionCol] != ".") {
      this.fallingBlock = null;

      return false;
    }

    return true;
  }

  clearBlockOnBoard() {
    for (let i = this.positionRow; i < this.positionRow + this.fallingBlock.rotatingShape.rows; i++) {
      for (let j = this.positionCol; j < this.positionCol + this.fallingBlock.rotatingShape.cols; j++) {
        this.boardArr[i][j] = ".";
      }
    }
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
