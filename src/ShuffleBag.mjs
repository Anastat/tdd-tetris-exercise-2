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

  next() {
    if (this.currentPosition < 1) {
      this.currentPosition = this.blocks.length - 1;
      this.currentBlock = this.blocks[0];

      return this.currentBlock;
    }

    const pos = Math.floor(Math.random() * this.currentPosition);

    this.currentBlock = this.blocks[pos];
    this.blocks[pos] = this.blocks[this.currentPosition];
    this.blocks[this.currentPosition] = this.currentBlock;
    this.currentPosition--;

    return this.currentBlock;
  }
}
