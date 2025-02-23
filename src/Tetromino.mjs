import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  constructor(shape, height, width) {
    this.rotatingShape = new RotatingShape(shape, height, width);
  }

  static get T_SHAPE() {
    return new Tetromino([
      [".", "T", "."],
      ["T", "T", "T"],
      [".", ".", "."],
    ], 2, 3);
  }

  static get I_SHAPE() {
    return new Tetromino([
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      ["I", "I", "I", "I", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ], 1, 4);
  }

  static get O_SHAPE() {
    return new Tetromino([
      [".", "O", "O"],
      [".", "O", "O"],
      [".", ".", "."],
    ], 2, 2);
  }

  rotate(direction) {
    let slicedShape = this.sliceShape();

    if (this.equals(Tetromino.O_SHAPE)) return this;

    // Special case for I-shape
    if (slicedShape.length == 1) {
      direction = RotatingShape.Direction.RIGHT;
    } else if (slicedShape[0].length == 1) {
      direction = RotatingShape.Direction.LEFT;
    }

    const rotated = this.rotatingShape.rotate(direction).shape;

    return new Tetromino(rotated, slicedShape.length, slicedShape[0].length);
  }

  rotateRight() {
    return this.rotate(RotatingShape.Direction.RIGHT);
  }

  rotateLeft() {
    return this.rotate(RotatingShape.Direction.LEFT);
  }

  toString() {
    return this.rotatingShape.toString();
  }

  equals(tetromino) {
    return JSON.stringify(this.rotatingShape.shape) === JSON.stringify(tetromino.rotatingShape.shape);
  }

  sliceShape() {
    let minRow = this.rotatingShape.shape.length,
      maxRow = 0,
      minCol = this.rotatingShape.shape[0].length,
      maxCol = 0;

    for (let i = 0; i < this.rotatingShape.shape.length; i++) {
      for (let j = 0; j < this.rotatingShape.shape[0].length; j++) {
        if (this.rotatingShape.shape[i][j] !== ".") {
          minRow = Math.min(minRow, i);
          maxRow = Math.max(maxRow, i);
          minCol = Math.min(minCol, j);
          maxCol = Math.max(maxCol, j);
        }
      }
    }

    return this.rotatingShape.shape.slice(minRow, maxRow + 1).map((row) => row.slice(minCol, maxCol + 1));
  }
}
