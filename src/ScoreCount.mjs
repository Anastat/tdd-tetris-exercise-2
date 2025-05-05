import { EventTypes } from "./constants/EventTypes.mjs";
export class ScoreCount {
  constructor() {
    this.score = 0;
  }

  onEvent(event) {
    if (event.type === EventTypes.ROWS_CLEARED) {
      this.score += ScoreCount.getScoreForRows(event.count);
    }
  }

  static getScoreForRows(rows) {
    return 0;
  }
}
