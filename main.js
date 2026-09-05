/**
 * TetrisPvP - Modular 2-Player Local Arcade Battle
 * Vanilla JavaScript (OOP Architecture)
 */

// =============================================================================
// 1. INTERNATIONALIZATION (I18N) SYSTEM (Default: Spanish 'es')
// =============================================================================

const TRANSLATIONS = {
  es: {
    pageTitle: "TetrisPvP - Duelo Arcade Retro para 2 Jugadores",
    subtitle: "DUELO MULTIJUGADOR LOCAL EN PANTALLA DIVIDIDA",
    btnStart: "INICIAR JUEGO",
    btnInstructions: "INSTRUCCIONES",
    insertCoin: "PRESIONA INICIAR PARA DUELAR",
    targetHint: "META: 100.000 PTS O SOBREVIVIR",
    langButton: "IDIOMA: ESPAÑOL",
    goalIndicator: "META: 100.000 PTS",
    player1Tag: "JUGADOR 1",
    player2Tag: "JUGADOR 2",
    scoreLabel: "PUNTOS",
    scoreTarget: "/ 100.000",
    nextLabel: "SIGUIENTE",
    linesLabel: "LÍNEAS",
    ctrlP1Move: "Mover",
    ctrlP1Rotate: "Rotar",
    ctrlP1HardDrop: "Caída Rápida",
    ctrlP2Move: "Mover",
    ctrlP2Rotate: "Rotar",
    ctrlP2HardDrop: "Caída Rápida",
    instructionsTitle: "REGLAS Y CONTROLES",
    rulesHeadingWin: "CONDICIONES DE VICTORIA",
    ruleTarget: "Meta de puntaje: ¡El primer jugador en alcanzar 100.000 puntos gana inmediatamente!",
    ruleOverflow: "Desborde: Si tu cuadrícula se llena hasta el tope, perdés y gana tu oponente.",
    ruleGravity: "Caída pura: ¡Sin caída suave! Solo gravedad constante y Caída Rápida instantánea.",
    rulesHeadingScoring: "TABLA DE PUNTOS",
    score1Line: "1 Línea",
    score2Lines: "2 Líneas",
    score3Lines: "3 Líneas",
    score4Lines: "4 Líneas (Tetris)",
    scoreHardDrop: "Caída Rápida",
    perCell: "pts / celda",
    rulesHeadingControls: "CONTROLES (MISMO TECLADO)",
    p1ControlsLabel: "JUGADOR 1 (IZQUIERDA)",
    p2ControlsLabel: "JUGADOR 2 (DERECHA)",
    ctrlMoveDesc: "Mover Izq / Der",
    ctrlRotateDesc: "Rotar Sentido Horario",
    ctrlHardDropDesc: "Caída Rápida (Instantánea)",
    btnGotIt: "¡ENTENDIDO!",
    gameOverTitle: "¡PARTIDA TERMINADA!",
    winsSuffix: "¡GANA!",
    reasonTarget: (pts) => `ALCANZÓ LA META DE PUNTOS (${pts.toLocaleString()} PTS)`,
    reasonP1Overflow: "JUGADOR 1 DESBORDÓ LA CUADRÍCULA",
    reasonP2Overflow: "JUGADOR 2 DESBORDÓ LA CUADRÍCULA",
    linesStatSuffix: "Líneas",
    btnRematch: "REVANCHA",
    btnReturnMenu: "MENÚ PRINCIPAL"
  },
  en: {
    pageTitle: "TetrisPvP - Retro Arcade 2-Player Battle",
    subtitle: "LOCAL 2-PLAYER SPLIT-SCREEN DUEL",
    btnStart: "START GAME",
    btnInstructions: "INSTRUCTIONS",
    insertCoin: "PRESS START TO DUEL",
    targetHint: "WIN GOAL: 100,000 PTS OR SURVIVE",
    langButton: "LANGUAGE: ENGLISH",
    goalIndicator: "TARGET: 100,000 PTS",
    player1Tag: "PLAYER 1",
    player2Tag: "PLAYER 2",
    scoreLabel: "SCORE",
    scoreTarget: "/ 100,000",
    nextLabel: "NEXT",
    linesLabel: "LINES",
    ctrlP1Move: "Move",
    ctrlP1Rotate: "Rotate",
    ctrlP1HardDrop: "Hard Drop",
    ctrlP2Move: "Move",
    ctrlP2Rotate: "Rotate",
    ctrlP2HardDrop: "Hard Drop",
    instructionsTitle: "RULES & CONTROLS",
    rulesHeadingWin: "VICTORY CONDITIONS",
    ruleTarget: "Target Score: First player to reach 100,000 points wins immediately!",
    ruleOverflow: "Top-Out (Overflow): If your grid overflows at the top, you lose and your opponent wins!",
    ruleGravity: "Pure Gravity: No soft drop! Only constant gravity and instant Hard Drop.",
    rulesHeadingScoring: "SCORING TABLE",
    score1Line: "1 Line",
    score2Lines: "2 Lines",
    score3Lines: "3 Lines",
    score4Lines: "4 Lines (Tetris)",
    scoreHardDrop: "Hard Drop",
    perCell: "pts / cell",
    rulesHeadingControls: "CONTROLS (SAME KEYBOARD)",
    p1ControlsLabel: "PLAYER 1 (LEFT)",
    p2ControlsLabel: "PLAYER 2 (RIGHT)",
    ctrlMoveDesc: "Move Left / Right",
    ctrlRotateDesc: "Rotate Clockwise",
    ctrlHardDropDesc: "Hard Drop (Instant)",
    btnGotIt: "GOT IT!",
    gameOverTitle: "MATCH FINISHED!",
    winsSuffix: "WINS!",
    reasonTarget: (pts) => `REACHED TARGET SCORE (${pts.toLocaleString()} PTS)`,
    reasonP1Overflow: "PLAYER 1 TOPPED OUT (GRID OVERFLOW)",
    reasonP2Overflow: "PLAYER 2 TOPPED OUT (GRID OVERFLOW)",
    linesStatSuffix: "Lines",
    btnRematch: "REMATCH",
    btnReturnMenu: "MAIN MENU"
  }
};

