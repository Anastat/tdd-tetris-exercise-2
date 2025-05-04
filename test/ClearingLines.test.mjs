import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";

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
