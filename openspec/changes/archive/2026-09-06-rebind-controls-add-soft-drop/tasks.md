## 1. Engine & Model Updates

- [x] 1.1 Implement `softDrop()` method in `Player` class in `main.js` with boundary collision check and gravity timer reset
- [x] 1.2 Rebind Player 1 inputs in `Engine.setupInputBindings()`: `KeyS` for Soft Drop (continuous), `KeyF` and `Space` for Hard Drop
- [x] 1.3 Rebind Player 2 inputs in `Engine.setupInputBindings()`: `KeyK` for Soft Drop (continuous), `KeyH` and `Enter` for Hard Drop

## 2. Localization & Translations

- [x] 2.1 Update Spanish and English translation objects in `TRANSLATIONS` (`main.js`) to include Soft Drop descriptions and updated key tags
- [x] 2.2 Update rules copy regarding Soft Drop in `TRANSLATIONS` (removing "Sin caída suave")

## 3. UI & DOM Markup

- [x] 3.1 Update Player 1 and Player 2 HUD key hints in `index.html` to display Soft Drop and dual Hard Drop keys
- [x] 3.2 Update the Instructions modal key comparison table and rules list in `index.html`
- [x] 3.3 Adjust styling in `style.css` if necessary for multi-key badges (`<kbd>Space</kbd>`, `<kbd>Enter</kbd>`)

## 4. Verification & Testing

- [x] 4.1 Verify Player 1 movement, clockwise rotation, continuous soft drop (`S`), and instant hard drop (`F` / `Space`)
- [x] 4.2 Verify Player 2 movement, clockwise rotation, continuous soft drop (`K`), and instant hard drop (`H` / `Enter`)
- [x] 4.3 Verify concurrent input handling so neither player blocks or locks the other's actions
