import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

describe("Kick wall tetrominoes on board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling T-shape can be rotated with right wall kick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    moveToRight(board);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });
});
