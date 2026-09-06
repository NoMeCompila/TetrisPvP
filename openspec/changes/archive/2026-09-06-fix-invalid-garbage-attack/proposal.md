## Why

In PvP multiplayer mode, the Garbage Attack mechanism was activating improperly whenever a standard tetromino completed a line clear that happened to contain any remnant multicolor minos from an earlier special piece. This premature trigger degraded competitive game balance, giving players unearned offensive advantages without strategically playing a special tetromino or completing a fully specialized row.

## What Changes

- **Enforce Exclusive Garbage Attack Conditions**:
  - Garbage Attacks trigger **ONLY** if:
    1. **Condition A (Special Piece Trigger):** The line clear is executed directly by locking a Special Multicolor Tetromino (`activePiece.isSpecial === true`).
    2. **Condition B (100% Special Homogeneous Row):** The line clear removes at least one row consisting 100% of special minos (`row.every(cell => cell && cell.isSpecial)`), regardless of the closing piece.
- **Block Attacks on Heterogeneous (Mixed) Rows with Standard Pieces**:
  - When a standard tetromino completes a line clear on a row containing a mixture of standard and special minos, NO garbage lines are sent to the opponent, no saturation doubling is triggered, and only local line clear score is awarded.
- **Localization and Instructions Text Alignment**:
  - Update Spanish and English translation tables and the Instructions modal in `index.html` to clearly reflect that mixed rows cleared by normal pieces do not attack.

## Capabilities

### Modified Capabilities
- `tetris-pvp-gameplay`: Refine Garbage Lines Attack Activation requirements to enforce the two exclusive trigger conditions and explicitly prohibit garbage attacks from standard pieces clearing heterogeneous rows.

## Impact

- `main.js`:
  - `Board.clearLines()`: Track whether any cleared row is 100% composed of special minos (`hasHomogeneousSpecialLine`).
  - `Player.lockPiece()`: Check `(activePiece.isSpecial || hasHomogeneousSpecialLine)` before dispatching garbage attacks.
  - `TRANSLATIONS`: Update `ruleAttackActivation` in `es` and `en`.
- `index.html`:
  - Update static text in the Instructions modal for `ruleAttackActivation`.
