import { TgmTetromino as Tetromino } from "../src/TgmTetromino.mjs";

const T_SHAPE = [
  [".", "T", "."],
  ["T", "T", "T"],
];

const T_SHAPE_ROTATIONS = [
  [
    [".", "T", "."],
    ["T", "T", "T"],
    [".", ".", "."],
  ],
  [
    [".", "T", "."],
    [".", "T", "T"],
    [".", "T", "."],
  ],
  [
    [".", ".", "."],
    ["T", "T", "T"],
    [".", "T", "."],
  ],
  [
    [".", "T", "."],
    ["T", "T", "."],
    [".", "T", "."],
  ],
];

const I_SHAPE = [["I", "I", "I", "I", "."]];

const I_SHAPE_ROTATIONS = [
  [
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    ["I", "I", "I", "I", "."],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
  ],

  [
    [".", ".", "I", ".", "."],
    [".", ".", "I", ".", "."],
    [".", ".", "I", ".", "."],
    [".", ".", "I", ".", "."],
    [".", ".", ".", ".", "."],
  ],
];

const O_SHAPE = [
  ["O", "O"],
  ["O", "O"],
];

export const TestTShape = new Tetromino(T_SHAPE_ROTATIONS, T_SHAPE);
export const TestIShape = new Tetromino(I_SHAPE_ROTATIONS, I_SHAPE);
export const TestOShape = new Tetromino([O_SHAPE], O_SHAPE);
