## Context

The current TetrisPvP engine uses `InputManager` with discrete key registrations (`registerAction`) supporting single triggers (locked until keyup) and continuous triggers (using DAS/ARR timing). Currently, Player 1 uses `WASD` where `S` is Hard Drop, and Player 2 uses `IJKL` where `K` is Hard Drop. There is no soft drop capability. The user wants to:
1. Rebind Hard Drop to `F` or `Space` for Player 1, and `H` or `Enter` for Player 2.
2. Rebind `S` (Player 1) and `K` (Player 2) to perform Soft Drop.
3. Update HUD legends and the Instructions modal rules/tables to document Soft Drop and the updated key bindings.

## Goals / Non-Goals

**Goals:**
- Implement a responsive Soft Drop action in `Player` and `InputManager` that allows players to descend pieces faster by tapping or holding `S` (P1) and `K` (P2).
- Support multiple key bindings per action in `Engine.setupInputBindings()`:
  - P1 Hard Drop: `KeyF` and `Space`.
  - P2 Hard Drop: `KeyH` and `Enter`.
- Update `GameConfig`, `TRANSLATIONS` (en/es), `index.html` (HUD tags, modal rules/controls), and `style.css` if necessary for key badge styling.

**Non-Goals:**
- Full custom key rebinding UI/configuration screen (bindings remain fixed to the requested presets).
- Modifying standard gravity speeds, DAS/ARR timings for horizontal movement, or line clearing mechanics.

## Decisions

### Decision 1: Soft Drop Implementation Pattern
- **Approach**: Register `KeyS` and `KeyK` as continuous actions (`isContinuous: true`) in `InputManager` or invoke `player.softDrop()` on step.
- **Behavior**: When `softDrop()` is invoked:
  - If the piece can move down (`isValidPosition(..., y + 1)`), increment `activePiece.y` and reset `gravityAccumulator` to avoid double-stepping with regular gravity.
  - If the piece is at the bottom, soft drop does not immediately lock it (allowing standard gravity lock or hard drop lock, consistent with modern Tetris guidelines).
- **Alternative Considered**: Modifying gravity tick speed while holding the key. Rejected because treating soft drop as a continuous step input via `InputManager` reuses existing timing loops and is completely decoupled from frame rate variations.

### Decision 2: Multi-Key Binding Support
- **Approach**: Register both `KeyF` and `Space` for Player 1's hard drop, and both `KeyH` and `Enter` for Player 2's hard drop.
- **Event Prevention**: Ensure `event.preventDefault()` is called on `Space` and `Enter` so they do not scroll the browser window or trigger focused UI buttons accidentally during gameplay.

### Decision 3: UI and Translation Synchronization
- Update both English and Spanish translations in `TRANSLATIONS` object in `main.js`.
- Update static markup in `index.html` (modal body, instructions, HUD player badges) to include `S`/`K` as Soft Drop and `F`/`Space` and `H`/`Enter` as Hard Drop.

## Risks / Trade-offs

- [Risk: Browser default action on Space/Enter] → Mitigation: `InputManager.handleKeyDown` already executes `event.preventDefault()`, which prevents page scrolling for `Space` and form submissions for `Enter`.
- [Risk: Soft drop colliding with ground] → Mitigation: Check `isValidPosition(..., y + 1)` before incrementing `y`. If invalid, keep piece in place and let gravity timer handle locking.
