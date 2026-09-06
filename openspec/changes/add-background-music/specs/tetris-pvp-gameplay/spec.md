## ADDED Requirements

### Requirement: Background Music Playback and Looping
The system SHALL load the local audio asset `./tetris-main-theme.mp3` as the game background music (BGM) and play it continuously in an infinite loop while a match is actively in progress. The BGM volume SHALL be balanced at a non-intrusive level (nominally 0.25) to preserve clarity and prominence of procedural sound effects (SFX).

#### Scenario: Looping BGM during active match
- **WHEN** a match is in progress
- **THEN** the system plays `./tetris-main-theme.mp3` continuously with looping enabled and volume set to a moderate level that does not mask procedural SFX

#### Scenario: Preserving silence in menu screens
- **WHEN** the application displays the home start screen or the instructions modal
- **THEN** the background music remains stopped and completely silent

### Requirement: Background Music Match State Synchronization
The system SHALL synchronize background music playback strictly with match lifecycle transitions.

#### Scenario: Starting match from home screen
- **WHEN** the player clicks "Start Game" to enter an active match
- **THEN** the system starts BGM playback from the beginning

#### Scenario: Triggering rematch
- **WHEN** the player clicks "Rematch" after a game concludes
- **THEN** the system restarts BGM playback from the beginning (`currentTime = 0`)

#### Scenario: Match end on game over or victory
- **WHEN** a match concludes due to top-out overflow or reaching the winning score target
- **THEN** the system stops BGM playback immediately, resets playback position to the start, and displays the Game Over modal in silence allowing match conclusion SFX to stand out

#### Scenario: Returning to menu from game over modal
- **WHEN** the player clicks "Return to Menu" from the Game Over modal
- **THEN** the system ensures BGM playback remains stopped and reset to the beginning

### Requirement: Background Music Audio Control and Autoplay Compliance
The system SHALL integrate BGM playback with the global audio mute state and handle browser Autoplay policy restrictions cleanly.

#### Scenario: Browser autoplay policy restriction handling
- **WHEN** BGM playback is initiated programmatically before explicit user media gesture approval is granted
- **THEN** the system catches the rejected play promise cleanly without throwing unhandled exceptions or disrupting gameplay logic

#### Scenario: Global mute toggle mutes BGM and SFX synchronously
- **WHEN** the player clicks a sound toggle button (`#btn-sound-toggle` or `#btn-sound-match-toggle`) while BGM is playing
- **THEN** the system mutes both procedural SFX and the active BGM simultaneously

#### Scenario: Unmuting during active match restores BGM volume
- **WHEN** the player clicks a sound toggle button to unmute while an active match is underway
- **THEN** the system restores BGM audio output to its configured volume level immediately

#### Scenario: Unmuting while in menu does not trigger BGM playback
- **WHEN** the player toggles unmute while on the home screen or instructions modal
- **THEN** the system updates the global mute preference but leaves BGM stopped and silent until a match begins
