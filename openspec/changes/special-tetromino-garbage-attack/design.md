## Context

The current TetrisPvP game runs two independent boards with isolated player loops. To implement the competitive attack mechanic described in `prompts/2 - Garbage Lines Attack Mechanics.md`, we need to introduce:
1. Special Multicolor Tetrominoes appearing every 5th piece.
2. Attack triggers on line clears that consume at least one mino belonging to a Special Tetromino.
3. Garbage line insertion (pushed from the bottom with 1 random hole per row) with a 16-row saturation cap.
4. Attack rewards (10,000 pts bonus for special Tetris clears; double clear points if the opponent is at the 16-row garbage cap).

## Goals / Non-Goals

**Goals:**
- Maintain symmetric OOP structure: Player 1 can attack Player 2 and vice versa with identical rules.
- Represent special pieces and garbage cells cleanly in `Tetromino` and `Board.grid`.
- Handle garbage insertion by shifting matrix rows upward (`shift()` at top, `push()` at bottom) with 1 random hole per row.
- Provide distinct visual rendering on `<canvas>` for Special Tetrominoes (multicolor with luminous glow) and Garbage Lines (gray `#555555` with etched border).
- Enforce the 16-row garbage cap and double-point score reward on saturated opponents.

**Non-Goals:**
- Complex networked multiplayer (remains local 1v1 split-screen on the same keyboard).
- Garbage line counter-canceling (garbage lines are inserted directly upon attack).

## Decisions

### Decision 1: Cell Representation in Board Grid
- **Choice**: Represent each occupied matrix cell as an object `{ color: string, isSpecial?: boolean, isGarbage?: boolean }`, while supporting legacy string fallback during transition.
- **Rationale**: Storing `isSpecial` and `isGarbage` metadata on the cell itself allows `Board.clearLines()` to accurately detect whether cleared rows contained a special mino, and allows `Board.getGarbageRowCount()` to accurately count garbage rows from the bottom.

### Decision 2: Generation of Special Multicolor Tetromino
- **Choice**: Add a piece counter `pieceSpawnCount` to `Player`. When `pieceSpawnCount % 5 === 0`, instantiate a `Tetromino` with `isSpecial = true`.
- **Styling**: In special pieces, each mino in the 4-block shape receives an individual bright neon color (e.g. Cyan, Magenta, Yellow, Green), and canvas rendering applies `ctx.shadowBlur` and `ctx.shadowColor` to produce a glowing rainbow aura in both the playfield and the Next Piece preview.

### Decision 3: Line Clear Detection & Attack Dispatch
- **Choice**: Modify `Board.clearLines()` to return an object: `{ linesCleared: number, hadSpecialMino: boolean }`.
- **Handling in Player.lockPiece()**:
  - If `hadSpecialMino` is true:
    - 1-2 lines: 2 garbage lines.
    - 3 lines: 3 garbage lines.
    - 4 lines: 4 garbage lines + 10,000 bonus points to attacker.
    - The attacking player calls `this.opponent.receiveGarbage(garbageCount, baseClearPoints)`.

### Decision 4: Garbage Insertion and Saturation Cap
- **Choice**: In `Board.receiveGarbageLines(count, opponent)`:
  - Inspect grid rows from bottom (index 19 upward) to count how many consecutive rows are garbage rows.
  - If already at 16 rows: do not insert rows; return `{ saturated: true }`, prompting the caller to double the attacker's clear score.
  - If under 16 rows: insert `Math.min(count, 16 - currentGarbage)`.
  - Insertion logic: for each line, `this.grid.shift()` (discarding row 0) and `this.grid.push(createGarbageRow())`. Each garbage row has 9 gray blocks and 1 random `null` hole.
  - If the active piece overlaps newly elevated blocks, push `activePiece.y` upward if space permits, or trigger top-out.

## Risks / Trade-offs

- [Risk: Active piece overlap when garbage pushes board upward] → Mitigation: After garbage insertion, test `isValidPosition(this.activePiece, x, y)`. If colliding, adjust `activePiece.y--` up to the number of inserted lines. If it cannot fit within top bounds, mark `hasToppedOut = true`.
- [Risk: Canvas rendering performance with neon glow effects] → Mitigation: Apply `ctx.shadowBlur` only when rendering special blocks and reset `shadowBlur = 0` immediately after drawing them to avoid performance regressions in standard block rendering.
