import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { TestTShape, TestIShape } from "./TestTetrominoes.mjs";

function moveToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

function moveToLeft(board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function moveDown(board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

describe("Kick wall tetrominoes on board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling T-shape can be rotated with right wall kick", () => {
    board.drop(TestTShape);
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

  test("a falling T-shape can be rotated with left wall kick", () => {
    board.drop(TestTShape);
    board.rotateRight();
    moveToLeft(board);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("T-shape can be kicked from other tetromino", () => {
    board.drop(TestIShape);
    board.rotateLeft();
    moveDown(board);
    board.drop(TestTShape);
    board.moveRight();
    board.rotateRight();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....ITTT..
       ....I.T...
       ....I.....
       ....I.....`
    );
  });
});
