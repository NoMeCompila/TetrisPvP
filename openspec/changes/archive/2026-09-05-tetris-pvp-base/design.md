## Context

See `proposal.md` for motivation and background. The application is a greenfield vanilla web arcade game with zero build steps or external bundlers, relying exclusively on standard Web APIs (HTML5 Canvas, CSS3 Flexbox/Grid, and modern ES6+ JavaScript).

## Goals / Non-Goals

**Goals:**
- Implement a cleanly decoupled Object-Oriented architecture where `Board`, `Tetromino`, `ScoreSystem`, `Player`, `InputManager`, and `Engine` have distinct single responsibilities.
- Ensure completely conflict-free, concurrent input handling for two players sharing a single physical keyboard.
- Provide a centralized, editable configuration (`GameConfig`) isolating `WIN_SCORE`, gravity speeds, scoring tables, and canvas dimensions for future menu customization.
- Deliver an authentic retro arcade aesthetic with neon color schemes and a responsive split-screen viewport fitting `100vh` without scrollbars.

**Non-Goals:**
- Networked multiplayer, WebSockets, or remote peer-to-peer syncing (local split-screen only).
- Soft drop mechanics (deliberately excluded per design requirements in favor of pure gravity + Hard Drop).
- Garbage line sending or offensive attacks between players (deferred to Phase 2).
- Sound effects or audio synthesis (deferred to future sound design iteration).

## Decisions

### 1. File Structure and Modularity
- **Decision**: Organize the codebase into:
  - `index.html`: Semantic markup for screens (Home, Game View, Instructions Modal, Game Over Modal).
  - `style.css`: Dark-mode retro arcade styling, CSS custom properties for palette, pixel font loading, modal overlays, and flexbox split-screen layout.
  - `main.js`: Modular ES6 OOP structure containing `GameConfig`, `Tetromino`, `Board`, `ScoreSystem`, `Player`, `InputManager`, and `Engine`.
- **Rationale**: Keeps the project zero-dependency and executable by double-clicking `index.html` or serving via any static server, while maintaining strict class encapsulation.
- **Alternatives considered**: Separate ES module files (`import/export`) were considered, but standard ES modules require an HTTP server due to CORS when opened as local `file://`. A single structured, clean ES6 file or structured sections allows immediate zero-setup execution while retaining full OOP modularity.

### 2. Input Management and Concurrency
- **Decision**: Implement an `InputManager` class that listens to `keydown` and `keyup` window events, maintaining an active key state table (`Set` or boolean map). In addition, action-triggered events (rotate, hard drop) use edge detection (flagged until released) to prevent key repeat flooding, while horizontal moves use configured repeat intervals (DAS/ARR: Delayed Auto Shift / Auto Repeat Rate).
- **Rationale**: Default browser keyboard repeat varies across operating systems and suppresses concurrent keys across different players. A dedicated state tracker guarantees non-blocking simultaneous inputs for Player 1 (`W`, `A`, `S`, `D`) and Player 2 (`I`, `J`, `K`, `L`).
- **Alternatives considered**: Relying on raw `keydown` listeners causes input drop when two keys are pressed simultaneously on many browser engines.

### 3. Decoupled Game Configuration (`GameConfig`)
- **Decision**: Define a single frozen configuration object:
  ```javascript
  const GameConfig = {
    COLS: 10,
    ROWS: 20,
    BLOCK_SIZE: 28, // pixels per cell in board canvas
    PREVIEW_BLOCK_SIZE: 22,
    GRAVITY_DELAY: 800, // ms per gravity tick
    WIN_SCORE: 100000,
    HARD_DROP_POINTS_PER_ROW: 20,
    LINE_POINTS: {
      1: 1000,
      2: 3000,
      3: 6000,
      4: 12000
    },
    COLORS: {
      I: '#00f0f0',
      J: '#0000f0',
      L: '#f0a000',
      O: '#f0f000',
      S: '#00f000',
      T: '#a000f0',
      Z: '#f00000',
      GHOST: 'rgba(255, 255, 255, 0.15)',
      GRID: '#252836',
      BOARD_BG: '#181a24'
    }
  };
  ```
- **Rationale**: Directly answers the requirement for editable `WIN_SCORE` and game parameters, decoupling game rules from engine logic and enabling UI menu binding in future phases.

### 4. Game Loop and Independent Player State
- **Decision**: A central `Engine` drives a single `requestAnimationFrame` loop tracking delta time (`timestamp - lastTime`). Each `Player` instance manages its own `Board`, `ScoreSystem`, gravity accumulator, active `Tetromino`, and next `Tetromino`.
- **Rationale**: Keeps rendering perfectly synchronized at monitor refresh rate while allowing independent drop timers, line clears, and score accumulations.

### 5. Canvas Rendering and Ghost Piece
- **Decision**: Render board matrices (10x20) and preview canvases (4x4) using Canvas 2D contexts with crisp pixel grid lines and neon glow effects. Render a subtle "ghost piece" indicator showing the projected landing position of the active tetromino to enhance competitive fast-paced Hard Drop gameplay.
- **Rationale**: Improves visibility and competitive precision without cluttering retro pixel aesthetics.

## Risks / Trade-offs

- **[Risk] Multiple keys pressed simultaneously causing keyboard ghosting on low-end keyboards**  
  *Mitigation*: Use standard widely-spaced control layouts (`WASD` vs `IJKL`) which typically belong to distinct matrix circuits on membrane keyboards.
- **[Risk] High-DPI screens causing blurry canvas rendering**  
  *Mitigation*: Scale Canvas internal resolution via `window.devicePixelRatio` and context scaling to maintain pixel-sharpness.
- **[Risk] Accidental page scrolling from keyboard controls**  
  *Mitigation*: Call `event.preventDefault()` specifically on mapped game keys in `InputManager`.
