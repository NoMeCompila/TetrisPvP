## Context

In the current architecture, `GameConfig.WIN_SCORE` is statically defined as `100000`. `ScoreSystem` instances receive `winScore = GameConfig.WIN_SCORE` on initialization. UI labels across the home screen (`.target-hint`), the in-game header (`#global-goal`), and player score cards (`.score-target`) display hardcoded strings based on static I18n dictionary entries.

See [proposal.md](file:///c:/Users/FeR/Desktop/AllProjects/WordsWars/openspec/changes/configurable-target-score/proposal.md) for background and motivation.

## Goals / Non-Goals

**Goals:**
- Provide an arcade-styled `<select>` dropdown on the home screen allowing players to configure the target score before starting a match.
- Offer ladder options scaling logically from 100K up to 5M points:
  - `100000`: 100.000 pts (100K) — Fast / Default
  - `250000`: 250.000 pts (250K)
  - `500000`: 500.000 pts (500K)
  - `1000000`: 1.000.000 pts (1M)
  - `2500000`: 2.500.000 pts (2.5M)
  - `5000000`: 5.000.000 pts (5M) — Marathon
- Dynamically synchronize UI elements:
  - Home screen hint (`.target-hint`): dynamically interpolates the selected score.
  - In-game header indicator (`#global-goal`): dynamically displays the active match target.
  - Player target indicators (`.score-target`): dynamically updates to `"/ [formatted target]"`.
  - Game Over modal: preserves accurate target score announcement.
- Maintain selected target score across rematches.

**Non-Goals:**
- Free-form manual text input for target score (a discrete preset dropdown preserves arcade UX balance and prevents invalid inputs).
- Changing target score mid-match while gameplay is actively running.
- Online matchmaking or lobby synchronization.

## Decisions

### 1. Preset Dropdown Selector vs Free-form Input
- **Decision**: Use a styled native `<select>` element containing 6 curated values: 100K, 250K, 500K, 1M, 2.5M, 5M.
- **Rationale**: Keyboard and mouse friendly, zero validation edge cases (no negative numbers, NaN, or 0), and keeps the arcade look consistent.
- **Alternatives Considered**: Range slider (`<input type="range">`), which lacks immediate precision for exponential score tiers; number input (`<input type="number">`), which breaks arcade aesthetics.

### 2. State & Engine Architecture
- **Decision**: Keep `activeWinScore` state in `Engine` (initialized to `GameConfig.WIN_SCORE`).
  - When the dropdown changes, update `this.activeWinScore = parseInt(targetSelect.value, 10)`.
  - When initializing players in `startMatch()`, pass `this.activeWinScore` to each player's `ScoreSystem`.
  - Add helper method `updateTargetScoreUI(score)` in `Engine` that updates all affected DOM elements.
- **Rationale**: Centralizes score threshold state in the game coordinator (`Engine`), preventing desynchronization between Player 1 and Player 2.

### 3. Dynamic I18n Formatting
- **Decision**: Update `I18n` dictionary templates or provide formatter functions:
  - `targetHint: (pts) => ...`
  - `goalIndicator: (pts) => ...`
  - `scoreTarget: (pts) => ...`
- **Rationale**: Keeps number formatting (`toLocaleString()`) clean across language changes (Spanish `100.000` vs English `100,000`).

### 4. Visual Styling (`style.css`)
- **Decision**: Add `.arcade-select` class that matches `.arcade-btn`:
  - `font-family: 'Press Start 2P', monospace`
  - Background: dark navy `#0d122b`, text `#ffe600`, border `#ff0055` / `#00f0ff`.
  - Box shadows and neon glow on `:focus` and `:hover`.

## Risks / Trade-offs

- **[Risk] High score overflow on UI layouts**: 5,000,000 has more digits than 100,000, which could cause text wrapping in tight mobile/split headers.
  - *Mitigation*: Verify and test `.score-target`, `#global-goal`, and `.scoreboard` CSS with flexible layout and compact typography to prevent line breaks.
- **[Risk] Match length pacing at 5M points**: A 5M game requires sustained survival or heavy 4-line Tetris / Saturated attacks.
  - *Mitigation*: The player explicitly chooses this mode for extended marathon gameplay, and top-out defeat condition remains active at all times.
