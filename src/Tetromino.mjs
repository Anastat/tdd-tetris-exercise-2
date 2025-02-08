export class Tetromino {
  static Direction = Object.freeze({
    LEFT: "left",
    RIGHT: "right",
  });

  constructor(shape) {
    this.rows = shape.length;
    this.cols = shape[0].length;
    this.shape = Tetromino.deepFreeze(shape);
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

  rotate(direction) {
    const rotated = Array.from({ length: this.cols }, () => new Array(this.rows));

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const [newI, newJ] = direction === Tetromino.Direction.RIGHT ? [j, this.rows - 1 - i] : [this.cols - 1 - j, i];

        rotated[newI][newJ] = this.shape[i][j];
      }
    }

    return new Tetromino(rotated);
  }

  rotateRight() {
    return this.rotate(Tetromino.Direction.RIGHT);
  }

  rotateLeft() {
    return this.rotate(Tetromino.Direction.LEFT);
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
