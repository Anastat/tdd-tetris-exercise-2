import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { TestTShape, TestOShape } from "./TestTetrominoes.mjs";

function moveToRight(board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

function moveDown(board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

describe("Rotating tetrominoes on board", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be rotated left on board", () => {
    board.drop(TestTShape);
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
    board.drop(TestTShape);
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
    board.drop(TestOShape);
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
    board.drop(TestTShape);
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

  test("I-shape can be rotated left", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
  });

  test("T-shape cannot be rotated if no space to rotate", () => {
    board.drop(TestTShape);
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    moveDown(board);
    board.drop(TestTShape);
    board.rotateLeft();
    moveToRight(board);
    board.tick();
    board.tick();
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .........T
       .......TTT
       ......TT.T
       .......T..`
    );
  });

  test("a rotated T-shaped piece stops when it collides with another tetromino and can fit empty space", () => {
    board.drop(TestTShape);
    moveDown(board);
    board.drop(TestTShape);
    board.tick();
    board.moveLeft();
    board.rotateRight();
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ...TT.....
       ...TT.....
       ...TTT....`
    );
  });
});
