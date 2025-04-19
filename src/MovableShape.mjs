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

  validateMove(board) {
    let canMove = false;
    // If block located in shape in column other that 0
    let firstCol = this.positionCol + this.leftColOffset();
    let lastCol = this.positionCol + this.shape.rotatingShape.shape.length + this.rightColOffset() - 1;

    if (lastCol < board[0].length && firstCol >= 0) {
      for (let row = this.positionRow; row < this.positionRow + this.shape.block.length; row++) {
        canMove = board[row][lastCol] == "." && board[row][firstCol] == ".";

        if (!canMove) return false;
      }
    }

    return canMove;
  }

  rightColOffset() {
    let endCol = 0;

    for (let i = 0; i < this.shape.rotatingShape.shape.length; i++) {
      for (let j = 0; j < this.shape.rotatingShape.shape[0].length; j++) {
        if (this.shape.rotatingShape.shape[i][j] !== ".") {
          endCol = Math.max(endCol, j);
        }
      }
    }

    return endCol - this.shape.rotatingShape.shape[0].length + 1;
  }

  leftColOffset() {
    let startCol = this.shape.rotatingShape.shape[0].length;

    for (let i = 0; i < this.shape.rotatingShape.shape.length; i++) {
      for (let j = 0; j < this.shape.rotatingShape.shape[0].length; j++) {
        if (this.shape.rotatingShape.shape[i][j] !== ".") {
          startCol = Math.min(startCol, j);
        }
      }
    }

    return startCol;
  }
}
