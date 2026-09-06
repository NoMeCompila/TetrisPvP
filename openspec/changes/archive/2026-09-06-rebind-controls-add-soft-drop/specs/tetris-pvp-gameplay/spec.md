## MODIFIED Requirements

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
