## Why

The current control scheme assigns `S` and `K` to instantaneous Hard Drop and disallows Soft Drop. Players need a more standard and forgiving control scheme with deliberate Soft Drop capability for precise piece placement, along with dedicated Hard Drop bindings (including space bar and enter key alternatives) for aggressive play.

## What Changes

- Reassign Player 1 controls:
  - `A` / `D`: Move Left / Move Right
  - `W`: Rotate clockwise
  - `S`: Soft Drop (accelerated piece drop / continuous or stepped downward movement)
  - `F` or `Space`: Hard Drop (instant drop & lock)
- Reassign Player 2 controls:
  - `J` / `L`: Move Left / Move Right
  - `I`: Rotate clockwise
  - `K`: Soft Drop (accelerated piece drop / continuous or stepped downward movement)
  - `H` or `Enter`: Hard Drop (instant drop & lock)
- Update HUD control labels and the Instructions modal rules/controls to reflect Soft Drop and the updated key bindings.
- **BREAKING**: Key `S` (Player 1) and `K` (Player 2) no longer perform Hard Drop; they now perform Soft Drop. Hard Drop is moved to `F`/`Space` (P1) and `H`/`Enter` (P2).

## Capabilities

### Modified Capabilities
- `tetris-pvp-gameplay`: Update movement controls to permit and specify Soft Drop behavior, and update Hard Drop key bindings to `F` / `Space` for Player 1 and `H` / `Enter` for Player 2.

## Impact

- `index.html`: Update key legends (`<kbd>`) in the instructions modal and in the player board HUDs (both English and Spanish).
- `main.js`: Update translation dictionaries (`TRANSLATIONS`), input registration (`setupInputBindings`), Player class with soft drop support and drop interval calculation, and key listeners.
