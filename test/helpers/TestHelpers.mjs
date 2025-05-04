export function moveToLeft(board, steps = 10) {
  for (let i = 0; i < steps; i++) {
    board.moveLeft();
  }
}

export function moveToRight(board, steps = 10) {
  for (let i = 0; i < steps; i++) {
    board.moveRight();
  }
}

export function moveDown(board, steps = 10) {
  for (let i = 0; i < steps; i++) {
    board.moveDown();
  }
}

export function fallToBottom(board, ticks = 10) {
  for (let i = 0; i < ticks; i++) {
    board.tick();
  }
}
