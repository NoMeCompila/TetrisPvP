## Why

The game currently features procedural sound effects (SFX) through `SoundManager`, but lacks background music (BGM), reducing immersion and energy during competitive gameplay. Adding a non-intrusive, looping background soundtrack during active matches creates a more dynamic and engaging player experience without overshadowing SFX or gameplay clarity.

## What Changes

- **Background Music Asset Integration**: Load and loop the local soundtrack `./tetris-main-theme.mp3` using the HTML5 `Audio` API.
- **Match State Synchronization**:
  - **Menu Screen**: BGM remains stopped/silent.
  - **Match Start & Rematch**: BGM starts playback automatically with looping enabled (`loop = true`).
  - **Match End (Victory / Game Over / Return to Menu)**: BGM stops and rewinds immediately to prioritize victory/defeat stingers and keep the end modal silent.
- **Volume & Sound Control Integration**:
  - Set BGM volume to a balanced, non-intrusive level (~0.25) so procedural SFX remain crisp and prominent.
  - Synchronize BGM playback and mute state with the existing audio toggle (`#btn-sound-toggle` and `#btn-sound-match-toggle`). Unmuting during an active match restores BGM volume; unmuting in menus keeps BGM silent until a match begins.
- **Autoplay Policy Handling**: Ensure `Audio.play()` promise rejections (e.g. browser autoplay restrictions) are caught gracefully without breaking gameplay.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `tetris-pvp-gameplay`: Add background music playback requirements tied to match lifecycle states and audio mute toggles.

## Impact

- `SoundManager.js`: Extended with BGM audio initialization, play/stop controls, volume management, and mute synchronization.
- `main.js`: Wired to trigger BGM playback on match start/rematch and stop BGM on game over or return to menu.
- Dependencies: Pure native browser HTML5 `Audio` API (no external libraries added).