class I18n {
  constructor(defaultLang = 'es') {
    this.currentLang = defaultLang;
  }

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.title = this.t('pageTitle');

      // Update all elements carrying data-i18n
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = this.t(key);
        if (typeof translation === 'string') {
          el.textContent = translation;
        }
      });
    }
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'es' ? 'en' : 'es';
    this.setLanguage(nextLang);
    return nextLang;
  }

  t(key, ...args) {
    const dict = TRANSLATIONS[this.currentLang] || TRANSLATIONS.es;
    const value = dict[key];
    if (typeof value === 'function') {
      return value(...args);
    }
    return value || key;
  }
}

// =============================================================================
// 2. GAME CONFIGURATION (Fully Decoupled)
// =============================================================================

const GameConfig = {
  // Board Dimensions
  COLS: 10,
  ROWS: 20,
  BLOCK_SIZE: 28,          // Board canvas: 10 * 28 = 280px width, 20 * 28 = 560px height
  PREVIEW_BLOCK_SIZE: 20,  // Next piece canvas block size

  // Timing & Gravity
  GRAVITY_DELAY: 750,      // Milliseconds per automatic step down
  DAS_DELAY: 160,          // Delayed Auto Shift (initial delay when holding left/right)
  ARR_INTERVAL: 45,        // Auto Repeat Rate (interval for continuous movement)

  // Scoring & Victory Condition (Decoupled & Editable)
  WIN_SCORE: 100000,       // Default win condition target
  HARD_DROP_POINTS_PER_ROW: 20,
  LINE_POINTS: {
    1: 1000,
    2: 3000,
    3: 6000,
    4: 12000
  },

  // Color Palette
  COLORS: {
    I: '#00f0f0', // Cyan
    J: '#0000f0', // Blue
    L: '#f0a000', // Orange
    O: '#f0f000', // Yellow
    S: '#00f000', // Green
    T: '#a000f0', // Purple
    Z: '#f00000', // Red
    GHOST: 'rgba(255, 255, 255, 0.18)',
    GRID: '#252836',
    BOARD_BG: '#181a24'
  },

  // Setter for dynamic score adjustments
  setWinScore(score) {
    if (typeof score === 'number' && score > 0) {
      this.WIN_SCORE = Math.floor(score);
    }
  }
};

// =============================================================================
// 3. TETROMINO MODEL
// =============================================================================

