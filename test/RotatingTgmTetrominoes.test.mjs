import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/TgmTetromino.mjs";

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       IIII
       ....
       ....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });
});

/*describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;

  test.skip("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       TTT.
       .T..`
    );
  });

  test.skip("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..`
    );
  });

  test.skip("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       .TT.
       .T..`
    );
  });
});*/

/*describe("The L shape", () => {
  const shape = Tetromino.L_SHAPE;

  test.skip("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       LLL.
       L...`
    );
  });

  test.skip("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `LL..
       .L..
       .L..`
    );
  });

  test.skip("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.L..
       .L..
       .LL.`
    );
  });
});*/

/*describe("The J shape", () => {
  const shape = Tetromino.J_SHAPE;

  test.skip("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       JJJ.
       ..J.`
    );
  });

  test.skip("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.J..
       .J..
       JJ..`
    );
  });

  test.skip("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.JJ.
       .J..
       .J..`
    );
  });
});*/

/*describe("The S shape", () => {
  const shape = Tetromino.S_SHAPE;

  test.skip("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       .SS.
       SS..`
    );
  });

  test.skip("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `S...
       SS..
       .S..`
    );
  });

  test.skip("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `S...
       SS..
       .S..`
    );
  });
});*/

/*describe("The Z shape", () => {
  const shape = Tetromino.Z_SHAPE;

  test.skip("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       ZZ..
       .ZZ.`
    );
  });

  test.skip("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..Z.
       .ZZ.
       .Z..`
    );
  });

  test.skip("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..Z.
       .ZZ.
       .Z..`
    );
  });
});*/

/*describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  test.skip("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  test.skip("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  test.skip("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });
});*/
