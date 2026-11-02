# Penalty Arena

An English-only penalty shootout learning game for Connect Plus Primary 5, Units 1 and 2.

**Designed & programmed by Mr.Mohamed Farid.**

## Play

Open `index.html` or serve this folder with any static web server. No install, build step, account or database is required. GitHub Pages can publish the main branch root.

- 112 source-mapped questions across 14 lessons.
- Multiple choice, true/false and typed correction questions.
- Both units, individual units, and vocabulary/grammar/content focus.
- Quick Match, Cup Run and Full Training.
- Realistic generated stadium and transparent player/keeper imagery, animated shots, optional synthesized sound, reduced-motion support and mobile layout.
- First-attempt accuracy, XP, streaks, round coaching and complete answer review.
- Session resume in the current browser tab; New Student clears the session.
- Full result and answer report through WhatsApp message parts, text download, copy and print.

WhatsApp buttons prepare messages to **+966552019074**. Students must press Send in WhatsApp for each part. The app cannot confirm delivery. No student information is sent to a server by the game. This is an editable browser practice game, not an authenticated exam system.

## Curriculum

See [CURRICULUM.md](CURRICULUM.md) for lesson objectives, printed page mapping, exclusions and assessment limits. Literature Corner (Lesson 6 in both units) is fully excluded. Other story lessons are retained. The original textbook PDF is not included in this repository.

## Files

- `content.js`: lesson metadata and authored question bank.
- `engine.js`: selection, scoring, answer normalization and reporting.
- `app.js`: interface, session state, audio and animation.
- `styles.css`: responsive interface and print layout.
- `assets/`: game imagery and icon.

Images were generated with the built-in image generation tool and optimized as WebP. Generation prompts are recorded in `ASSETS.md`. Fonts are requested from Google Fonts with system fallbacks. No analytics, trackers, remote scripts or application backend are used.
