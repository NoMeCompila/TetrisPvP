## 1. Special Tetromino Model & Multicolor Rendering

- [x] 1.1 Extend `Tetromino` in `main.js` to support `isSpecial`, individual per-mino color matrices, and special piece cloning
- [x] 1.2 Implement special rendering logic with neon glowing borders in `Board.drawBlock()` and `Player.renderPreview()` for special minos
- [x] 1.3 Add a piece spawn counter in `Player` to spawn a Special Tetromino every 5 pieces in queue

## 2. Board Grid & Garbage Line Mechanics

- [x] 2.1 Refactor `Board.grid` cell representation to store `{ color, isSpecial, isGarbage }` and update `Board.merge()`
- [x] 2.2 Implement `Board.getGarbageRowCount()` to count consecutive garbage rows from the bottom of the grid
- [x] 2.3 Implement `Board.receiveGarbageLines(count)` to push rows upward from the bottom, inserting gray rows (`#555555`) with 1 random hole up to the 16-row cap
- [x] 2.4 Handle active piece vertical adjustment or top-out if elevated rows collide with the falling piece

## 3. Attack Activation & Scoring Integration

- [x] 3.1 Update `Board.clearLines()` to detect row composition (cleared count and whether any cleared row is 100% special)
- [x] 3.2 Wire `Player.attack(opponent, linesCleared, hadSpecialMino)`: dispatch 2 lines for single/double, 3 for triple, 4 for Tetris (+10,000 pts bonus)
- [x] 3.3 Implement saturation check: if opponent has 16 garbage rows, cancel garbage insertion and award double base line clear points to the attacker
- [x] 3.4 Wire cross-player reference between `player1` and `player2` in `Engine`
- [x] 3.5 Refactor garbage attack trigger logic: send garbage ONLY if piece is special or cleared row is 100% special; block attack when a standard piece clears mixed rows

## 4. UI & Localization

- [x] 4.1 Update Spanish and English translation tables in `main.js` with Special Tetromino rules and Garbage Lines attack scale
- [x] 4.2 Update the Instructions modal in `index.html` to detail Special Pieces, the Garbage Attack scale, and the 16-row saturation rule
