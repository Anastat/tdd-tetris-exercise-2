import { RotatingShape } from "./RotatingShape.mjs";

export class Block {
  constructor(shape, block = shape) {
    this.rotatingShape = new RotatingShape(shape);
    this.block = block;
  }

  toString() {
    this.rotatingShape.toString();
  }
}