const TETROMINO_SHAPES = {
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  J: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0]
  ],
  O: [
    [1, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]
  ]
};

const TETROMINO_KEYS = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

class Tetromino {
  constructor(type) {
    this.type = type;
    this.matrix = TETROMINO_SHAPES[type].map(row => [...row]);
    this.color = GameConfig.COLORS[type];
    this.x = 0;
    this.y = 0;
  }

  static getRandom() {
    const randomIndex = Math.floor(Math.random() * TETROMINO_KEYS.length);
    const type = TETROMINO_KEYS[randomIndex];
    return new Tetromino(type);
  }

  clone() {
    const piece = new Tetromino(this.type);
    piece.matrix = this.matrix.map(row => [...row]);
    piece.color = this.color;
    piece.x = this.x;
    piece.y = this.y;
    return piece;
  }

  // Rotate 90 degrees clockwise
  rotateClockwise() {
    const size = this.matrix.length;
    const rotated = [];
    for (let r = 0; r < size; r++) {
      rotated.push([]);
      for (let c = 0; c < size; c++) {
        rotated[r][c] = this.matrix[size - 1 - c][r];
      }
    }
    return rotated;
  }
}

// =============================================================================
// 4. BOARD MODEL
// =============================================================================

class Board {
  constructor(cols = GameConfig.COLS, rows = GameConfig.ROWS) {
    this.cols = cols;
    this.rows = rows;
    this.grid = this.createEmptyGrid();
  }

  createEmptyGrid() {
    return Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
  }

  reset() {
    this.grid = this.createEmptyGrid();
  }

  isValidPosition(piece, offsetX, offsetY, testMatrix = piece.matrix) {
    const size = testMatrix.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (testMatrix[r][c] !== 0) {
          const newX = offsetX + c;
          const newY = offsetY + r;

          // Wall boundaries
          if (newX < 0 || newX >= this.cols || newY >= this.rows) {
            return false;
          }

          // Collisions with locked blocks (ignore if above top bound)
          if (newY >= 0 && this.grid[newY][newX] !== null) {
            return false;
          }
        }
      }
    }
    return true;
  }

  merge(piece) {
    const size = piece.matrix.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (piece.matrix[r][c] !== 0) {
          const cellY = piece.y + r;
          const cellX = piece.x + c;
          if (cellY >= 0 && cellY < this.rows && cellX >= 0 && cellX < this.cols) {
            this.grid[cellY][cellX] = piece.color;
          }
        }
      }
    }
  }

  clearLines() {
    let cleared = 0;
    for (let r = this.rows - 1; r >= 0; r--) {
      const isFullRow = this.grid[r].every(cell => cell !== null);
      if (isFullRow) {
        this.grid.splice(r, 1);
        this.grid.unshift(Array(this.cols).fill(null));
        cleared++;
        r++; // Re-check the same row index since lines shifted down
      }
    }
    return cleared;
  }

  getGhostY(piece) {
    let ghostY = piece.y;
    while (this.isValidPosition(piece, piece.x, ghostY + 1)) {
      ghostY++;
    }
    return ghostY;
  }

  draw(ctx, blockSize, activePiece = null) {
    const width = this.cols * blockSize;
    const height = this.rows * blockSize;

    // Clear background
    ctx.fillStyle = GameConfig.COLORS.BOARD_BG;
    ctx.fillRect(0, 0, width, height);

    // Draw grid lines
    ctx.strokeStyle = GameConfig.COLORS.GRID;
    ctx.lineWidth = 1;

    for (let c = 0; c <= this.cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * blockSize, 0);
      ctx.lineTo(c * blockSize, height);
      ctx.stroke();
    }

    for (let r = 0; r <= this.rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * blockSize);
      ctx.lineTo(width, r * blockSize);
      ctx.stroke();
    }

    // Draw locked cells
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const color = this.grid[r][c];
        if (color) {
          this.drawBlock(ctx, c * blockSize, r * blockSize, blockSize, color);
        }
      }
    }

    // Draw ghost piece & active piece
    if (activePiece) {
      const ghostY = this.getGhostY(activePiece);

      // Ghost piece
      this.drawPiece(ctx, activePiece, activePiece.x, ghostY, blockSize, GameConfig.COLORS.GHOST, true);

      // Active piece
      this.drawPiece(ctx, activePiece, activePiece.x, activePiece.y, blockSize, activePiece.color, false);
    }
  }

  drawPiece(ctx, piece, startX, startY, blockSize, color, isGhost = false) {
    const size = piece.matrix.length;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (piece.matrix[r][c] !== 0) {
          const px = (startX + c) * blockSize;
          const py = (startY + r) * blockSize;
          if (py >= 0) {
            if (isGhost) {
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
              ctx.lineWidth = 1.5;
              ctx.strokeRect(px + 1, py + 1, blockSize - 2, blockSize - 2);
              ctx.fillStyle = color;
              ctx.fillRect(px + 2, py + 2, blockSize - 4, blockSize - 4);
            } else {
              this.drawBlock(ctx, px, py, blockSize, color);
            }
          }
        }
      }
    }
  }

  drawBlock(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x + 1, y + 1, size - 2, size - 2);

    // Bevel highlights for retro pixel arcade feel
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(x + 1, y + 1, size - 2, 3);
    ctx.fillRect(x + 1, y + 1, 3, size - 2);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(x + 1, y + size - 4, size - 2, 3);
    ctx.fillRect(x + size - 4, y + 1, 3, size - 2);
  }
}

