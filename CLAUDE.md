# Project Context

This is a simple Pomodoro application with a frontend (HTML/JS) and a backend (Node.js + Express).

The application exposes an API that manages timer state and session tracking.

---

# Objective

When working on this project:

- Prioritize correctness over complexity
- Keep implementations simple and readable
- Validate all changes through tests and UI behavior

---

# Architecture

## Frontend
- Located in `frontend/`
- Uses plain HTML, CSS, and JavaScript
- Communicates with backend via HTTP (fetch)

## Backend
- Located in `backend/`
- Node.js with Express
- Core logic in `timer.js`
- API exposed via `server.js`

## Tests
- Located in `tests/`
- Uses Jest
- Focus on validating timer behavior

---

# Key Files

- `backend/timer.js` → core application logic
- `backend/server.js` → API endpoints
- `frontend/app.js` → UI interaction logic
- `tests/timer.test.js` → unit tests

---

# Development Workflow

When solving tasks:

1. Understand the problem (use debugger if needed)
2. Identify relevant files
3. Apply minimal changes
4. Run tests
5. Validate behavior in UI

Always follow this sequence.

---

# Sub-Agent Usage

Use specialized agents when appropriate:

- debugger → investigate issues and find root cause
- implementer → apply fixes and implement features
- test-runner → run tests and validate behavior
- code-reviewer → review correctness and quality

Prefer structured workflows over single-agent execution.

---

# Testing

Run tests with:

```bash
npm test