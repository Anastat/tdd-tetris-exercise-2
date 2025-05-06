export class ShuffleBag {
  constructor() {
    this.blocks = [];
    this.currentPosition = -1;
    this.currentBlock = null;
  }

  add(block, amount = 1) {
    for (let i = 0; i < amount; i++) {
      this.blocks.push(block);
    }
    this.currentPosition = this.blocks.length - 1;
  }
}
