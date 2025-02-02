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

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }
}