// =============================================================================
// 5. SCORE SYSTEM
// =============================================================================

class ScoreSystem {
  constructor(winScore = GameConfig.WIN_SCORE) {
    this.winScore = winScore;
    this.score = 0;
    this.linesCleared = 0;
  }

  reset() {
    this.score = 0;
    this.linesCleared = 0;
    this.winScore = GameConfig.WIN_SCORE;
  }

  addLineScore(lines) {
    if (lines <= 0) return 0;
    this.linesCleared += lines;
    const addedPoints = GameConfig.LINE_POINTS[lines] || (lines * 1000);
    this.score += addedPoints;
    return addedPoints;
  }

  addHardDropScore(dropDistance) {
    if (dropDistance <= 0) return 0;
    const addedPoints = dropDistance * GameConfig.HARD_DROP_POINTS_PER_ROW;
    this.score += addedPoints;
    return addedPoints;
  }

  hasReachedWinScore() {
    return this.score >= this.winScore;
  }
}

// =============================================================================
// 6. INPUT MANAGER (Concurrent & Non-blocking)
// =============================================================================

class InputManager {
  constructor() {
    this.activeKeys = new Set();
    this.singleActionLocks = new Set(); // Prevents auto-repeat on Rotate & Hard Drop
    this.dasTimers = new Map();         // Manages Delayed Auto Shift for horizontal move
    this.actions = new Map();           // Action handlers

    this.onKeyDown = this.handleKeyDown.bind(this);
    this.onKeyUp = this.handleKeyUp.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  unbindEvents() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  registerAction(keyCode, { onTrigger, isContinuous = false }) {
    this.actions.set(keyCode, { onTrigger, isContinuous });
  }

  handleKeyDown(event) {
    const code = event.code;
    const action = this.actions.get(code);

    if (!action) return;

    // Prevent default browser behaviors (scrolling, etc.) on mapped keys
    if (event.preventDefault) {
      event.preventDefault();
    }

    if (!action.isContinuous) {
      // Single action trigger (e.g. Rotate or Hard Drop)
      if (!this.singleActionLocks.has(code)) {
        this.singleActionLocks.add(code);
        action.onTrigger();
      }
    } else {
      // Continuous action with DAS / ARR (e.g. Move Left, Move Right)
      if (!this.activeKeys.has(code)) {
        this.activeKeys.add(code);
        action.onTrigger(); // Immediate first step

        // Set up DAS
        const das = {
          startTime: performance.now(),
          lastRepeat: performance.now()
        };
        this.dasTimers.set(code, das);
      }
    }
  }

  handleKeyUp(event) {
    const code = event.code;
    if (this.actions.has(code)) {
      this.singleActionLocks.delete(code);
      this.activeKeys.delete(code);
      this.dasTimers.delete(code);
    }
  }

  update(now) {
    // Process continuous keys with DAS / ARR
    for (const [code, timer] of this.dasTimers.entries()) {
      const action = this.actions.get(code);
      if (!action) continue;

      const elapsed = now - timer.startTime;
      if (elapsed >= GameConfig.DAS_DELAY) {
        if (now - timer.lastRepeat >= GameConfig.ARR_INTERVAL) {
          action.onTrigger();
          timer.lastRepeat = now;
        }
      }
    }
  }

  reset() {
    this.activeKeys.clear();
    this.singleActionLocks.clear();
    this.dasTimers.clear();
  }
}

// =============================================================================
// 7. PLAYER MODEL
// =============================================================================

class Player {
  constructor(id, boardCanvasId, previewCanvasId, scoreElId, linesElId) {
    this.id = id;
    
    // Board & Score
    this.board = new Board(GameConfig.COLS, GameConfig.ROWS);
    this.scoreSystem = new ScoreSystem(GameConfig.WIN_SCORE);
    
    // Pieces
    this.activePiece = null;
    this.nextPiece = null;

    // Gravity Timing
    this.gravityAccumulator = 0;
    this.hasToppedOut = false;

    // DOM & Canvas Contexts
    if (typeof document !== 'undefined') {
      this.boardCanvas = document.getElementById(boardCanvasId);
      this.boardCtx = this.boardCanvas ? this.boardCanvas.getContext('2d') : null;
      this.previewCanvas = document.getElementById(previewCanvasId);
      this.previewCtx = this.previewCanvas ? this.previewCanvas.getContext('2d') : null;
      this.scoreEl = document.getElementById(scoreElId);
      this.linesEl = document.getElementById(linesElId);
    }
  }

