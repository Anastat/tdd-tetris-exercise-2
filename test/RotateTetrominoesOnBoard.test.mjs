import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

describe("Rotating tetrominoes on board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be rotated left on board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be rotated right on board", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("position of the O-shaped tetramino is the same regardless of rotation", () => {
    board.drop(Tetromino.O_SHAPE);
    board.rotateRight();
    board.rotateLeft();
    board.rotateRight();
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("rotated left T-shape can move to right border", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveToRight(board);

    expect(board.toString()).to.equalShape(
      `.........T
       ........TT
       .........T
       ..........
       ..........
       ..........`
    );
  });
});
