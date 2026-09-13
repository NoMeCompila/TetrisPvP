## 1. SoundManager Audio Pause & Resume

- [x] 1.1 Implement `pauseBGM()` in `SoundManager.js` to pause audio stream while preserving current playback position
- [x] 1.2 Implement `resumeBGM()` in `SoundManager.js` to resume playback safely with Autoplay promise handling
- [x] 1.3 Ensure `toggleMute()` and audio state cooperate cleanly with pause and resume cycles

## 2. Pause Overlay UI & Styling

- [x] 2.1 Add `#pause-overlay` element with retro arcade messaging and resume button in `index.html`
- [x] 2.2 Add CSS styling in `style.css` for the pause backdrop, glowing retro title, and button animations
- [x] 2.3 Add i18n keys for pause title and resume instructions in `main.js` (English and Spanish)
- [x] 2.4 Update instructions modal in `index.html` to document `Esc` for Pause/Play

## 3. Game Engine Pause & Resume Lifecycle

- [x] 3.1 Register `'Escape'` key in `InputManager` to invoke pause/play toggle
- [x] 3.2 Implement `pauseMatch()` in `Engine` (`main.js`): set state to `'PAUSED'`, cancel animation frame, reset input states, pause BGM, and show pause overlay
- [x] 3.3 Implement `resumeMatch()` in `Engine` (`main.js`): hide pause overlay, resync `lastTimestamp` with `performance.now()`, set state to `'PLAYING'`, resume BGM, and restart `requestAnimationFrame`
- [x] 3.4 Implement `togglePause()` in `Engine` (`main.js`) to switch between paused and playing states
- [x] 3.5 Bind overlay resume button to `resumeMatch()`

## 4. Verification and Testing

- No test The user will test manually
