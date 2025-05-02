export class RotatingShape {
  constructor(rotations, index = 0) {
    this.rotations = RotatingShape.deepFreeze(rotations);
    this.index = index;
  }

  rotateRight() {
    const newIndex = (this.index + 1) % this.rotations.length;

    return new RotatingShape(this.rotations, newIndex);
  }

  rotateLeft() {
    const newIndex = (this.index + this.rotations.length - 1) % this.rotations.length;

    return new RotatingShape(this.rotations, newIndex);
  }

  toString() {
    return this.shape.map((row) => row.join("")).join("\n") + "\n";
  }

  get shape() {
    return this.rotations[this.index];
  }

  static deepFreeze(obj) {
    if (Array.isArray(obj)) {
      obj.forEach(RotatingShape.deepFreeze);
    }
    return Object.freeze(obj);
  }
}
