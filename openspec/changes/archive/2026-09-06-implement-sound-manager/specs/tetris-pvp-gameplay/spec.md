## ADDED Requirements

### Requirement: Procedural Movement and Drop Sound Effects
The system SHALL synthesize real-time auditory feedback procedural waveforms via the browser's native Web Audio API for piece maneuvers without relying on external audio files.

#### Scenario: Lateral piece movement and soft drop
- **WHEN** Player 1 or Player 2 moves an active tetromino left, right, or initiates a soft drop
- **THEN** the sound manager generates a subtle, ultra-short blip (30-50 ms) at low volume to prevent acoustic fatigue

#### Scenario: Instantaneous hard drop
- **WHEN** Player 1 or Player 2 executes a hard drop
- **THEN** the sound manager generates a punchy, dry percussive thump with rapid exponential decay in frequency and volume upon matrix impact

### Requirement: Procedural Line Clear and Tetris Sound Feedback
The system SHALL synthesize clear tonal audio feedback whose pitch scales with the number of lines cleared, culminating in a triumphant multi-note arpeggio when a 4-line Tetris clear occurs.

#### Scenario: Clearing 1, 2, or 3 lines
- **WHEN** a player completes 1, 2, or 3 lines simultaneously
- **THEN** the sound manager synthesizes a bright melodic tone whose frequency scales progressively higher according to line count

#### Scenario: Clearing 4 lines (Tetris)
- **WHEN** a player completes a 4-line Tetris clear
- **THEN** the sound manager synthesizes a rapid ascending triumphant multi-note arpeggio celebrating the achievement

### Requirement: Match Conclusion Sound Effect
The system SHALL synthesize a dramatic, dissonant descending pitch drop when a match finishes via top-out overflow or target score achievement.

#### Scenario: Game Over match resolution
- **WHEN** a match ends and transitions to the Game Over state
- **THEN** the sound manager synthesizes a descending pitch drop using a sawtooth oscillator fading into low bass frequencies

### Requirement: Web Audio Autoplay Lifecycle and Mute Control
The system SHALL manage the `AudioContext` lifecycle to comply with browser Autoplay policies, unlocking audio upon the first user interaction, and maintaining global mute state across gameplay.

#### Scenario: Unlocking audio upon user interaction
- **WHEN** the user interacts with the application by clicking a button (such as "Start Game") or pressing any game key
- **THEN** the sound manager initializes or resumes the `AudioContext` from suspended state

#### Scenario: Suppressing audio when muted
- **WHEN** the sound manager has `isMuted` set to true
- **THEN** sound trigger requests are bypassed without scheduling oscillator nodes or emitting sound
