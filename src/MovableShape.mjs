export class MovableShape {
  constructor(shape, row, col) {
    this.shape = shape;
    this.positionRow = row;
    this.positionCol = col;
  }

  rotateLeft() {
    let row = this.positionRow < 0 ? 0 : this.positionRow; // Special case for I-shape

    return new MovableShape(this.shape.rotateLeft(), row, this.positionCol);
  }

  rotateRight() {
    let row = this.positionRow < 0 ? 0 : this.positionRow;

    return new MovableShape(this.shape.rotateRight(), row, this.positionCol);
  }

  moveLeft() {
    return new MovableShape(this.shape, this.positionRow, this.positionCol - 1);
  }

  moveRight() {
    return new MovableShape(this.shape, this.positionRow, this.positionCol + 1);
  }

  moveDown() {
    return new MovableShape(this.shape, this.positionRow + 1, this.positionCol);
  }
}
