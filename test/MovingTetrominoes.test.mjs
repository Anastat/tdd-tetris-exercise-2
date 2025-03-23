import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function moveToLeft(board) {
  for (let i = 0; i < 5; i++) {
    board.moveLeft();
  }
}

function moveToRight(board) {
  for (let i = 0; i < 5; i++) {
    board.moveRight();
  }
}

function moveDown(board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

describe("Moving tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
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
    board.drop(Tetromino.T_SHAPE);
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
    board.drop(Tetromino.T_SHAPE);
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
    board.drop(Tetromino.T_SHAPE);
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
    board.drop(Tetromino.O_SHAPE);
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
    board.drop(Tetromino.O_SHAPE);
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
    board.drop(Tetromino.O_SHAPE);
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
    board.drop(Tetromino.O_SHAPE);
    moveDown(board);
    board.drop(Tetromino.O_SHAPE);
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

  test.skip("a falling tetromino cannot be moved left through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);
    moveDown(board);
    board.drop(Tetromino.O_SHAPE);
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
    board.drop(Tetromino.O_SHAPE);
    moveDown(board);
    board.drop(Tetromino.O_SHAPE);
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
