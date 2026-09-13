## ADDED Requirements

### Requirement: Match Pause and Resume Toggle via Escape Key
The system SHALL provide a pause and resume toggle bound to the `Escape` (`Esc`) key during an active match. When the match is in the playing state, pressing `Escape` SHALL immediately pause the game. When the match is in the paused state, pressing `Escape` SHALL resume active gameplay. Players SHALL be able to alternate between paused and playing states indefinitely using `Escape`.

#### Scenario: Pausing an active match with Escape key
- **WHEN** a match is actively in progress (`PLAYING` state) and either player presses the `Escape` key
- **THEN** gameplay freezes immediately, the game state transitions to `PAUSED`, piece gravity, auto-repeat inputs (DAS/ARR), and player actions stop processing, and a pause visual overlay is displayed on screen

#### Scenario: Resuming a paused match with Escape key
- **WHEN** the game is in the `PAUSED` state and either player presses the `Escape` key
- **THEN** the pause overlay is dismissed, the game state transitions back to `PLAYING`, animation frame delta-time is resynchronized to prevent sudden gravity drop spikes, and normal player control resumes

#### Scenario: Repeatedly toggling pause and resume
- **WHEN** the user presses the `Escape` key multiple times during a match
- **THEN** the system alternates reliably between `PAUSED` and `PLAYING` states on every press without corrupting board state, active pieces, or player scores

#### Scenario: Escape key outside active match
- **WHEN** the user presses the `Escape` key while on the home menu or the game over modal
- **THEN** the system ignores the pause trigger and does not alter the current screen or game state

### Requirement: Background Music Pause and Resume Synchronization
The system SHALL pause background music playback when the match enters the paused state and SHALL resume music playback from the exact paused timestamp when the match returns to the playing state.

#### Scenario: Background music pauses on game pause
- **WHEN** the match transitions from `PLAYING` to `PAUSED`
- **THEN** the sound manager pauses the background music playback without resetting its playback position (`currentTime`) to zero

#### Scenario: Background music resumes on game unpause
- **WHEN** the match transitions from `PAUSED` to `PLAYING`
- **THEN** the sound manager resumes background music playback from the exact position where it was paused
