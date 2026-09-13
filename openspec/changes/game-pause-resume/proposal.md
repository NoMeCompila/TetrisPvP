## Why

Players during a fast-paced split-screen Tetris match currently have no mechanism to temporarily pause the action. Once started, the game loop and piece gravity run continuously until someone tops out or hits the score target. Adding a pause and resume toggle bound to the `Escape` (`Esc`) key allows players to halt gameplay, pause the background soundtrack, and resume whenever they are ready without losing match state or timing accuracy.

## What Changes

- **Escape Key Pause/Resume Toggle**: Pressing the `Escape` key during an active match toggles the game between playing and paused states repeatedly.
- **Match Freeze & Input Suspension**: Freezes gravity timers, piece movement, soft/hard drops, and DAS/ARR processing while paused.
- **Delta-Time Resync**: Resets the animation frame timestamp reference upon resuming so pieces do not suffer sudden gravity jumps or accumulator spikes.
- **Background Music Pause & Resume**: Integrates with `SoundManager` to pause `tetris-main-theme.mp3` exactly at its current playback position without resetting to zero, and resumes playback upon unpausing.
- **Pause Visual Overlay**: Displays a clear retro arcade pause overlay informing players that the game is paused and indicating `Esc` resumes the match.
- **Instructions Update**: Documents the `Esc` key shortcut for Pause/Play in the game's instructions modal.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `tetris-pvp-gameplay`: Adds requirements and scenarios for match pause/resume state management via the `Escape` key, game loop freeze/thaw, and synchronized audio pause/resume.

## Impact

- `SoundManager.js`: Adds dedicated `pauseBGM()` and `resumeBGM()` methods that preserve `currentTime` across pause cycles.
- `main.js`: Updates `Engine` to support `'PAUSED'` game state, registers `Escape` key action in `InputManager`, adds `togglePause()`, `pauseMatch()`, and `resumeMatch()`, handles timestamp synchronization, and updates UI overlay visibility.
- `index.html`: Adds the Pause overlay element and updates instructions modal copy.
- `style.css`: Styles the retro arcade pause overlay over the dual playing boards.
