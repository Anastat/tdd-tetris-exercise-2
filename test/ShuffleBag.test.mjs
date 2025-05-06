import { describe, test, expect } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { TgmTetromino as Tetromino } from "../src/TgmTetromino.mjs";

describe("Shuffle bag", () => {
  const tetrominoes = [Tetromino.I_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE];

  test("all tetrominoes appear once per round", () => {
    const bag = new ShuffleBag();
    tetrominoes.forEach((tetromino) => bag.add(tetromino));
    const pulled = [];

    for (let i = 0; i < 3; i++) {
      pulled.push(bag.next());
    }

    expect(new Set(pulled)).to.eql(new Set(tetrominoes));
  });
});
