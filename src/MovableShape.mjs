export class MovableShape {
  constructor(shape, row, col) {
    this.shape = shape;
    this.positionRow = row;
    this.positionCol = col;
  }

  rotateLeft() {
    return new MovableShape(this.shape.rotateLeft(), this.positionRow, this.positionCol);
  }

  rotateRight() {
    return new MovableShape(this.shape.rotateRight(), this.positionRow, this.positionCol);
  }

  moveLeft() {
    return new MovableShape(this.shape, this.positionRow, this.positionCol - 1);
  }

  moveRight() {
    return new MovableShape(this.shape, this.positionRow, this.positionCol + 1);
  }
}
