import { RotatingShape } from "./RotatingShape.mjs"

export class Tetromino {

  constructor(shape) {
    this.rotatingShape = new RotatingShape(shape);
  }

  static deepFreeze(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(Tetromino.deepFreeze);
    }
    return Object.freeze(obj);
  }

  static get T_SHAPE() {
    return new Tetromino([
      [".", "T", "."],
      ["T", "T", "T"],
      [".", ".", "."],
    ]);
  }

  static get I_SHAPE() {
    return new Tetromino([
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
      ["I", "I", "I", "I", "."],
      [".", ".", ".", ".", "."],
      [".", ".", ".", ".", "."],
    ]);
  }

  static get O_SHAPE() {
    return new Tetromino([
      [".", "O", "O"],
      [".", "O", "O"],
      [".", ".", "."],
    ]);
  }

  rotate(direction) {
    if (this.equals(Tetromino.O_SHAPE)) return this;

    let slicedShape = this.sliceShape();

    if (slicedShape.length == 1) {
      direction = RotatingShape.Direction.RIGHT;
    } else if (slicedShape[0].length == 1) {
      direction = RotatingShape.Direction.LEFT;
    }

    const rotated = this.rotatingShape.rotate(direction).shape;

    return new Tetromino(rotated);
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
    let minRow = this.rotatingShape.rows,
      maxRow = 0,
      minCol = this.rotatingShape.cols,
      maxCol = 0;

    for (let i = 0; i < this.rotatingShape.rows; i++) {
      for (let j = 0; j < this.rotatingShape.cols; j++) {
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
