# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Pomodoro timer application demonstrating AI agent workflows. It consists of an Express.js backend API and a vanilla JavaScript frontend.

## Commands

### Run the Application
```bash
# Start the backend server (runs on http://localhost:3000)
npm start
# or
node backend/server.js

# Open the frontend
# Open frontend/index.html in a browser manually
```

### Run Tests
```bash
# Run all tests
npm test

# Run a specific test file
npx jest tests/timer.test.js

# Run tests in watch mode
npx jest --watch
```

## Architecture

### Backend (`backend/`)
- **`server.js`**: Express server that exposes REST endpoints on port 3000
  - `GET /` - Health check
  - `GET /state` - Returns current timer state
  - `POST /next` - Advances to next session (focus ↔ break)
- **`timer.js`**: Core state machine logic for the Pomodoro timer
  - Tracks current state ("focus" or "break") and session count
  - **Known bug**: In `nextSession()`, line 8 incorrectly sets `state = "break"` instead of toggling to "focus"

### Frontend (`frontend/`)
- **`index.html`**: Simple HTML UI with a mode display and Next button
- **`app.js`**: Client-side JavaScript that calls the backend API

### Tests (`tests/`)
- **`timer.test.js`**: Jest unit tests for timer logic
  - Tests expect `getSessionCount()` and `reset()` functions that don't exist yet
  - Tests validate state transitions and session counting

## Key Implementation Details

### Timer State Machine
The timer should alternate between "focus" and "break" states:
- Starting state: "focus"
- `nextSession()` toggles between states
- A full cycle (focus → break → focus) increments the session counter

### Known Issues
- `backend/timer.js` line 8 has a bug: always sets state to "break" instead of toggling
- `timer.js` is missing `getState()`, `getSessionCount()`, and `reset()` exports that tests expect
- `frontend/app.js` references a `next()` function that should call the backend API

## Testing

Tests use Jest with default configuration (no jest.config.js needed for basic setup). Tests import from `../backend/timer` and expect:
- State to toggle between "focus" and "break"
- `getSessionCount()` to return completed cycles
- `reset()` to clean state between tests