  get name() {
    if (window.tetrisGame && window.tetrisGame.i18n) {
      return this.id === 1 ? window.tetrisGame.i18n.t('player1Tag') : window.tetrisGame.i18n.t('player2Tag');
    }
    return this.id === 1 ? 'JUGADOR 1' : 'JUGADOR 2';
  }

  init() {
    this.board.reset();
    this.scoreSystem.reset();
    this.hasToppedOut = false;
    this.gravityAccumulator = 0;
    this.nextPiece = Tetromino.getRandom();
    this.spawnNextPiece();
    this.updateUI();
  }

  spawnNextPiece() {
    this.activePiece = this.nextPiece;
    this.nextPiece = Tetromino.getRandom();

    // Center spawn horizontally at top
    this.activePiece.x = Math.floor((this.board.cols - this.activePiece.matrix.length) / 2);
    this.activePiece.y = 0;

    // Check immediate collision -> Top-out (Overflow Game Over)
    if (!this.board.isValidPosition(this.activePiece, this.activePiece.x, this.activePiece.y)) {
      this.hasToppedOut = true;
    }

    this.renderPreview();
  }

  moveLeft() {
    if (!this.activePiece || this.hasToppedOut) return;
    if (this.board.isValidPosition(this.activePiece, this.activePiece.x - 1, this.activePiece.y)) {
      this.activePiece.x--;
    }
  }

  moveRight() {
    if (!this.activePiece || this.hasToppedOut) return;
    if (this.board.isValidPosition(this.activePiece, this.activePiece.x + 1, this.activePiece.y)) {
      this.activePiece.x++;
    }
  }

  rotate() {
    if (!this.activePiece || this.hasToppedOut) return;
    const rotated = this.activePiece.rotateClockwise();

    // Basic wall-kick / boundary check
    const kicks = [0, -1, 1, -2, 2];
    for (const offset of kicks) {
      if (this.board.isValidPosition(this.activePiece, this.activePiece.x + offset, this.activePiece.y, rotated)) {
        this.activePiece.matrix = rotated;
        this.activePiece.x += offset;
        return;
      }
    }
  }

  hardDrop() {
    if (!this.activePiece || this.hasToppedOut) return;
    const ghostY = this.board.getGhostY(this.activePiece);
    const dropDistance = ghostY - this.activePiece.y;

    // Apply hard drop points (+20 pts per cell)
    this.scoreSystem.addHardDropScore(dropDistance);

    // Instant placement & lock
    this.activePiece.y = ghostY;
    this.lockPiece();
    this.updateUI();
  }

  lockPiece() {
    this.board.merge(this.activePiece);

    // Clear completed lines and award arcade scoring
    const clearedLines = this.board.clearLines();
    if (clearedLines > 0) {
      this.scoreSystem.addLineScore(clearedLines);
    }

    // Reset gravity accumulator
    this.gravityAccumulator = 0;

    // Check if score limit reached
    if (this.scoreSystem.hasReachedWinScore()) {
      return;
    }

    // Spawn upcoming piece
    this.spawnNextPiece();
    this.updateUI();
  }

