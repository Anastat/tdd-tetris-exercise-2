import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  constructor(shape, block) {
    this.rotatingShape = new RotatingShape(shape);
    this.block = block;
  }

  static get T_SHAPE() {
    return new Tetromino(
      [
        [".", "T", "."],
        ["T", "T", "T"],
        [".", ".", "."],
      ],
      [
        [".", "T", "."],
        ["T", "T", "T"],
      ]
    );
  }

  static get I_SHAPE() {
    return new Tetromino(
      [
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
        ["I", "I", "I", "I", "."],
        [".", ".", ".", ".", "."],
        [".", ".", ".", ".", "."],
      ],
      [["I", "I", "I", "I"]]
    );
  }

  static get O_SHAPE() {
    return new Tetromino(
      [
        [".", "O", "O"],
        [".", "O", "O"],
        [".", ".", "."],
      ],
      [
        ["O", "O"],
        ["O", "O"],
      ]
    );
  }

  rotate(direction) {
    if (this.equals(Tetromino.O_SHAPE)) return this;

    // Special case for I-shape
    if (this.block.length == 1) {
      direction = RotatingShape.Direction.RIGHT;
    } else if (this.block[0].length == 1) {
      direction = RotatingShape.Direction.LEFT;
    }

    const rotated = this.rotatingShape.rotate(direction).shape;
    let slicedShape = this.sliceShape(rotated);

    return new Tetromino(rotated, slicedShape);
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

  sliceShape(shape) {
    let minRow = shape.length,
      maxRow = 0,
      minCol = shape[0].length,
      maxCol = 0;

    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[0].length; j++) {
        if (shape[i][j] !== ".") {
          minRow = Math.min(minRow, i);
          maxRow = Math.max(maxRow, i);
          minCol = Math.min(minCol, j);
          maxCol = Math.max(maxCol, j);
        }
      }
    }

    return shape.slice(minRow, maxRow + 1).map((row) => row.slice(minCol, maxCol + 1));
  }
}
