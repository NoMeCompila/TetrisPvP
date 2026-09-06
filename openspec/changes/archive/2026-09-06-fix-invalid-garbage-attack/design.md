## Context

In TetrisPvP, the matrix cells store `{ color, isSpecial, isGarbage }`. In the original implementation, `Board.clearLines()` set `hadSpecialMino = true` whenever *any* special mino was present in a cleared line (`some(cell => cell.isSpecial)`). When `Player.lockPiece()` cleared lines, it dispatched garbage lines to the opponent whenever `hadSpecialMino` was true, inadvertently triggering attacks when a standard tetromino cleared a row with leftover special minos.

See `proposal.md` for motivation and background.

## Goals / Non-Goals

**Goals:**
- Enforce the two exclusive conditions for triggering a Garbage Attack:
  1. Direct trigger by locking a Special Tetromino (`activePiece.isSpecial === true`).
  2. Clearing at least one row composed 100% of special multicolor minos (`hasHomogeneousSpecialLine === true`).
- Strictly block garbage attack dispatch when a standard piece clears a heterogeneous row.
- Ensure standard scoring, row removal, and gravity behavior remain completely unaffected.

**Non-Goals:**
- Modifying the attack payload scale (2 lines for single/double, 3 lines for triple, 4 lines for Tetris).
- Altering the 16-row saturation cap or its double-score multiplier on attack.

## Decisions

### Decision 1: Detect Homogeneous Special Rows in `Board.clearLines()`
- **Approach**: In `Board.clearLines()`, when an `isFullRow` condition is met, check `this.grid[r].every(cell => cell && cell.isSpecial)`. If true for any removed row, flag `hasHomogeneousSpecialLine = true`. Return `{ cleared, hasHomogeneousSpecialLine }`.
- **Alternatives Considered**: Checking row composition prior to `clearLines()` or passing the active piece into `clearLines()`. Keeping row composition analysis inside `Board.clearLines()` maintains encapsulation and keeps the Board class unaware of high-level Player state.

### Decision 2: Centralize Exclusive Attack Trigger Evaluation in `Player.lockPiece()`
- **Approach**:
  ```javascript
  const isSpecialPiece = Boolean(this.activePiece && this.activePiece.isSpecial);
  const { cleared, hasHomogeneousSpecialLine } = this.board.clearLines();
  const isGarbageAttack = (isSpecialPiece || hasHomogeneousSpecialLine);
  ```
  Only if `isGarbageAttack && this.opponent` is true, calculate `garbageToSend` (and the +10,000 pts special Tetris bonus) and invoke `this.opponent.receiveGarbage(garbageToSend)`.
- **Alternatives Considered**: Creating an attack strategy class. Not warranted given the straightforward boolean condition and current OOP structure.

## Risks / Trade-offs

- **[Risk] Player confusion regarding attack activation** → *Mitigation*: Update `TRANSLATIONS` (`es` and `en`) and the Instructions modal in `index.html` to clearly explain that mixed rows completed with normal pieces do not attack.