  update(deltaTime) {
    if (!this.activePiece || this.hasToppedOut) return;

    this.gravityAccumulator += deltaTime;
    if (this.gravityAccumulator >= GameConfig.GRAVITY_DELAY) {
      this.gravityAccumulator = 0;

      if (this.board.isValidPosition(this.activePiece, this.activePiece.x, this.activePiece.y + 1)) {
        this.activePiece.y++;
      } else {
        this.lockPiece();
      }
    }
  }

  render() {
    if (!this.boardCtx) return;
    this.board.draw(this.boardCtx, GameConfig.BLOCK_SIZE, this.activePiece);
  }

  renderPreview() {
    if (!this.previewCtx) return;
    const ctx = this.previewCtx;
    const size = GameConfig.PREVIEW_BLOCK_SIZE;
    const width = this.previewCanvas.width;
    const height = this.previewCanvas.height;

    ctx.fillStyle = GameConfig.COLORS.BOARD_BG;
    ctx.fillRect(0, 0, width, height);

    if (!this.nextPiece) return;

    const matrix = this.nextPiece.matrix;
    const mSize = matrix.length;
    const pieceWidth = mSize * size;
    const pieceHeight = mSize * size;

    // Center piece inside preview box
    const startX = Math.floor((width - pieceWidth) / 2);
    const startY = Math.floor((height - pieceHeight) / 2);

    for (let r = 0; r < mSize; r++) {
      for (let c = 0; c < mSize; c++) {
        if (matrix[r][c] !== 0) {
          this.board.drawBlock(ctx, startX + c * size, startY + r * size, size, this.nextPiece.color);
        }
      }
    }
  }

