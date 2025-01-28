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
    this.boardArr[this.positionRow][this.positionCol] = block;
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
