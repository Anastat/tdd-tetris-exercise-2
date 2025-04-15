import { Tetromino } from "./Tetromino.mjs";
import { Block } from "./Block.mjs";
import { MovableShape } from "./MovableShape.mjs";

export class Board {
  width;
  height;
  boardArr;
  fallingShape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.boardArr = Array(height)
      .fill(".")
      .map(() => Array(width).fill("."));

    this.fallingShape = null;
  }

  drop(block) {
    if (this.fallingShape) {
      throw new Error("already falling");
    }

    let shape = block instanceof Tetromino ? block : new Block(block);
    const positionRow = this.topRowOffset(shape.rotatingShape.shape);
    const positionCol = Math.floor((this.width - shape.rotatingShape.shape.length) / 2);

    this.fallingShape = new MovableShape(shape, positionRow, positionCol);
  }

  placeBlockOnBoard() {
    for (let i = 0; i < this.fallingShape.shape.rotatingShape.shape.length; i++) {
      for (let j = 0; j < this.fallingShape.shape.rotatingShape.shape[0].length; j++) {
        if (this.fallingShape.shape.rotatingShape.shape[i][j] != ".")
          this.boardArr[this.fallingShape.positionRow + i][this.fallingShape.positionCol + j] =
            this.fallingShape.shape.rotatingShape.shape[i][j];
      }
    }
  }

  tick() {
    this.moveDown();
  }

  hasFalling() {
    return this.fallingShape != null;
  }

  moveRight() {
    if (!this.fallingShape) return;

    if (this.validateMoveRight()) {
      this.fallingShape = this.fallingShape.moveRight();
    }
  }

  moveLeft() {
    if (!this.fallingShape) return;

    if (this.validateMoveLeft()) {
      this.fallingShape = this.fallingShape.moveLeft();
    }
  }

  moveDown() {
    if (!this.fallingShape) return;

    // Move block if position below is valid
    if (this.validateMoveDown()) {
      this.fallingShape = this.fallingShape.moveDown();
    }
  }

  rotateLeft() {
    this.fallingShape = this.fallingShape.rotateLeft();
  }

  rotateRight() {
    this.fallingShape = this.fallingShape.rotateRight();
  }

  topRowOffset(shape) {
    for (let row = 0; row < shape.length; row++) {
      if ([...shape[row]].some((char) => char !== ".")) {
        return -row;
      }
    }

    return -shape.length;
  }

  leftColOffset() {
    let startCol = this.fallingShape.shape.rotatingShape.shape[0].length;

    for (let i = 0; i < this.fallingShape.shape.rotatingShape.shape.length; i++) {
      for (let j = 0; j < this.fallingShape.shape.rotatingShape.shape[0].length; j++) {
        if (this.fallingShape.shape.rotatingShape.shape[i][j] !== ".") {
          startCol = Math.min(startCol, j);
        }
      }
    }

    return startCol;
  }

  rightColOffset() {
    let endCol = 0;

    for (let i = 0; i < this.fallingShape.shape.rotatingShape.shape.length; i++) {
      for (let j = 0; j < this.fallingShape.shape.rotatingShape.shape[0].length; j++) {
        if (this.fallingShape.shape.rotatingShape.shape[i][j] !== ".") {
          endCol = Math.max(endCol, j);
        }
      }
    }

    return endCol - this.fallingShape.shape.rotatingShape.shape[0].length + 1;
  }

  validateMoveRight() {
    let canMoveRight = false;
    let edgeCol =
      this.fallingShape.positionCol + this.fallingShape.shape.rotatingShape.shape[0].length + this.rightColOffset();

    if (edgeCol < this.width) {
      for (
        let row = this.fallingShape.positionRow;
        row < this.fallingShape.positionRow + this.fallingShape.shape.rotatingShape.shape.length;
        row++
      ) {
        canMoveRight = this.boardArr[row][edgeCol] == ".";
      }
    }

    return canMoveRight;
  }

  validateMoveLeft() {
    let canMoveLeft = false;
    // If block located in shape in column other that 0
    let col = this.fallingShape.positionCol + this.leftColOffset();

    if (col > 0) {
      for (
        let row = this.fallingShape.positionRow;
        row < this.fallingShape.positionRow + this.fallingShape.shape.rotatingShape.shape.length;
        row++
      ) {
        canMoveLeft = this.boardArr[row][col - 1] == ".";
      }
    }
    return canMoveLeft;
  }

  validateMoveDown() {
    // If the bottom is reached or the next position is not an empty row
    if (
      this.fallingShape.positionRow -
        this.topRowOffset(this.fallingShape.shape.rotatingShape.shape) +
        this.fallingShape.shape.block.length ==
        this.height ||
      this.isBlockBelow()
    ) {
      this.placeBlockOnBoard();
      this.fallingShape = null;

      return false;
    }

    return true;
  }

  isBlockBelow() {
    const rowUnderBlock =
      this.fallingShape.positionRow -
      this.topRowOffset(this.fallingShape.shape.rotatingShape.shape) +
      this.fallingShape.shape.block.length;

    return this.boardArr[rowUnderBlock]
      .slice(
        this.fallingShape.positionCol + this.leftColOffset(),
        this.fallingShape.positionCol + this.fallingShape.shape.block[0].length
      )
      .some((el) => el != ".");
  }

  toString() {
    let str = "";

    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        let char = this.boardArr[row][col];

        if (this.fallingShape) {
          const shape = this.fallingShape.shape.rotatingShape.shape;
          const shapeRow = row - this.fallingShape.positionRow;
          const shapeCol = col - this.fallingShape.positionCol;

          if (
            shapeRow >= 0 &&
            shapeRow < shape.length &&
            shapeCol >= 0 &&
            shapeCol < shape[0].length &&
            shape[shapeRow][shapeCol] !== "."
          ) {
            char = shape[shapeRow][shapeCol];
          }
        }

        str += char;
      }
      str += "\n";
    }

    return str;
  }
}
