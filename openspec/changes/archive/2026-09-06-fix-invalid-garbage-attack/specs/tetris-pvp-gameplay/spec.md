## ADDED Requirements

### Requirement: Garbage Lines Attack Activation
The system SHALL trigger a garbage attack on the opponent if and only if a completed line clear meets at least one of the following two exclusive conditions:
1. The line clear is executed directly by locking a Special Multicolor Tetromino (`activePiece.isSpecial === true`).
2. The line clear removes at least one full row that is 100% composed of special multicolor minos, regardless of whether the closing piece is standard or special.

When activated, the attack scale SHALL be:
- 1 or 2 lines cleared: 2 gray garbage lines sent to the opponent.
- 3 lines cleared: 3 gray garbage lines sent to the opponent.
- 4 lines cleared (Tetris): 4 gray garbage lines sent to the opponent, PLUS a direct bonus of 10,000 points awarded to the attacking player.

#### Scenario: Attack triggered directly by a Special Tetromino
- **WHEN** a player locks a Special Tetromino and completes 1, 2, 3, or 4 lines
- **THEN** the opponent receives 2, 3, or 4 garbage lines respectively and standard line score is awarded

#### Scenario: Attack triggered by completing a 100% special row
- **WHEN** a player locks a piece that clears at least one row consisting 100% of special minos
- **THEN** the opponent receives 2, 3, or 4 garbage lines respectively and standard line score is awarded

### Requirement: Garbage Attack Restriction on Mixed Rows
The system SHALL strictly block garbage attacks when a line clear is executed by a standard (non-special) tetromino on heterogeneous rows (rows that contain a mixture of standard blocks and leftover special blocks).

#### Scenario: Standard piece clearing heterogeneous row
- **WHEN** a player locks a standard tetromino that completes one or more rows containing leftover special minos mixed with standard blocks
- **THEN** 0 garbage lines are sent to the opponent, no saturation doubling is triggered, and only local line clear score is awarded

#### Scenario: Standard piece clearing standard row
- **WHEN** a player locks a standard tetromino that completes rows consisting purely of standard blocks or pre-existing garbage blocks
- **THEN** 0 garbage lines are sent to the opponent and only local line clear score is awarded
