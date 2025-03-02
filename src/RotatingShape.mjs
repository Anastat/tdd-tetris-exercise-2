export class RotatingShape {
  static Direction = Object.freeze({
    LEFT: "left",
    RIGHT: "right",
  });

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

  rotate(direction) {
    const rotated = Array.from({ length: this.shape[0].length }, () => new Array(this.shape.length));

    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[0].length; j++) {
        const [newI, newJ] =
          direction === RotatingShape.Direction.RIGHT
            ? [j, this.shape.length - 1 - i]
            : [this.shape[0].length - 1 - j, i];

        rotated[newI][newJ] = this.shape[i][j];
      }
    }

    return new RotatingShape(rotated);
  }

  rotateRight() {
    return this.rotate(RotatingShape.Direction.RIGHT);
  }

  rotateLeft() {
    return this.rotate(RotatingShape.Direction.LEFT);
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
