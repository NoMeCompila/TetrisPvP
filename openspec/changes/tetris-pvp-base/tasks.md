## 1. Foundation and Semantic Markup

- [x] 1.1 Create `index.html` with viewport meta, external Google Font (`Press Start 2P`), and title
- [x] 1.2 Implement Home screen container with pixel art title, "Start Game" button, and "Instructions" button
- [x] 1.3 Add Instructions modal overlay with game rules, scoring explanation, and keyboard mapping
- [x] 1.4 Construct Split-Screen match container with Player 1 (left) and Player 2 (right) sections, top scoreboards, main board canvases, and next piece preview canvases
- [x] 1.5 Construct Game Over modal overlay displaying winner announcement, "Rematch" button, and "Return to Menu" button

## 2. Styling and Responsive Arcade Theme

- [x] 2.1 Set up CSS custom properties in `style.css` for palette (`#0d0e15`, `#181a24`, neon accents), typography, and layout dimensions
- [x] 2.2 Style Home screen and modal dialogs with retro pixel borders, glowing text, and interactive arcade button states
- [x] 2.3 Implement flexbox split-screen layout constrained to `100vh` without scrollbars
- [x] 2.4 Style scoreboards, player tags, canvas borders, and side preview panels for crisp rendering

## 3. Core Models and State Management

- [x] 3.1 Define `GameConfig` object with `WIN_SCORE` (100,000), gravity interval, scoring multipliers, dimensions, and color mappings
- [x] 3.2 Implement `Tetromino` class supporting 7 standard shapes, 4 rotation states, wall-kick/bounding checks, and color definitions
- [x] 3.3 Implement `Board` class managing 10x20 matrix grid, collision detection, piece locking, line clearing, and canvas rendering
- [x] 3.4 Implement `ScoreSystem` class handling arcade line clear points, hard drop bonus (+20 per cell), and target tracking

## 4. Input Handling and Player Architecture

- [x] 4.1 Implement `InputManager` class tracking active key states via window events without browser repeat interference
- [x] 4.2 Map Player 1 (`W`, `A`, `S`, `D`) and Player 2 (`I`, `J`, `K`, `L`) controls to discrete actions
- [x] 4.3 Implement `Player` class encapsulating board, active tetromino, next tetromino, score system, drop timers, and preview rendering

## 5. Game Loop, Engine and Lifecycle

- [x] 5.1 Implement `Engine` class with `requestAnimationFrame` delta-timing loop driving both players concurrently
- [x] 5.2 Add Hard Drop calculation logic (drop distance calculation, bonus scoring, instant matrix lock)
- [x] 5.3 Enforce victory condition checks: board top-out overflow detection and target score (`WIN_SCORE`) achievement
- [x] 5.4 Connect UI actions: start match from Home, toggle instructions modal, show Game Over modal, trigger rematch, and return to Home menu

## 6. Verification and Playtesting

- [x] 6.1 Validate simultaneous keyboard input behavior without cross-player blocking
- [x] 6.2 Verify line clearing calculations and hard drop point accumulation against score requirements
- [x] 6.3 Test top-out and score victory conditions triggering modal and rematch workflows
