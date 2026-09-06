## Context

TetrisPvP is structured as a vanilla JavaScript arcade battle (`main.js`, `index.html`, `style.css`) using object-oriented classes (`Board`, `Player`, `Engine`, `InputManager`, `ScoreSystem`). The user requested a dedicated, procedural `SoundManager` built exclusively on the browser's native Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`) without any external audio files (`.mp3`/`.wav`) or dependencies.

See `proposal.md` for problem statement and requirements.

## Goals / Non-Goals

**Goals:**
- Provide a clean, standalone `SoundManager.js` module implementing procedural synthesis for all core game interactions:
  - `init()`: Safe Autoplay policy unlocking on user interaction.
  - `playMove()`: Subtle, 30-50 ms blip for lateral shifts and soft drop steps.
  - `playHardDrop()`: Dry, punchy percussive thump on instant drop.
  - `playLineClear(linesCount)`: Scaled melodic tones (1-3 lines) and an ascending triumphant arpeggio for 4 lines (Tetris).
  - `playGameOver()`: Dissonant, descending sawtooth pitch-drop.
- Maintain global mute toggle state (`isMuted`).
- Integrate cleanly with `Engine`, `Player`, and `InputManager` in `main.js`.

**Non-Goals:**
- Loading or streaming external audio files (`.mp3`, `.ogg`).
- Background music (BGM) playback at this stage (focused solely on procedural SFX).

## Decisions

### Decision 1: Standalone `SoundManager.js` Module
- **Approach**: Implement `SoundManager` in its own file `SoundManager.js` and load it via `<script src="SoundManager.js"></script>` before `main.js` in `index.html`.
- **Rationale**: Keeps audio synthesis isolated from matrix and rendering logic, satisfying Single Responsibility and making audio parameter tuning straightforward.

### Decision 2: Synthesis Parameter Design
- **Move / Soft Drop**:
  - Oscillator: `triangle` or `sine` at ~600 Hz.
  - Envelope: Gain ~0.05, duration 35 ms, quick exponential decay. Prevents fatigue during rapid key presses from both players.
- **Hard Drop**:
  - Oscillator: `triangle`, pitch sweep from 160 Hz down to 40 Hz over 90 ms.
  - Envelope: Gain ~0.25 decaying exponentially to 0.001. Gives a solid tactile impact.
- **Line Clear (1, 2, 3 lines)**:
  - Oscillator: `triangle` or `sine`.
  - Frequencies: 1 line = 523.25 Hz (C5), 2 lines = 659.25 Hz (E5), 3 lines = 783.99 Hz (G5).
  - Envelope: 180-220 ms decay.
- **Tetris Clear (4 lines)**:
  - Multi-note ascending arpeggio: C5 (523.25 Hz) -> E5 (659.25 Hz) -> G5 (783.99 Hz) -> C6 (1046.50 Hz), each spaced by ~60 ms with a ringing chime decay.
- **Game Over**:
  - Oscillator: `sawtooth` for harsh, retro arcade dissonance.
  - Frequency: 280 Hz swept down to 50 Hz over 800 ms.

### Decision 3: Safe Autoplay & Master Gain Limiter
- **Approach**:
  - Create a master `GainNode` connecting to `ctx.destination` to prevent audio clipping when both players trigger sounds simultaneously.
  - Provide `ensureAudioContext()` checking `ctx.state === 'suspended'` and calling `ctx.resume()`. Bind initial resume to the Start button click and global first `keydown`.

## Risks / Trade-offs

- **[Risk] Audio bus saturation from dual-player concurrent inputs** → *Mitigation*: Low individual sound gain values and a master gain ceiling (0.35) prevent distortion when both players maneuver simultaneously.
- **[Risk] Autoplay policy blocking initial sounds** → *Mitigation*: Trigger `soundManager.init()` on "Start Game" click and the first user keystroke.
