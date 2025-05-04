import { MovableShape } from "./MovableShape.mjs";
import { TgmTetromino } from "./TgmTetromino.mjs";

export class Board {
  width;
  height;
  boardArr;
  fallingShape;

  constructor(width, height, boardArr) {
    this.width = width;
    this.height = height;
    this.boardArr = boardArr
      ? boardArr
      : Array(height)
          .fill(".")
          .map(() => Array(width).fill("."));

    this.fallingShape = null;
    this.listeners = [];
  }

  drop(block) {
    if (this.fallingShape) {
      throw new Error("already falling");
    }

    let shape = block instanceof TgmTetromino ? block : new TgmTetromino([block], [block]);

    const positionRow = this.topRowOffset(shape.rotatingShape.shape);
    const positionCol = Math.floor((this.width - shape.rotatingShape.shape[0].length) / 2);

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

    this.clearFullLines();
  }

  clearFullLines() {
    const newBoard = [];

    for (let row of this.boardArr) {
      if (row.every((cell) => cell !== ".")) {
        continue;
      }
      newBoard.push(row);
    }

    const linesCleared = this.height - newBoard.length;

    for (let i = 0; i < linesCleared; i++) {
      newBoard.unshift(Array(this.width).fill(".")); // Empty rows on top
    }

    this.boardArr = newBoard;
  }

  tick() {
    this.moveDown();
  }

  hasFalling() {
    return this.fallingShape != null;
  }

  moveRight() {
    if (!this.fallingShape) return;

    const movedRight = this.fallingShape.moveRight();

    if (movedRight.validateMove(this.boardArr)) {
      this.fallingShape = movedRight;
    }
  }

  moveLeft() {
    if (!this.fallingShape) return;

    const movedLeft = this.fallingShape.moveLeft();

    if (movedLeft.validateMove(this.boardArr)) {
      this.fallingShape = movedLeft;
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
    this.tryRotate(this.fallingShape.rotateLeft());
  }

  rotateRight() {
    this.tryRotate(this.fallingShape.rotateRight());
  }

  topRowOffset(shape) {
    for (let row = 0; row < shape.length; row++) {
      if ([...shape[row]].some((char) => char !== ".")) {
        return -row;
      }
    }

    return -shape.length;
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
    const shape = this.fallingShape.shape.rotatingShape.shape;

    for (let col = 0; col < shape[0].length; col++) {
      for (let row = shape.length - 1; row >= 0; row--) {
        if (shape[row][col] !== ".") {
          const boardRow = this.fallingShape.positionRow + row + 1;
          const boardCol = this.fallingShape.positionCol + col;

          if (boardRow >= this.height || this.boardArr[boardRow][boardCol] !== ".") {
            return true;
          }

          break;
        }
      }
    }

    return false;
  }

  tryRotate(shape) {
    const moves = [shape, shape.moveLeft(), shape.moveRight()];

    for (let move of moves) {
      if (move.validateMove(this.boardArr)) {
        this.fallingShape = move;

        return;
      }
    }
  }

  addListener(listener) {
    this.listeners.push(listener);
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
