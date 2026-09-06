## 1. UI Structure and Styling

- [x] 1.1 Add target score configuration dropdown with options (100K, 250K, 500K, 1M, 2.5M, 5M) to the home screen in `index.html`
- [x] 1.2 Implement `.arcade-select` and `.target-select-container` styles in `style.css` consistent with existing retro neon arcade UI elements

## 2. Dynamic Localization and Label Formatting

- [x] 2.1 Update `I18n` dictionaries in `main.js` to support dynamic formatters for `targetHint`, `goalIndicator`, `scoreTarget`, and dropdown label
- [x] 2.2 Update `setLanguage()` and language toggle listeners in `main.js` to refresh target score strings under the active language

## 3. Engine Integration and Score Synchronization

- [x] 3.1 Initialize and track `activeWinScore` in `Engine` (`main.js`), binding dropdown `change` events
- [x] 3.2 Implement `updateTargetScoreUI(score)` in `Engine` to synchronize `#global-goal`, `.target-hint`, and `.score-target` indicators
- [x] 3.3 Pass `activeWinScore` to each player's `ScoreSystem` during `startMatch()` and ensure persistence across rematches
