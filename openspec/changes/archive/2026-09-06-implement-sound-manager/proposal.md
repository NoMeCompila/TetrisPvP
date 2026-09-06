## Why

TetrisPvP is an intense, real-time 2-player competitive arcade game where both players compete simultaneously on the same screen and keyboard. Currently, gameplay lacks auditory feedback, making moves, drops, line clears, and match endings feel visually responsive but acoustically silent. Integrating an ultra-lightweight, zero-dependency procedural audio engine using the browser's native Web Audio API will provide instant retro 8-bit/chiptune feedback without audio file download delays, network latency, or memory bloat.

## What Changes

- **Create Modular `SoundManager`**:
  - Encapsulate all Web Audio API procedural synthesis inside a standalone `SoundManager` class (using `AudioContext`, `OscillatorNode`, and `GainNode`).
  - No external audio files (`.mp3`, `.wav`, `.ogg`) or third-party sound libraries; 100% procedural waveform synthesis.
  - Safe user-gesture `AudioContext` unlocking (`init()` on first click or keydown) complying with browser Autoplay policies.
  - Global mute/unmute state management (`isMuted`).
- **Implement Procedural SFX Suite**:
  - `playMove()`: Subtle, ultra-short blip (30-50 ms, low gain) for lateral shifts and soft drops to prevent auditory fatigue.
  - `playHardDrop()`: Punchy, dry percussive thump with rapid exponential decay in frequency and volume.
  - `playLineClear(linesCount)`: Bright tonal synthesis (`triangle`/`sine`) scaling progressively higher for 1, 2, or 3 lines; triumphant ascending multi-note arpeggio for 4-line Tetris clears.
  - `playGameOver()`: Dissonant, dramatic descending pitch drop with `sawtooth` oscillator and exponential frequency ramp into bass.
- **Game Engine & Input Integration**:
  - Connect `SoundManager` triggers directly into `Player` / `InputManager` / `Engine` event points (`moveLeft`, `moveRight`, `softDrop`, `hardDrop`, `clearLines`, and game termination).

## Capabilities

### Modified Capabilities
- `tetris-pvp-gameplay`: Add normative requirements for Web Audio procedural feedback on piece movement, hard drops, line clear tiers (single to Tetris arpeggio), game over, and autoplay policy lifecycle handling.

## Impact

- `SoundManager.js`: New decoupled procedural audio synthesis module.
- `main.js`: Integrate `SoundManager` with input handlers, line-clear resolution, and match lifecycle hooks.
- `index.html`: Load `SoundManager.js` script tag (if modular script) or link instance.
