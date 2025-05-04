import { describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { TestIShape } from "./helpers/TestTetrominoes.mjs";
import { moveDown } from "./helpers/TestHelpers.mjs";

describe("Validate board initial state", () => {
  let board;

  test("when initial view is not defined", () => {
    board = new Board(10, 7);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("when board has predefined view", () => {
    const boardState = [
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", "T", ".", ".", ".", ".", "."],
      [".", ".", ".", "T", "T", "T", ".", ".", "O", "O"],
      [".", ".", "I", "I", "I", "I", ".", ".", "O", "O"],
    ];

    board = new Board(10, 7, boardState);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT..OO
       ..IIII..OO`
    );
  });
});

describe("Clearing lines", () => {
  test("four lines cleared as the I-shape hits bottom", () => {
    const boardState = [
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      ["O", "O", "O", "O", ".", "O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", ".", "O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", ".", "O", "O", "O", "O", "O"],
      ["O", "O", "O", "O", ".", "O", "O", "O", "O", "O"],
    ];

    const board = new Board(10, 8, boardState);
    board.drop(TestIShape);
    board.rotateLeft();
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });
});
