## Purpose

Provides a real-time, two-player local split-screen Tetris competitive game with concurrent keyboard controls, independent boards, arcade scoring, and dual victory conditions.

## Requirements

### Requirement: Start Screen and Navigation
The game SHALL display a home start screen with an arcade title ("TetrisPvP"), a "Start Game" action, and an "Instructions" action that opens a modal detailing game rules and keyboard controls.

#### Scenario: Opening instructions modal
- **WHEN** the player clicks the "Instructions" button on the home screen
- **THEN** the game displays a modal detailing victory rules and key mappings for Player 1 and Player 2 without starting gameplay

#### Scenario: Starting match from home screen
- **WHEN** the player clicks the "Start Game" button
- **THEN** the home screen transitions immediately into the active split-screen match and the game loop starts

### Requirement: Independent Dual Boards and Split Screen
The system SHALL present a symmetric split-screen layout with Player 1's board on the left and Player 2's board on the right, operating with isolated state, grids, and active tetrominoes.

#### Scenario: Simultaneous independent gameplay
- **WHEN** Player 1 performs actions or clears lines
- **THEN** Player 2's board state, active piece, and grid remain completely unaffected

### Requirement: Piece Spawning and Next Piece Preview
The system SHALL generate standard 7 tetromino shapes (`I`, `J`, `L`, `O`, `S`, `T`, `Z`) randomly for each player independently, and SHALL display each player's upcoming tetromino in an external side preview canvas.

#### Scenario: Previewing next piece
- **WHEN** an active tetromino locks into the grid
- **THEN** the previewed piece becomes the new active tetromino at the top spawn area and a new random piece is drawn in the preview canvas

### Requirement: Gravity and Movement Controls
Each player's active piece SHALL descend at a steady gravity tick rate. Players SHALL be able to shift pieces left, right, and rotate 90 degrees clockwise within board boundaries. Players SHALL be able to perform a Soft Drop that accelerates piece descent while held or pressed.

#### Scenario: Horizontal movement and rotation
- **WHEN** Player 1 presses `A` or `D`, or Player 2 presses `J` or `L`
- **THEN** the corresponding player's piece shifts one column left or right if no obstacle blocks it
- **WHEN** Player 1 presses `W` or Player 2 presses `I`
- **THEN** the corresponding player's piece rotates 90 degrees clockwise if the rotation does not collide with locked blocks or board walls

#### Scenario: Soft drop execution
- **WHEN** Player 1 presses or holds `S`, or Player 2 presses or holds `K`
- **THEN** the corresponding player's piece descends at an accelerated drop rate (faster than standard gravity) toward the floor

### Requirement: Hard Drop Mechanics
Players SHALL be able to perform an instantaneous Hard Drop that sends the active piece straight down to the lowest valid row, locking it immediately and awarding bonus score based on distance dropped.

#### Scenario: Hard drop execution
- **WHEN** Player 1 presses `F` or `Space` (Spacebar), or Player 2 presses `H` or `Enter`
- **THEN** the piece immediately drops to the lowest valid position, locks into the matrix, and awards 20 points per cell traversed instantly

### Requirement: Concurrent Non-Blocking Inputs
The system SHALL process key inputs using an asynchronous keyboard state tracker so that holding or pressing keys for Player 1 does not block, delay, or drop key events for Player 2.

#### Scenario: Simultaneous keyboard actions
- **WHEN** Player 1 holds `A` while Player 2 presses `I` or `K`
- **THEN** both inputs are evaluated independently in the same animation frame without latency or missed inputs

### Requirement: Line Clearing and Arcade Scoring
When one or more horizontal rows are fully filled with blocks, the system SHALL clear them, shift upper rows downward, and award points according to the standard arcade table:
- 1 line: 1,000 points
- 2 lines: 3,000 points
- 3 lines: 6,000 points
- 4 lines: 12,000 points

#### Scenario: Clearing multiple lines
- **WHEN** a piece locks and completes 4 horizontal rows simultaneously
- **THEN** the 4 rows are removed from the board, all rows above drop down by 4, and 12,000 points are added to the player's total score

### Requirement: Victory by Top-Out Overflow
If a newly spawned tetromino cannot be placed at the top of the matrix due to existing locked blocks, or if a block locks outside the visible top bounds, the affected player loses immediately and the opposing player wins.

#### Scenario: Player 1 tops out
- **WHEN** Player 1's grid overflows at the top spawn boundary
- **THEN** the game loop stops immediately and Player 2 is declared the winner

### Requirement: Victory by Target Score
The system SHALL track score against a configurable target (`WIN_SCORE`, default 100,000 points). The first player whose accumulated score equals or exceeds `WIN_SCORE` SHALL win the match immediately.

#### Scenario: Reaching score target
- **WHEN** a player completes a line clear or hard drop that brings their score to 100,000 points or greater
- **THEN** the game loop terminates immediately and that player is declared the winner

### Requirement: Game Over and Match Restart Lifecycle
Upon match conclusion by top-out or score limit, the system SHALL display a Game Over modal indicating the winner and providing "Rematch" and "Return to Menu" actions.

#### Scenario: Triggering rematch
- **WHEN** a player clicks "Rematch" in the Game Over modal
- **THEN** both boards, scores, and preview pieces reset to initial values and a fresh match starts immediately

#### Scenario: Returning to menu
- **WHEN** a player clicks "Return to Menu" in the Game Over modal
- **THEN** the boards reset and the view transitions back to the Home screen
