## Why

Currently in TetrisPvP, both players compete on isolated boards without direct player-versus-player interaction, relying solely on score and self-inflicted top-out. Introducing a Special Multicolor Tetromino and a Garbage Lines Attack system elevates direct 1v1 competition, rewarding strategic line clears with offensive pressure against the opponent while allowing defense and counter-play.

## What Changes

- **Special Multicolor Tetromino Spawning**: Every 5th piece generated in each player's queue is flagged as Special (`isSpecial = true`), rendered with a distinct multicolor mino palette and neon borders in both the board and the Next Piece preview canvas.
- **Garbage Attack Mechanics**:
  - A player clearing one or more lines that contain at least one block from a Special Tetromino triggers an attack against the opponent.
  - Clears that do not involve special piece minos (including clearing pre-existing gray garbage lines) do not send garbage.
  - Attack scale:
    - Single (1 line) or Double (2 lines): Inserts 2 gray garbage lines at the bottom of the opponent's board.
    - Triple (3 lines): Inserts 3 gray garbage lines at the bottom of the opponent's board.
    - Tetris (4 lines): Inserts 4 gray garbage lines at the bottom of the opponent's board, and awards the attacking player an immediate bonus of +10,000 points.
- **Garbage Structure and Matrix Push**:
  - Garbage lines push existing matrix blocks upward from the bottom of the board.
  - Each garbage line consists of solid gray blocks (`#555555`) with exactly one randomly placed empty cell (hole) to enable clearing.
- **Garbage Saturation Cap (16 rows)**:
  - Garbage lines can accumulate up to a maximum height of 16 rows (measured from the bottom of the standard 20-row matrix).
  - If the opponent already has 16 rows of garbage lines and receives a new special clear attack, no further garbage lines are added; instead, the attacker is rewarded with double the base line clear score.
- **Rule and UI Updates**: Update Instructions modal rules and scoring table to document the Special Tetromino and Garbage Attack mechanics in both Spanish and English.

## Capabilities

### Modified Capabilities
- `tetris-pvp-gameplay`: Add Special Tetromino generation, Garbage Lines attack triggering, garbage matrix insertion with single-hole layout, and the 16-row saturation cap rule with double-point bonus.

## Impact

- `main.js`:
  - `Tetromino`: Add `isSpecial` flag, per-cell color matrix for special rainbow pieces, and special rendering styles.
  - `Player`: Add piece counter (every 5th piece is special), attack trigger evaluation on line clears (`checkSpecialMinoInClear`), and attack dispatch to opponent.
  - `Board`: Add `receiveGarbageLines(count)` method with matrix shift upward, single-hole generation, garbage row counting (`getGarbageRowCount`), and saturation cap enforcement.
  - `ScoreSystem`: Add support for special Tetris attack bonus (+10,000 pts) and saturated attack multiplier (double clear score).
  - `TRANSLATIONS`: Update rules and instructions modals in Spanish and English.
- `index.html`: Update Instructions modal rules section to explain Special Tetrominoes, Garbage attack table, and the 16-row cap.
