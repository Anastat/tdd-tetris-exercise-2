import { describe, test, expect } from "vitest";
import { ShuffleBag } from "../src/ShuffleBag.mjs";
import { TgmTetromino as Tetromino } from "../src/TgmTetromino.mjs";

describe("Shuffle bag", () => {
  const tetrominoes = [Tetromino.I_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE];

  test("all tetrominoes appear once per round", () => {
    const bag = new ShuffleBag();
    tetrominoes.forEach((tetromino) => bag.add(tetromino));
    const pulled = [];

    for (let i = 0; i < tetrominoes.length; i++) {
      pulled.push(bag.next());
    }

    expect(new Set(pulled)).to.eql(new Set(tetrominoes));
  });

  test("tetrominoes repeat in second round", () => {
    const bag = new ShuffleBag();
    tetrominoes.forEach((tetromino) => bag.add(tetromino));
    const firstRound = [];
    const secondRound = [];

    for (let i = 0; i < tetrominoes.length; i++) {
      firstRound.push(bag.next());
    }

    for (let i = 0; i < tetrominoes.length; i++) {
      secondRound.push(bag.next());
    }

    expect(new Set(firstRound)).to.eql(new Set(secondRound));
  });

  test("tetrominoes in different order in 2 rounds", () => {
    const bag = new ShuffleBag();
    tetrominoes.forEach((tetromino) => bag.add(tetromino, 5));
    const firstRound = [];
    const secondRound = [];

    for (let i = 0; i < bag.blocks.length; i++) {
      firstRound.push(bag.next());
    }

    for (let i = 0; i < bag.blocks.length; i++) {
      secondRound.push(bag.next());
    }

    expect(firstRound).to.not.eql(secondRound); // There is a chance that it might fail
  });
});
