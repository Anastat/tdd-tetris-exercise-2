export class Board {
  width;
  height;
  boardArr;
  positionRow;
  positionCol;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.positionRow = 0;
    this.positionCol = Math.floor(this.width / 2);
    this.boardArr = Array(height)
      .fill(".")
      .map(() => Array(width).fill("."));
  }

  drop(block) {
    if (this.positionRow == 0 && this.boardArr[this.positionRow].every((cell) => cell === ".")) {
      this.boardArr[this.positionRow][this.positionCol] = block;
    } else {
      throw new Error("already falling");
    }
  }

  tick() {
    let block = this.boardArr[this.positionRow][this.positionCol];
    const oldRow = this.positionRow;
    this.positionRow++;

    if (this.hasFalling()) {
      this.boardArr[this.positionRow][this.positionCol] = block;
      this.boardArr[oldRow][this.positionCol] = ".";
    }
  }

  validatePosition() {
    if (this.positionRow == this.height - 1) this.positionRow = 0;
  }

  hasFalling() {
    return this.positionRow < this.height;
  }

  toString() {
    let str = "";

    for (let i = 0; i < this.boardArr.length; i++) {
      for (let j = 0; j < this.boardArr[i].length; j++) {
        str += this.boardArr[i][j];
      }
      str += "\n";
    }

    return str;
  }
}
