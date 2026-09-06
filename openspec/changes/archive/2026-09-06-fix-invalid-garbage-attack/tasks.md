## 1. Board Model Line Detection

- [x] 1.1 Refactor `Board.clearLines()` in `main.js` to check `every(cell => cell && cell.isSpecial)` and return `{ cleared, hasHomogeneousSpecialLine }`

## 2. Attack Trigger & Scoring Guard

- [x] 2.1 Update `Player.lockPiece()` in `main.js` to evaluate `isGarbageAttack = (isSpecialPiece || hasHomogeneousSpecialLine)`
- [x] 2.2 Ensure clears by standard pieces on mixed/heterogeneous rows bypass garbage attack dispatch, saturation doubling, and special bonuses

## 3. UI & Localization Texts

- [x] 3.1 Update `ruleAttackActivation` in `TRANSLATIONS` (`es` and `en`) in `main.js`
- [x] 3.2 Update static `ruleAttackActivation` text in the Instructions modal in `index.html`
