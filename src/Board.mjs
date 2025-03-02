import { Tetromino } from "./Tetromino.mjs";
import { Block } from "./Block.mjs";

export class Board {
  width;
  height;
  boardArr;
  positionRow;
  positionCol;
  fallingShape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.positionRow = 0;
    this.positionCol = 0;
    this.boardArr = Array(height)
      .fill(".")
      .map(() => Array(width).fill("."));

    this.fallingShape = null;
  }

  drop(block) {
    if (this.fallingShape) {
      throw new Error("already falling");
    }

    this.fallingShape = block instanceof Tetromino ? block : new Block(block);
    this.positionRow = 0;
    this.positionCol = Math.floor((this.width - this.fallingShape.rotatingShape.shape.length) / 2);

    this.placeBlockOnBoard();
  }

  placeBlockOnBoard() {
    for (let i = 0; i < this.fallingShape.rotatingShape.height; i++) {
      for (let j = 0; j < this.fallingShape.rotatingShape.width; j++) {
        this.boardArr[this.positionRow + i][this.positionCol + j] = this.fallingShape.rotatingShape.shape[i][j];
      }
    }
  }

  tick() {
    if (!this.fallingShape) return;

    // Move block if next position is valid
    if (this.validateNextPosition()) {
      this.clearBlockOnBoard();
      this.positionRow++;
      this.placeBlockOnBoard();
    }
  }

  validateNextPosition() {
    // If the bottom is reached or the next position is not an empty row
    if (this.positionRow + this.fallingShape.rotatingShape.height == this.height || this.isBlockBelow()) {
      this.fallingShape = null;

      return false;
    }

    return true;
  }

  clearBlockOnBoard() {
    for (let i = this.positionRow; i < this.positionRow + this.fallingShape.rotatingShape.height; i++) {
      for (let j = this.positionCol; j < this.positionCol + this.fallingShape.rotatingShape.width; j++) {
        this.boardArr[i][j] = ".";
      }
    }
  }

  isBlockBelow() {
    const rowUnderBlock = this.positionRow + this.fallingShape.rotatingShape.height;

    return this.boardArr[rowUnderBlock]
      .slice(this.positionCol, this.positionCol + this.fallingShape.rotatingShape.width)
      .some((el) => el != ".");
  }

  hasFalling() {
    return this.fallingShape != null;
  }

  moveLeft() {
    if (!this.fallingShape) return;

    if (this.positionCol + this.fallingShape.rotatingShape.width < this.width) {
      this.clearBlockOnBoard();
      this.positionCol++;
      this.placeBlockOnBoard();
    }
  }

  moveRight() {
    if (!this.fallingShape) return;

    if (this.positionCol > 0) {
      this.clearBlockOnBoard();
      this.positionCol--;
      this.placeBlockOnBoard();
    }
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
