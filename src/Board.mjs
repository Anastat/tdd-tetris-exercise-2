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
    // If block located in shape in column other that 0
    this.positionCol += this.colOffset();

    this.placeBlockOnBoard();
  }

  placeBlockOnBoard() {
    for (let i = 0; i < this.fallingShape.block.length; i++) {
      for (let j = 0; j < this.fallingShape.block[0].length; j++) {
        this.boardArr[this.positionRow + i][this.positionCol + j] = this.fallingShape.block[i][j];
      }
    }
  }

  tick() {
    this.moveDown();
  }

  clearBlockOnBoard() {
    let shapeRow = 0;
    let shapeCol = 0;
    for (let i = this.positionRow; i < this.positionRow + this.fallingShape.block.length; i++) {
      for (let j = this.positionCol; j < this.positionCol + this.fallingShape.block[0].length; j++) {
        if (this.fallingShape.block[shapeRow][shapeCol] !== ".") this.boardArr[i][j] = ".";
        shapeCol++;
      }
      shapeRow++;
    }
  }

  hasFalling() {
    return this.fallingShape != null;
  }

  moveRight() {
    if (!this.fallingShape) return;

    if (this.validateMoveRight()) {
      this.clearBlockOnBoard();
      this.positionCol++;
      this.placeBlockOnBoard();
    }
  }

  moveLeft() {
    if (!this.fallingShape) return;

    if (this.validateMoveLeft()) {
      this.clearBlockOnBoard();
      this.positionCol--;
      this.placeBlockOnBoard();
    }
  }

  moveDown() {
    if (!this.fallingShape) return;

    // Move block if position below is valid
    if (this.validateMoveDown()) {
      this.clearBlockOnBoard();
      this.positionRow++;
      this.placeBlockOnBoard();
    }
  }

  rotateLeft() {
    this.clearBlockOnBoard()
    this.fallingShape = this.fallingShape.rotateLeft();
    this.placeBlockOnBoard();
  }

  colOffset() {
    let startCol = this.fallingShape.rotatingShape.shape[0].length;

    for (let i = 0; i < this.fallingShape.rotatingShape.shape.length; i++) {
      for (let j = 0; j < this.fallingShape.rotatingShape.shape[0].length; j++) {
        if (this.fallingShape.rotatingShape.shape[i][j] !== ".") {
          startCol = Math.min(startCol, j);
        }
      }
    }

    return startCol;
  }

  validateMoveRight() {
    let canMoveRight = false;

    if (this.positionCol + this.fallingShape.block[0].length < this.width) {
      const col = this.positionCol + this.fallingShape.block[0].length;
      for (let row = this.positionRow; row < this.positionRow + this.fallingShape.block.length; row++) {
        canMoveRight = this.boardArr[row][col] == ".";
      }
    }

    return canMoveRight;
  }

  validateMoveLeft() {
    let canMoveLeft = false;
    if (this.positionCol > 0) {
      for (let row = this.positionRow; row < this.positionRow + this.fallingShape.block.length; row++) {
        canMoveLeft = this.boardArr[row][this.positionCol - 1] == ".";
      }
    }
    return canMoveLeft;
  }

  validateMoveDown() {
    // If the bottom is reached or the next position is not an empty row
    if (this.positionRow + this.fallingShape.block.length == this.height || this.isBlockBelow()) {
      this.fallingShape = null;

      return false;
    }

    return true;
  }

  isBlockBelow() {
    const rowUnderBlock = this.positionRow + this.fallingShape.block.length;

    return this.boardArr[rowUnderBlock]
      .slice(this.positionCol, this.positionCol + this.fallingShape.block[0].length)
      .some((el) => el != ".");
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
