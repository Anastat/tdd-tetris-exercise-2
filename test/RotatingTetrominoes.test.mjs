import { describe, test } from "vitest";
import { expect } from "chai";
import { TgmTetromino as Tetromino } from "../src/TgmTetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       TTT.
       .T..`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       .TT.
       .T..`
    );
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

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

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  test("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  test("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO.
       .OO.`
    );
  });

  test("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});

describe("The L shape", () => {
  const shape = Tetromino.L_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       LLL.
       L...`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `LL..
       .L..
       .L..`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.L..
       .L..
       .LL.`
    );
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The J shape", () => {
  const shape = Tetromino.J_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       JJJ.
       ..J.`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.J..
       .J..
       JJ..`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.JJ.
       .J..
       .J..`
    );
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The S shape", () => {
  const shape = Tetromino.S_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       .SS.
       SS..`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `S...
       SS..
       .S..`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `S...
       SS..
       .S..`
    );
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("The Z shape", () => {
  const shape = Tetromino.Z_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       ZZ..
       .ZZ.`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..Z.
       .ZZ.
       .Z..`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..Z.
       .ZZ.
       .Z..`
    );
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});
