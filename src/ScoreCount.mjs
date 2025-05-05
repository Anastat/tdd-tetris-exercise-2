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
    switch (rows) {
      case 1: return 40;
      case 2: return 100;
      case 3: return 300;
      case 4: return 1200;
      default: return 0;
    }
  }
}
