import { describe, test } from "vitest";
import { expect } from "chai";
import { EventTypes } from "../src/constants/EventTypes.mjs";
import { ScoreCount } from "../src/ScoreCount.mjs";

describe("Score counting", () => {
  test.skip("calculates score correctly based on rows cleared", () => {
    const score = new ScoreCount();

    score.onEvent({ type: EventTypes.ROWS_CLEARED, count: 2 });
    expect(score.score).to.equal(100);

    score.onEvent({ type: EventTypes.ROWS_CLEARED, count: 1 });
    expect(score.score).to.equal(140);

    score.onEvent({ type: EventTypes.ROWS_CLEARED, count: 4 });
    expect(score.score).to.equal(1340);

    score.onEvent({ type: EventTypes.ROWS_CLEARED, count: 3 });
    expect(score.score).to.equal(1640);
  });

  test.skip("returns a score of 0 if the number of rows cleared is incorrect", () => {
    const score = new ScoreCount();

    score.onEvent({ type: EventTypes.ROWS_CLEARED, count: -1 });
    expect(score.score).to.equal(0);

    score.onEvent({ type: EventTypes.ROWS_CLEARED, count: 5 });
    expect(score.score).to.equal(0);

    score.onEvent({ type: EventTypes.ROWS_CLEARED, count: "a" });
    expect(score.score).to.equal(0);
  });

  test.skip("returns a score of 0 if event is different from rowsCleared", () => {
    const score = new ScoreCount();

    score.onEvent({ type: "rowsAdded", count: 1 });
    expect(score.score).to.equal(0);
  });
});
