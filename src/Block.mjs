import { RotatingShape } from "./RotatingShape.mjs";

export class Block {
  constructor(shape) {
    this.rotatingShape = new RotatingShape(shape);
  }

  toString() {
    this.rotatingShape.toString();
  }
}
