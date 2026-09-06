# TetrisPvP 🕹️⚡

[![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6%2B-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 Canvas](https://img.shields.io/badge/Canvas-HTML5%202D-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![Web Audio API](https://img.shields.io/badge/Audio-Web%20Audio%20API-blue?logo=soundcharts&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**TetrisPvP** is a local multiplayer, real-time split-screen competitive arcade battle game built from the ground up using 100% Vanilla Web Technologies. Two players face off on the same keyboard without hardware ghosting or input collisions, competing through speed, survival, and a tactical special tetromino garbage attack system.

---

## 🎮 Key Features

- **Split-Screen Arcade Battle**: Symmetrical dual arenas running independent physics, lock delays, and next-piece previews at 60 FPS.
- **Concurrent Non-Blocking Keyboard Engine**: Custom `InputManager` featuring asynchronous key state polling, DAS (*Delayed Auto Shift*), and ARR (*Auto Repeat Rate*) so neither player drops inputs.
- **Tactical Garbage Attack Mechanics**:
  - **Special Multicolor Tetromino**: Every 5th piece spawned is a vibrant rainbow tetromino with animated neon glow.
  - **Offensive Line Clears**: Completing lines with a special piece or clearing a 100% special row pushes gray garbage lines (with counter-attack gaps) into the opponent's grid.
  - **Saturation Bonus (16 Rows)**: When an opponent's board already has 16 garbage rows, incoming special attacks reward double score instead of sending more garbage.
- **Configurable Match Duration**: Choose target win scores directly from the home menu ladder: `100K`, `250K`, `500K`, `1M`, `2.5M`, or `5M` points.
- **Hybrid Audio Architecture (`SoundManager`)**:
  - **Procedural SFX**: Zero-latency, procedural waveforms synthesized in real-time via native `AudioContext` oscillators (blips, percussive hard drop thumps, melodic clears, triumphant 4-line arpeggios, and game over pitch drops).
  - **Arcade BGM**: Looping background soundtrack synchronized with match lifecycle (auto-pausing on menus and results) and unified global mute control.
- **Real-Time Bilingual Support (i18n)**: Instant hot-swapping between **Español** and **English** for all HUD elements, instructions, and modals.

---

## 🕹️ Controls (Shared Keyboard)

| Action | 🔵 Player 1 (Left Arena) | 🔴 Player 2 (Right Arena) | Input Behavior |
|---|:---:|:---:|---|
| **Move Left** | <kbd>A</kbd> | <kbd>J</kbd> | Continuous (DAS / ARR) |
| **Move Right** | <kbd>D</kbd> | <kbd>L</kbd> | Continuous (DAS / ARR) |
| **Rotate Clockwise** | <kbd>W</kbd> | <kbd>I</kbd> | Single Trigger (Wall Kicks) |
| **Soft Drop** | <kbd>S</kbd> | <kbd>K</kbd> | Continuous Accelerated Descent |
| **Hard Drop** | <kbd>F</kbd> / <kbd>Space</kbd> | <kbd>H</kbd> / <kbd>Enter</kbd> | Instant Lock (+20 pts/cell) |

---

## 🏆 Victory Conditions

Matches resolve immediately when either condition is satisfied:

1. **Top-Out (Overflow)**: If a player's matrix overflows and cannot place an incoming tetromino, that player loses instantly and the opponent wins.
2. **Target Score Limit**: The first player to reach or exceed the configured winning score (default: `100,000 pts`) wins the match.

---

## 📊 Scoring & Attack Ladder

### Classic Scoring
| Lines Cleared | Base Score |
|:---:|:---:|
| 1 Line | **1,000 pts** |
| 2 Lines | **3,000 pts** |
| 3 Lines | **6,000 pts** |
| 4 Lines (Tetris) | **12,000 pts** |
| Hard Drop | **+20 pts / row traversed** |

### Garbage Attack Scale
| Condition | Lines Cleared | Garbage Sent to Opponent | Bonus Points |
|---|:---:|:---:|:---:|
| Special Piece / 100% Special Row | 1 – 2 Lines | **2 Garbage Rows** | Base Line Score |
| Special Piece / 100% Special Row | 3 Lines | **3 Garbage Rows** | Base Line Score |
| Special Piece / 100% Special Row | 4 Lines (Tetris) | **4 Garbage Rows** | **+10,000 pts Bonus** |
| Opponent at 16 Garbage Rows | Any Special Clear | **0 Rows (Saturated)** | **2× Double Score** |

*Note: Standard pieces clearing heterogeneous rows (mixed standard and leftover special blocks) do not send garbage.*

---

## 🏗️ Technical Architecture

The codebase follows clean Object-Oriented Programming (OOP) principles with zero bundlers or build steps required:

```text
WordsWars/
├── index.html            # Semantic DOM layout, Home Screen, Match Arenas & Modals
├── style.css             # Cyberpunk/Arcade dark neon styling & responsive flexbox/grid
├── main.js               # Game Engine, InputManager, Player, Board, and I18n systems
├── SoundManager.js       # Standalone audio engine (Web Audio API synthesis + BGM)
├── tetris-main-theme.mp3 # Local arcade background music asset
├── PROJECT_CONTEXT.md    # Internal technical design and development specifications
└── openspec/             # OpenSpec spec-driven planning and change archives
```

### Core Modules (`main.js` & `SoundManager.js`)

- **`InputManager`**: Tracks key states through DOM event listeners and runs internal timers for continuous movement without OS keyboard repeat bottlenecks.
- **`Board`**: 10×20 matrix state, basic wall-kick collision detection, ghost piece projection, and bottom-up garbage insertion.
- **`Player`**: Encapsulates player state (matrix, score, active/preview tetrominoes, gravity counters) and renders directly to HTML5 Canvas.
- **`Engine`**: Coordinates the `requestAnimationFrame` loop, timing delta calculations, game state transitions (`MENU`, `PLAYING`, `GAME_OVER`), and match termination.
- **`SoundManager`**: Fully decoupled audio module integrating procedural Web Audio oscillators and HTML5 audio streaming with browser Autoplay compliance.

---

## 🚀 Getting Started

Since the project uses pure vanilla web standards, no installations (`npm install`) or compile steps are required:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NoMeCompila/TetrisPvP.git
   cd TetrisPvP
   ```

2. **Open in any modern browser:**
   - Simply double click [index.html](file:///c:/Users/FeR/Desktop/AllProjects/WordsWars/index.html), OR
   - Serve using any lightweight local static server:
     ```bash
     # Python 3
     python -m http.server 8080
     
     # Node (npx)
     npx serve .
     ```

3. Open `http://localhost:8080` (or `file:///.../index.html`) in your browser and click **INICIAR JUEGO / START GAME**!

---

## 📜 License

This project is licensed under the [MIT License](LICENSE). Contributions, feedback, and challenges are welcome!
