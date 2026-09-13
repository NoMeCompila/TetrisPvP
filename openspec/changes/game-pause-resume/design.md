## Context

The game operates as a single-page arcade web application with vanilla JavaScript (`main.js`, `SoundManager.js`), HTML5 canvas, and CSS. The `Engine` class currently drives the game lifecycle using three states (`'MENU'`, `'PLAYING'`, `'GAME_OVER'`) and an animation frame loop (`requestAnimationFrame`). `SoundManager` manages background audio streaming via HTML5 `Audio` alongside procedural Web Audio API SFX.

See `proposal.md` for problem statement and motivation.

## Goals / Non-Goals

**Goals:**
- Provide seamless, instantaneous pause and resume toggling during gameplay via the `Escape` key.
- Freeze all game physics, piece gravity, and continuous input timers (DAS / ARR) during pause.
- Preserve exact background music playback position during pause and resume seamlessly.
- Render a stylish retro arcade overlay when paused that clearly communicates status and how to resume.
- Keep the `InputManager` clean, preventing stuck keys or input leaks across pause boundaries.

**Non-Goals:**
- Multi-state pause menus with configuration settings, volume sliders, or restart options during pause (can be extended in future changes).
- Altering match rules, score targets, or garbage line logic.

## Decisions

### 1. State Machine Extension (`'PAUSED'`)
- **Approach**: Add `'PAUSED'` to the `Engine.gameState` enum.
  - `pauseMatch()`:
    1. Sets `this.gameState = 'PAUSED'`.
    2. Cancels pending `animationFrameId`.
    3. Calls `inputManager.reset()` to clear active key repeat states.
    4. Calls `window.soundManager.pauseBGM()`.
    5. Displays the `#pause-overlay`.
  - `resumeMatch()`:
    1. Hides `#pause-overlay`.
    2. Updates `this.lastTimestamp = performance.now()` before restarting loop.
    3. Sets `this.gameState = 'PLAYING'`.
    4. Calls `window.soundManager.resumeBGM()`.
    5. Dispatches `this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this))`.
  - `togglePause()`: Inspects `this.gameState` and delegates to `pauseMatch()` or `resumeMatch()`.
- **Alternatives Considered**: Keeping `requestAnimationFrame` running with an `if (isPaused) return;` guard. Rationale: Cancelling the frame and re-requesting it on resume reduces unnecessary CPU cycles while paused and simplifies the timing boundary.

### 2. Dedicated `pauseBGM()` and `resumeBGM()` in `SoundManager`
- **Approach**: Implement methods in `SoundManager` that pause and play `this.bgm` without modifying `currentTime`.
  - `pauseBGM()`: Calls `this.bgm.pause()` if instantiated.
  - `resumeBGM()`: Calls `this.bgm.play()` with a promise catch handler if not muted.
- **Alternatives Considered**: Using existing `stopBGM()`. Rationale: `stopBGM()` resets `currentTime = 0`, forcing the music to restart from the beginning, disrupting immersion.

### 3. Centralized `InputManager` Key Registration
- **Approach**: Register `'Escape'` directly with `this.inputManager.registerAction('Escape', { onTrigger: () => this.togglePause(), isContinuous: false })`.
- **Alternatives Considered**: Adding a separate window `keydown` listener in `Engine`. Rationale: Utilizing `InputManager` keeps all keyboard mapping in one place and respects `singleActionLocks` to prevent rapid toggle flutter if `Escape` is held down.

### 4. Retro Arcade Pause Overlay
- **Approach**: Add a dedicated `#pause-overlay` inside `#game-screen` in `index.html` with a semi-transparent backdrop, neon glowing text, and bilingual i18n support. Include a clickable resume button as an alternative to `Esc` for accessibility.

## Risks / Trade-offs

- **[Risk] Delta-Time Spike on Resume** → *Mitigation*: If `lastTimestamp` is not updated upon resuming, `deltaTime = timestamp - lastTimestamp` would represent the entire duration of the pause, immediately triggering mass gravity drops and top-out overflow. Setting `this.lastTimestamp = performance.now()` in `resumeMatch()` guarantees `deltaTime` starts fresh from zero on resume.
- **[Risk] Key Repeat Sticking across Pause** → *Mitigation*: Calling `this.inputManager.reset()` when pausing eliminates any keys cached in `activeKeys` or `dasTimers`, ensuring pieces do not automatically slide after unpausing.
- **[Risk] Autoplay / Async Audio Playback Errors** → *Mitigation*: `resumeBGM()` wraps `this.bgm.play()` in safe Promise `.catch()` handling, preventing unhandled exceptions if the browser restricts audio resume.
