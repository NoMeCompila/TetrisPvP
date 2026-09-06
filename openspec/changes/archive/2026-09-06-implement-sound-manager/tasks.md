## 1. Standalone SoundManager Module

- [x] 1.1 Create `SoundManager.js` with lazy `AudioContext` initialization, master gain node, and Autoplay unlock handling (`init()`)
- [x] 1.2 Implement global mute toggle state and bypass guards (`isMuted`, `toggleMute()`)
- [x] 1.3 Implement procedural movement sound (`playMove()`) with an ultra-short 35 ms blip and low gain for lateral shifts and soft drop
- [x] 1.4 Implement tactile percussive hard drop impact sound (`playHardDrop()`) with rapid exponential pitch and volume decay
- [x] 1.5 Implement scaled melodic line clear sound (`playLineClear(linesCount)`) for 1-3 lines and triumphant ascending 4-note arpeggio for Tetris
- [x] 1.6 Implement dramatic descending sawtooth pitch-drop Game Over sound (`playGameOver()`)

## 2. Integration & Wiring

- [x] 2.1 Add `<script src="SoundManager.js"></script>` to `index.html` before `main.js`
- [x] 2.2 Instantiate `soundManager` in `main.js` and bind `init()` to the Start Game button and first user interaction
- [x] 2.3 Wire `soundManager.playMove()` to `Player.moveLeft()`, `Player.moveRight()`, and `Player.softDrop()`
- [x] 2.4 Wire `soundManager.playHardDrop()` to `Player.hardDrop()`
- [x] 2.5 Wire `soundManager.playLineClear(cleared)` to `Player.lockPiece()` when lines are cleared
- [x] 2.6 Wire `soundManager.playGameOver()` to `Engine.setGameOver()` upon match conclusion
