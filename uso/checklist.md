## Game Checklist
- [x] Scale the canvas and elements inside based off vh and vw.

- [x] Code Notes
- [x] Correct the time of note drop based on when the notes need to be hit
- [x] Spawn the notes when they’re ready to be dropped with resetTimeout
- [x] Code Sliders
- [ ] osu!mania Mods [**Wilson**]

- [x] Combo
- [x] Fix Judgements
- [x] Scoring
- [ ] Add Health Bar [**Harvey**]

- [x] Incorporate Music
- [ ] Hit Sounds [**Harvey**]
  - [ ] Hit sound when no note is hit
  - [ ] Hit sound when note is hit
  - [ ] Load custom sounds and use them
- [ ] Hit Effects (Inside Canvas) [**Wilson**]
  - [ ] Change combo
  - [ ] Change hit value
  - [ ] Change slider length when held
  - [ ] Color in target circle when key is pressed (indicator)
- [ ] Hit Effects (Out Canvas/CSS) [**Kenny**]

- [ ] Add pausing to the game [**Wilson**]
  - Pause when out of focus
  - Add buttons to restart song and back to beatmaps page
- [ ] Skip intro button [**Wilson**]
- [ ] Show end game results (Shown below)
- [ ] Pause when out of focus (Shown below)

## Site Checklist

### Pages to Design

- [ ] Game Modals [**Kenny**, **Ethan**]
  - [ ] Pause Screen (With restart and back to beatmaps) [**Kenny**]
  - [ ] End Game Screen (With restart and back to beatmaps)
- [ ] Site Pages [**Kenny**, **Ethan**]
  - [ ] Settings
  - [ ] Global Leaderboard
  - [ ] Per Song Leaderboard
  - [ ] User Profile (Show User Stats)
  - [x] Help Page [**Kenny**]
  - [ ] Game Page [**Kenny**]

### Site Functionality

- [ ] User added beatmaps [**Wilson**]
  - Stored locally with localForage
- [ ] Gacha Game [**Ethan**, **Harvey**]

### Site Final Fixes

- [ ] Change home beatmaps and info
- [ ] Change help page to help text

## Backend Checklist

- [ ] Authentication [**Ryan**, **Kenny**]
- [ ] MongoDB [**Ryan**]
  - [ ] User stats
  - [ ] Global leaderboard stats
  - [ ] Song leaderboard stats
  - [ ] On song end, upload to MongoDB

## Wilson's Tasklist

1. Determine source of lag coming from pause and attempt to fix it.
2. Implement skip intro
  - Show a skip button that only exists at least 5 seconds before the first note spawns
  - If the button is pressed, subtract time from all the timers (equal to 5 seconds left before first note is supposed to be hit
  - Else, remove the skip button and continue song normally
3. Implement restart
  - Remake the canvas and reset everything
4. Hit Effects
