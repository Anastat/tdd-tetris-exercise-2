import { TgmTetromino as Tetromino } from "../src/TgmTetromino.mjs";

const T_SHAPE = [
  [".", "T", "."],
  ["T", "T", "T"],
];

const I_SHAPE = [["I", "I", "I", "I", "."]];

export const TestTShape = new Tetromino([T_SHAPE], T_SHAPE);
export const TestIShape = new Tetromino([I_SHAPE], I_SHAPE);
