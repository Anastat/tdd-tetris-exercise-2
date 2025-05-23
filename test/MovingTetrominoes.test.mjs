import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { TestTShape, TestOShape } from "./helpers/TestTetrominoes.mjs";
import { moveToLeft, moveToRight, moveDown } from "./helpers/TestHelpers.mjs";

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be moved right", () => {
    board.drop(TestTShape);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a tetromino cannot be moved right when reached the border", () => {
    board.drop(TestTShape);
    moveToRight(board);

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved left", () => {
    board.drop(TestTShape);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a tetromino cannot be moved left when reached the border", () => {
    board.drop(TestTShape);
    moveToLeft(board);

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("O-shape tetromino cannot be moved left when reached the border", () => {
    board.drop(TestOShape);
    moveToLeft(board);

    expect(board.toString()).to.equalShape(
      `OO........
       OO........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved down", () => {
    board.drop(TestOShape);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....OO....
       ....OO....
       ..........
       ..........
       ..........`
    );
  });

  test("O-shape tetromino stops when it reaches the bottom", () => {
    board.drop(TestOShape);
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`
    );
  });

  test("a falling tetromino cannot be moved right through other blocks", () => {
    board.drop(TestOShape);
    moveDown(board);
    board.drop(TestOShape);
    board.moveDown();
    board.moveLeft();
    board.moveLeft();
    board.moveDown();
    board.moveDown();
    board.moveRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..OO......
       ..OOOO....
       ....OO....`
    );
  });

  test("a falling tetromino cannot be moved left through other blocks", () => {
    board.drop(TestOShape);
    moveDown(board);
    board.drop(TestOShape);
    board.moveDown();
    board.moveRight();
    board.moveRight();
    board.moveDown();
    board.moveDown();
    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......OO..
       ....OOOO..
       ....OO....`
    );
  });

  test("a falling tetromino cannot be moved down through other blocks", () => {
    board.drop(TestOShape);
    moveDown(board);
    board.drop(TestOShape);
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....OO....
       ....OO....
       ....OO....
       ....OO....`
    );
  });
});