  updateUI() {
    if (this.scoreEl) {
      this.scoreEl.textContent = this.scoreSystem.score.toLocaleString();
    }
    if (this.linesEl) {
      this.linesEl.textContent = this.scoreSystem.linesCleared;
    }
  }
}

// =============================================================================
// 8. ENGINE & MATCH LIFECYCLE
// =============================================================================

class Engine {
  constructor() {
    this.i18n = new I18n('es'); // Default to Spanish
    this.gameState = 'MENU'; // 'MENU' | 'PLAYING' | 'GAME_OVER'
    this.lastTimestamp = 0;
    this.animationFrameId = null;

    // Instances
    this.inputManager = new InputManager();
    this.player1 = new Player(
      1,
      'p1-board-canvas',
      'p1-preview-canvas',
      'p1-score',
      'p1-lines'
    );
    this.player2 = new Player(
      2,
      'p2-board-canvas',
      'p2-preview-canvas',
      'p2-score',
      'p2-lines'
    );

    // DOM Elements
    this.homeScreen = document.getElementById('home-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.instructionsModal = document.getElementById('instructions-modal');
    this.gameOverModal = document.getElementById('game-over-modal');

    this.winnerAnnouncement = document.getElementById('winner-announcement');
    this.winReason = document.getElementById('win-reason');
    this.finalP1Score = document.getElementById('final-p1-score');
    this.finalP1Lines = document.getElementById('final-p1-lines');
    this.finalP2Score = document.getElementById('final-p2-score');
    this.finalP2Lines = document.getElementById('final-p2-lines');

    // Initialize UI language
    this.i18n.setLanguage('es');

    this.setupInputBindings();
    this.setupUIListeners();
  }

  setupInputBindings() {
    // Player 1: WASD
    this.inputManager.registerAction('KeyA', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player1.moveLeft(); },
      isContinuous: true
    });
    this.inputManager.registerAction('KeyD', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player1.moveRight(); },
      isContinuous: true
    });
    this.inputManager.registerAction('KeyW', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player1.rotate(); },
      isContinuous: false
    });
    this.inputManager.registerAction('KeyS', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player1.hardDrop(); },
      isContinuous: false
    });

    // Player 2: IJKL
    this.inputManager.registerAction('KeyJ', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player2.moveLeft(); },
      isContinuous: true
    });
    this.inputManager.registerAction('KeyL', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player2.moveRight(); },
      isContinuous: true
    });
    this.inputManager.registerAction('KeyI', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player2.rotate(); },
      isContinuous: false
    });
    this.inputManager.registerAction('KeyK', {
      onTrigger: () => { if (this.gameState === 'PLAYING') this.player2.hardDrop(); },
      isContinuous: false
    });
  }

  setupUIListeners() {
    // Language Switcher
    const langBtn = document.getElementById('btn-lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        this.i18n.toggleLanguage();
      });
    }

    // Home Screen buttons
    document.getElementById('btn-start-game').addEventListener('click', () => {
      this.startMatch();
    });

    document.getElementById('btn-open-instructions').addEventListener('click', () => {
      this.toggleInstructions(true);
    });

    // Instructions modal buttons
    document.getElementById('btn-close-instructions').addEventListener('click', () => {
      this.toggleInstructions(false);
    });
    document.getElementById('btn-modal-got-it').addEventListener('click', () => {
      this.toggleInstructions(false);
    });

    // Game Over modal buttons
    document.getElementById('btn-rematch').addEventListener('click', () => {
      this.hideGameOver();
      this.startMatch();
    });

    document.getElementById('btn-return-menu').addEventListener('click', () => {
      this.hideGameOver();
      this.returnToMenu();
    });
  }

  toggleInstructions(show) {
    if (show) {
      this.instructionsModal.classList.remove('hidden');
    } else {
      this.instructionsModal.classList.add('hidden');
    }
  }

  startMatch() {
    this.homeScreen.classList.remove('active');
    this.gameScreen.classList.add('active');
    this.hideGameOver();
    this.toggleInstructions(false);

    this.inputManager.reset();
    this.player1.init();
    this.player2.init();

    this.gameState = 'PLAYING';
    this.lastTimestamp = performance.now();

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(timestamp) {
    if (this.gameState !== 'PLAYING') return;

    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    // 1. Process continuous input (DAS / ARR)
    this.inputManager.update(timestamp);

    // 2. Update players
    this.player1.update(deltaTime);
    this.player2.update(deltaTime);

    // 3. Render both players
    this.player1.render();
    this.player2.render();

    // 4. Check victory / defeat conditions
    this.checkMatchConditions();

    if (this.gameState === 'PLAYING') {
      this.animationFrameId = requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  checkMatchConditions() {
    // Condition A: Victory by Top-Out (Overflow)
    if (this.player1.hasToppedOut) {
      this.endMatch(this.player2, this.i18n.t('reasonP1Overflow'));
      return;
    }
    if (this.player2.hasToppedOut) {
      this.endMatch(this.player1, this.i18n.t('reasonP2Overflow'));
      return;
    }

    // Condition B: Victory by Target Score
    if (this.player1.scoreSystem.hasReachedWinScore()) {
      this.endMatch(this.player1, this.i18n.t('reasonTarget', GameConfig.WIN_SCORE));
      return;
    }
    if (this.player2.scoreSystem.hasReachedWinScore()) {
      this.endMatch(this.player2, this.i18n.t('reasonTarget', GameConfig.WIN_SCORE));
      return;
    }
  }

  endMatch(winner, reason) {
    this.gameState = 'GAME_OVER';
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    // Populate Game Over modal
    this.winnerAnnouncement.textContent = `${winner.name} ${this.i18n.t('winsSuffix')}`;
    this.winnerAnnouncement.className = `winner-name ${winner.id === 1 ? 'winner-p1' : 'winner-p2'}`;
    this.winReason.textContent = reason;

    const linesSuffix = this.i18n.t('linesStatSuffix');
    this.finalP1Score.textContent = `${this.player1.scoreSystem.score.toLocaleString()} pts`;
    this.finalP1Lines.textContent = `${this.player1.scoreSystem.linesCleared} ${linesSuffix}`;
    this.finalP2Score.textContent = `${this.player2.scoreSystem.score.toLocaleString()} pts`;
    this.finalP2Lines.textContent = `${this.player2.scoreSystem.linesCleared} ${linesSuffix}`;

    this.gameOverModal.classList.remove('hidden');
  }

  hideGameOver() {
    this.gameOverModal.classList.add('hidden');
  }

  returnToMenu() {
    this.gameState = 'MENU';
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.gameScreen.classList.remove('active');
    this.homeScreen.classList.add('active');
  }
}

// =============================================================================
// 9. APPLICATION BOOTSTRAP
// =============================================================================

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    window.tetrisGame = new Engine();
  });
}
