## 1. SoundManager BGM Integration

- [x] 1.1 Add BGM instance tracking, volume level (`0.25`), and `isMatchActive` state to `SoundManager.js`
- [x] 1.2 Implement BGM initialization and playback methods (`startBGM`) with continuous looping (`loop = true`) and graceful browser Autoplay rejection handling
- [x] 1.3 Implement BGM stop and reset methods (`stopBGM`) ensuring immediate pause and rewind to `currentTime = 0`
- [x] 1.4 Update `toggleMute()` in `SoundManager.js` to synchronously manage BGM volume/mute states alongside procedural SFX, restoring volume only when a match is active

## 2. Match Lifecycle & UI Integration

- [x] 2.1 Wire `SoundManager.startBGM()` inside `startMatch()` in `main.js` to ensure BGM starts on both initial match launch and rematch
- [x] 2.2 Wire `SoundManager.stopBGM()` inside `endMatch()` in `main.js` so background music ceases instantly upon match conclusion
- [x] 2.3 Ensure `SoundManager.stopBGM()` is called when returning to the main menu screen in `main.js`
