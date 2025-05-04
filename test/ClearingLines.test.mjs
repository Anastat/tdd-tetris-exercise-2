import { beforeEach, describe, test, vi } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { TestIShape, TestTShape, TestLShape } from "./helpers/TestTetrominoes.mjs";
import { moveDown } from "./helpers/TestHelpers.mjs";
import { EventTypes } from "../src/constants/EventTypes.mjs";

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
  let board;
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

  beforeEach(() => {
    const clonedState = boardState.map((row) => [...row]);
    board = new Board(10, 8, clonedState);
  });

  test("four lines cleared as the I-shape hits bottom", () => {
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

  test("one line cleared when the T-shape hits other blocks", () => {
    board.drop(TestTShape);
    board.rotateLeft();
    board.rotateLeft();
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       OOOO.OOOOO
       OOOO.OOOOO
       OOOO.OOOOO`
    );
  });

  test("two lines cleared when rotated L-shape hits other blocks", () => {
    board.drop(TestLShape);
    board.rotateRight();
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ...LL.....
       OOOO.OOOOO
       OOOO.OOOOO`
    );
  });

  test.skip("notified listeners of 4 cleared lines", () => {
    const listener = {
      onEvent: vi.fn(),
    };

    board.addListener(listener);
    board.drop(TestIShape);
    board.rotateLeft();
    moveDown(board);

    expect(listener.onEvent).toHaveBeenCalledWith({ type: EventTypes.ROWS_CLEARED, count: 4 });
  });
});

describe("Clearing lines in middle", () => {
  let board;
  const boardState = [
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    ["O", "O", "O", "O", ".", "O", "O", "O", "O", "O"],
    ["O", "O", "O", ".", ".", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", ".", ".", "O", "O", "O", "O"],
    ["O", "O", "O", "O", ".", "O", "O", "O", "O", "O"],
  ];

  beforeEach(() => {
    const clonedState = boardState.map((row) => [...row]);
    board = new Board(10, 8, clonedState);
  });

  test("one line cleared when rotated L-shape hits other blocks", () => {
    board.drop(TestLShape);
    board.rotateRight();
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...LL.....
       OOO.LOOOOO
       OOOO..OOOO
       OOOO.OOOOO`
    );
  });

  test("two lines cleared when rotated I-shape hits bottom", () => {
    board.drop(TestIShape);
    board.rotateRight();
    moveDown(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........
       OOO.IOOOOO
       OOOOI.OOOO`
    );
  });
});
