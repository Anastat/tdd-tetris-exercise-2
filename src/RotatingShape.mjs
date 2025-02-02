export class RotatingShape {
  constructor(shape) {
    this.shape = RotatingShape.deepFreeze(shape);
  }

  static deepFreeze(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(RotatingShape.deepFreeze);
    }
    return Object.freeze(obj);
  }

  static fromString(str) {
    const shapeArr = str.split(/\r?\n|\r|\n/g).map((line) => [...line.trim()]);
    return new RotatingShape(shapeArr);
  }

  rotateRight() {
    const rows = this.shape.length;
    const cols = this.shape[0].length;
    const rotated = Array.from({ length: cols }, () => new Array(rows));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        rotated[j][rows - 1 - i] = this.shape[i][j];
      }
    }
    return new RotatingShape(rotated);
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
