## Why

Currently, the match winning target score is hardcoded to 100,000 points (`WIN_SCORE = 100000`). Players have different preferences for match duration, ranging from quick blitz battles to marathon endurance matches. Allowing players to choose the target score directly from the home menu gives them full control over game length and competitive intensity.

## What Changes

- **Target Score Selector in Home Menu**:
  - Add a styled retro arcade dropdown selector (`<select>` or custom styled control) on the home screen allowing players to select their desired target score before starting a match.
  - Options scale progressively from 100K to 5M points:
    - 100,000 pts (100K) — Fast / Blitz (Default)
    - 250,000 pts (250K)
    - 500,000 pts (500K)
    - 1,000,000 pts (1M)
    - 2,500,000 pts (2.5M)
    - 5,000,000 pts (5M) — Marathon / Epic
- **Dynamic HUD and UI Synchronization**:
  - Update the home screen target hint (`targetHint`) to reflect the selected score in real time and respect active localization.
  - Update the in-game header target indicator (`#global-goal`) to display the selected target score during matches.
  - Update player scoreboards (`.score-target`) to show `/ [formatted target]` dynamically instead of hardcoded `/ 100.000`.
  - Ensure the Game Over modal win reason dynamically displays the achieved target score.
- **Match State & Rematch Persistence**:
  - The chosen target score persists across rematches until deliberately changed from the main menu.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `tetris-pvp-gameplay`: Modify victory by target score and start screen navigation to support dynamic target score configuration scaling from 100K to 5M points.

## Impact

- `index.html`: Add target score dropdown element with arcade styling in the home screen menu actions or configuration bar.
- `style.css`: Add arcade retro styling for the target score select dropdown consistent with existing buttons and color scheme.
- `main.js`:
  - Update `GameConfig` and `Engine` to consume the dynamically selected target score.
  - Update `I18n` translation strings and formatting helpers to handle variable target scores.
  - Bind change event listeners to update HUD and score limits immediately.
