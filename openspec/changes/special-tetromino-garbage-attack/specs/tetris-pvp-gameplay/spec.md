## MODIFIED Requirements

### Requirement: Independent Dual Boards and Split Screen
The system SHALL present a symmetric split-screen layout with Player 1's board on the left and Player 2's board on the right, operating with isolated active pieces while allowing competitive garbage attacks to transfer between boards.

#### Scenario: Simultaneous independent gameplay
- **WHEN** a player moves, rotates, drops, or clears lines without a Special Tetromino
- **THEN** the opposing player's board state, active piece, and grid remain unaffected

#### Scenario: Competitive garbage interaction
- **WHEN** a player clears lines with a Special Tetromino
- **THEN** the opposing player's board receives garbage lines pushed from the bottom while their active piece continues unaffected

## ADDED Requirements

### Requirement: Special Multicolor Tetromino Spawning
The system SHALL track the number of tetrominoes generated for each player and SHALL mark every 5th tetromino as a Special Tetromino. The Special Tetromino SHALL render each of its minos in a distinct vibrant color with a neon glowing border, both on the active board and in the Next Piece preview canvas.

#### Scenario: Spawning the 5th tetromino in queue
- **WHEN** a player locks 4 pieces and the 5th piece enters active play
- **THEN** that piece is marked as special and rendered with independent multicolor blocks and glowing borders

#### Scenario: Previewing special piece
- **WHEN** the 5th piece is generated in the preview slot
- **THEN** the Next Piece canvas renders the tetromino with multicolor minos and luminous styling

### Requirement: Garbage Lines Attack Activation
The system SHALL trigger a garbage attack on the opponent if and only if a line clear meets at least one of the following two exclusive conditions:
1. The line clear is executed directly by locking a Special Tetromino (`activePiece.isSpecial === true`).
2. The line clear removes at least one full row that is 100% composed of special multicolor minos, regardless of whether the closing piece is standard or special.

Line clears triggered by a standard piece on heterogeneous rows (containing a mixture of standard blocks and leftover special blocks) SHALL NOT trigger a garbage attack and SHALL award only standard points with zero garbage lines sent to the opponent.

The attack scale SHALL be:
- 1 or 2 lines cleared: 2 garbage lines sent to the opponent.
- 3 lines cleared: 3 garbage lines sent to the opponent.
- 4 lines cleared (Tetris): 4 garbage lines sent to the opponent, PLUS a direct bonus of 10,000 points awarded to the attacking player.

#### Scenario: Line clear executed with a Special Tetromino
- **WHEN** a player locks a Special Tetromino that completes 1, 2, 3, or 4 lines
- **THEN** the opponent receives the corresponding garbage lines (2, 3, or 4)

#### Scenario: Line clear with a 100% homogeneous special row
- **WHEN** a player locks a piece (standard or special) that clears at least one row consisting 100% of special minos
- **THEN** the opponent receives the corresponding garbage lines (2, 3, or 4)

#### Scenario: Standard piece clearing a heterogeneous (mixed) row
- **WHEN** a player locks a standard tetromino that completes a line containing one or more leftover special minos mixed with standard blocks
- **THEN** no garbage lines are sent to the opponent, no saturation doubling is triggered, and only standard clear points are awarded

#### Scenario: Normal clear without special minos
- **WHEN** a player clears lines that contain only standard tetromino minos or pre-existing garbage blocks
- **THEN** no garbage lines are sent to the opponent

### Requirement: Garbage Lines Insertion and Structure
When a player receives garbage lines, the system SHALL push the existing board contents upward from the bottom of the grid. Each garbage line SHALL consist of opaque gray blocks (`#555555`) with exactly one randomly placed empty hole per row, allowing the defending player to clear them.

#### Scenario: Receiving garbage lines
- **WHEN** a player is attacked with N garbage lines
- **THEN** the player's grid shifts upward by N rows and N gray rows with 1 random hole each are inserted at the bottom

### Requirement: Garbage Saturation Cap and Score Multiplier
The system SHALL enforce a maximum limit of 16 garbage rows on any board (measured from the bottom of the 20-row grid). If an attack would cause the opponent's total garbage rows to exceed 16:
- Only enough rows to reach the 16-row limit SHALL be inserted.
- If the opponent already has 16 rows of garbage and the attacker executes a line clear with a Special Tetromino, NO additional garbage lines SHALL be inserted, and the attacker SHALL be awarded double the base points for that line clear.

#### Scenario: Attack against opponent with room under 16 rows
- **WHEN** an opponent has 14 garbage rows and receives a 3-line garbage attack
- **THEN** only 2 garbage rows are inserted to cap total garbage rows at 16

#### Scenario: Attack against fully saturated opponent (16 rows)
- **WHEN** an opponent already has 16 garbage rows and the player clears lines with a Special Tetromino
- **THEN** 0 garbage rows are sent to the opponent and the attacking player receives 2x the standard line clear points for that clear
