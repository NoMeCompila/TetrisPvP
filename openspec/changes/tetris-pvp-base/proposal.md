## Why

Local multiplayer competitive arcade games require low latency, zero input locking, and responsive mechanics on shared hardware. Building a modular, decoupled Tetris PvP base in HTML5 Canvas and Vanilla JavaScript establishes a rock-solid foundation for competitive two-player mechanics without external runtime dependencies, preparing the architecture for future expansions such as garbage attacks, customizable skins, and advanced configuration menus.

## What Changes

- Introduce a dual-board local multiplayer Tetris game (`TetrisPvP`) running in split-screen on a single keyboard.
- Implement an object-oriented, decoupled architecture (`Tetromino`, `Board`, `ScoreSystem`, `Player`, `Engine`, `InputManager`).
- Add independent gravity-based drop timers and instantaneous Hard Drop mechanics (with +20 pts per dropped cell) without soft drop.
- Provide dedicated keyboard bindings supporting concurrent key presses:
  - Player 1: `A` (Left), `D` (Right), `W` (Rotate CW), `S` (Hard Drop).
  - Player 2: `J` (Left), `L` (Right), `I` (Rotate CW), `K` (Hard Drop).
- Add arcade-based line scoring (1,000 for 1 line, 3,000 for 2 lines, 6,000 for 3 lines, 12,000 for 4 lines).
- Enforce dual victory conditions: top-out overflow (immediate opponent win) or reaching the configurable `WIN_SCORE` target (default: 100,000 pts).
- Implement Home menu screen, Instructions modal, in-game scoreboard with Next Piece preview, and Game Over modal with Rematch and Return to Menu actions.
- Style with a retro pixel art arcade aesthetic in dark mode (`#0d0e15`), neon tetrominoes, and full-viewport layout (`100vh`).

## Capabilities

### New Capabilities
- `tetris-pvp-gameplay`: Local split-screen 2-player Tetris engine with simultaneous input management, arcade scoring, board state progression, preview canvas, and match lifecycle management.

### Modified Capabilities
<!-- None -->

## Impact

- **New Files**: Complete standalone frontend application (`index.html`, `style.css`, `main.js`).
- **Dependencies**: Zero external runtime dependencies; uses native HTML5 Canvas API and Google Fonts (`Press Start 2P`).
- **APIs/State**: Pure client-side OOP game loop managed via `requestAnimationFrame`.
