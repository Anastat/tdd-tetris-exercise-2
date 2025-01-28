export class Board {
  width;
  height;
  boardArr;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.boardArr = Array(height)
      .fill(".")
      .map(() => Array(width).fill("."));
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
