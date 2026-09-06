## Context

The game currently generates procedural sound effects (SFX) via Web Audio oscillators in [SoundManager.js](file:///c:/Users/FeR/Desktop/AllProjects/WordsWars/SoundManager.js). An audio asset [tetris-main-theme.mp3](file:///c:/Users/FeR/Desktop/AllProjects/WordsWars/tetris-main-theme.mp3) is present in the project root. Game lifecycle (start, rematch, end, menu) and UI mute buttons (`#btn-sound-toggle` and `#btn-sound-match-toggle`) are orchestrated in [main.js](file:///c:/Users/FeR/Desktop/AllProjects/WordsWars/main.js).

See [proposal.md](file:///c:/Users/FeR/Desktop/AllProjects/WordsWars/openspec/changes/add-background-music/proposal.md) for background and motivation.

## Goals / Non-Goals

**Goals:**
- Encapsulate BGM loading, looping, volume, and playback state cleanly inside `SoundManager`.
- Synchronize BGM playback directly with match states: strictly playing during active gameplay, stopping during menus and post-match victory/game over screens.
- Balance BGM volume (~0.25) so procedural SFX cut through clearly without distortion or auditory masking.
- Tie BGM mute status synchronously to the existing global mute controls in `SoundManager`.
- Gracefully handle browser Autoplay policy rejections when `.play()` is called.

**Non-Goals:**
- Dynamic audio pitch shifting or procedural music generation.
- Audio ducking/compression sidechains via Web Audio MediaElementSource nodes (simple static volume leveling suffices).
- Multi-track music player or playlist selector.

## Decisions

### 1. HTML5 `Audio` Element vs Web Audio `AudioBuffer` for BGM
- **Decision**: Use a dedicated `HTMLAudioElement` (`new Audio('./tetris-main-theme.mp3')`) managed inside `SoundManager`.
- **Rationale**: An `Audio` element supports background streaming and native looping (`loop = true`) without needing to decode the entire MP3 into memory as an `AudioBuffer`. Procedural SFX remain in Web Audio `AudioContext`, keeping the two concerns isolated and lightweight.
- **Alternatives Considered**:
  - *Decoding MP3 via `AudioContext.decodeAudioData`*: Unnecessary memory overhead and complexity for looping background music.
  - *Routing `HTMLAudioElement` through `AudioContext.createMediaElementSource`*: Introduces CORS and extra context graph baggage without clear benefit, since basic volume and mute properties can be controlled directly on the `Audio` element.

### 2. State & Method API in `SoundManager`
- **Decision**: Add the following fields and methods to `SoundManager`:
  - `this.bgm = null` (instantiated lazily or during constructor).
  - `this.bgmVolume = 0.25`.
  - `this.isMatchActive = false` to distinguish whether BGM should be audible when unmuting.
  - `startBGM()`: Initializes `bgm` if needed, sets `currentTime = 0`, updates volume based on `isMuted`, marks `isMatchActive = true`, and calls `play()`. Catches promise rejections.
  - `stopBGM()`: Pauses `bgm`, resets `currentTime = 0`, marks `isMatchActive = false`.
  - `toggleMute()`: In addition to toggling `this.isMuted`, updates `this.bgm.muted = this.isMuted` and sets volume (`this.isMuted ? 0 : this.bgmVolume`). If unmuting while `isMatchActive` is true, ensures `bgm.play()` is active.
- **Alternatives Considered**: Managing audio elements directly in `main.js` was rejected to preserve single responsibility for all game audio in `SoundManager`.

### 3. Match Lifecycle Wiring in `main.js`
- **Decision**: Hook `startBGM()` and `stopBGM()` into existing match transition functions:
  - In `startMatch()`: Trigger `window.soundManager.startBGM()`.
  - In `endMatch()`: Trigger `window.soundManager.stopBGM()` right before/when showing the Game Over modal.
  - In `returnToMenu()`: Ensure `window.soundManager.stopBGM()` is called.
  - Rematch flow (clicking `#btn-rematch`): Calls `startMatch()`, which naturally invokes `startBGM()`.

### 4. Autoplay Policy Handling
- **Decision**: Wrap `this.bgm.play()` with `.catch(err => console.warn('BGM play blocked:', err))`.
- **Rationale**: Browsers require user interaction before playing audio. Since `startMatch()` is triggered by clicking "Start Game" or "Rematch", user interaction is guaranteed in normal flows, but catching ensures no unhandled runtime errors occur in edge environments or automated test runners.

## Risks / Trade-offs

- **[Risk] Relative path resolution for `tetris-main-theme.mp3`**: If loaded from different base URLs, relative paths could fail.
  - *Mitigation*: Use relative path `./tetris-main-theme.mp3`, matching the root deployment of `index.html`.
- **[Risk] BGM masking procedural SFX**: If BGM is too loud, piece moves and line clear audio become hard to perceive.
  - *Mitigation*: Cap BGM volume at 0.25 (or lower if needed) to ensure SFX remain prominently audible.
- **[Risk] BGM playing during menu screens when unmuted**: Unmuting sound on the menu screen shouldn't start match music.
  - *Mitigation*: Track `this.isMatchActive` state inside `SoundManager` so unmute only triggers/restores BGM playback if a match is actually ongoing.
