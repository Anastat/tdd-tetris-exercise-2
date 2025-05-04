import { TgmTetromino as Tetromino } from "../src/TgmTetromino.mjs";

const T_SHAPE = [
  [".", "T", "."],
  ["T", "T", "T"],
];

export const TestTShape = new Tetromino([T_SHAPE], T_SHAPE);
