## MODIFIED Requirements

### Requirement: Start Screen and Navigation
The game SHALL display a home start screen with an arcade title ("TetrisPvP"), a "Start Game" action, an "Instructions" action that opens a modal detailing game rules and keyboard controls, and a Target Score selector allowing players to configure the winning match score.

#### Scenario: Opening instructions modal
- **WHEN** the player clicks the "Instructions" button on the home screen
- **THEN** the game displays a modal detailing victory rules and key mappings for Player 1 and Player 2 without starting gameplay

#### Scenario: Starting match from home screen
- **WHEN** the player clicks the "Start Game" button
- **THEN** the home screen transitions immediately into the active split-screen match with the configured winning target score and the game loop starts

#### Scenario: Changing target score on home screen
- **WHEN** the player selects a new target score from the dropdown selector
- **THEN** the home screen target hint updates dynamically to reflect the chosen threshold and active language

### Requirement: Victory by Target Score
The system SHALL track score against a dynamically configured target (`WIN_SCORE`), selectable from a ladder spanning 100,000 to 5,000,000 points (default: 100,000). The first player whose accumulated score equals or exceeds the active `WIN_SCORE` SHALL win the match immediately.

#### Scenario: Reaching score target
- **WHEN** a player completes a line clear or hard drop that brings their score to or above the configured `WIN_SCORE` (e.g. 100,000, 500,000, or 5,000,000 pts)
- **THEN** the game loop terminates immediately and that player is declared the winner with the modal reason citing the achieved target

#### Scenario: Rematch retains configured target score
- **WHEN** players initiate a rematch from the Game Over modal
- **THEN** the active match resets scores to 0 but retains the previously selected `WIN_SCORE` threshold

## ADDED Requirements

### Requirement: Target Score Selector Options and HUD Synchronization
The system SHALL provide a target score selector on the home screen offering distinct duration presets scaling from 100,000 to 5,000,000 points, and SHALL synchronize all in-game HUD indicators and player scoreboards with the active target.

#### Scenario: Available target score options
- **WHEN** the player views the target score selector dropdown
- **THEN** the selector presents values: 100,000 (100K), 250,000 (250K), 500,000 (500K), 1,000,000 (1M), 2,500,000 (2.5M), and 5,000,000 (5M) with 100,000 selected by default

#### Scenario: In-game HUD target synchronization
- **WHEN** a match starts with a selected target score
- **THEN** the match header (`#global-goal`) and both players' scoreboards (`.score-target`) display the formatted target threshold (e.g. `/ 500.000` or `/ 5.000.000`)
