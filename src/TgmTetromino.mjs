import { RotatingShape } from "./TgmRotatingShape.mjs";

export class Tetromino {
  constructor(rotations, block, currentRotation) {
    this.rotatingShape = new RotatingShape(rotations, currentRotation);
    this.block = block;
  }

  rotateLeft() {
    const rotated = this.rotatingShape.rotateLeft();
    const slicedShape = this.sliceShape(rotated.shape);

    return new Tetromino(rotated.rotations, slicedShape, rotated.index);
  }

  rotateRight() {
    const rotated = this.rotatingShape.rotateRight();
    const slicedShape = this.sliceShape(rotated.shape);

    return new Tetromino(rotated.rotations, slicedShape, rotated.index);
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

  toString() {
    return this.rotatingShape.toString();
  }

  get shape() {
    return this.rotatingShape.shape;
  }

  static get T_SHAPE() {
    return new Tetromino(
      [
        [
          [".", ".", ".", "."],
          ["T", "T", "T", "."],
          [".", "T", ".", "."],
        ],
        [
          [".", "T", ".", "."],
          ["T", "T", ".", "."],
          [".", "T", ".", "."],
        ],
        [
          [".", ".", ".", "."],
          [".", "T", ".", "."],
          ["T", "T", "T", "."],
        ],
        [
          [".", "T", ".", "."],
          [".", "T", "T", "."],
          [".", "T", ".", "."],
        ],
      ],
      [
        ["T", "T", "T"],
        [".", "T", "."],
      ]
    );
  }

  static get I_SHAPE() {
    return new Tetromino(
      [
        [
          [".", ".", ".", "."],
          ["I", "I", "I", "I"],
          [".", ".", ".", "."],
          [".", ".", ".", "."],
        ],
        [
          [".", ".", "I", "."],
          [".", ".", "I", "."],
          [".", ".", "I", "."],
          [".", ".", "I", "."],
        ],
      ],
      [["I", "I", "I", "I"]]
    );
  }

  static get J_SHAPE() {
    return new Tetromino(
      [
        [
          [".", ".", ".", "."],
          ["J", "J", "J", "."],
          [".", ".", "J", "."],
        ],
        [
          [".", "J", ".", "."],
          [".", "J", ".", "."],
          ["J", "J", ".", "."],
        ],
        [
          [".", ".", ".", "."],
          ["J", ".", ".", "."],
          ["J", "J", "J", "."],
        ],
        [
          [".", "J", "J", "."],
          [".", "J", ".", "."],
          [".", "J", ".", "."],
        ],
      ],
      [
        ["J", "J", "J"],
        [".", ".", "J"],
      ]
    );
  }

  static get S_SHAPE() {
    return new Tetromino(
      [
        [
          [".", ".", "."],
          [".", "S", "S"],
          ["S", "S", "."],
        ],
        [
          ["S", ".", "."],
          ["S", "S", "."],
          [".", "S", "."],
        ],
      ],
      [
        [".", "S", "S"],
        ["S", "S", "."],
      ]
    );
  }

  static get Z_SHAPE() {
    return new Tetromino(
      [
        [
          [".", ".", "."],
          ["Z", "Z", "."],
          [".", "Z", "Z"],
        ],
        [
          [".", ".", "Z"],
          [".", "Z", "Z"],
          [".", "Z", "."],
        ],
      ],
      [
        ["Z", "Z", "."],
        [".", "Z", "Z"],
      ]
    );
  }

  static get O_SHAPE() {
    return new Tetromino(
      [
        [
          [".", "O", "O", "."],
          [".", "O", "O", "."],
        ],
      ],
      [
        ["O", "O"],
        ["O", "O"],
      ]
    );
  }
}
