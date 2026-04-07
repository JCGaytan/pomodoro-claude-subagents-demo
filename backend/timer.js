let state = "focus";
let sessions = 0;

function nextSession() {
  if (state === "focus") {
    state = "break";
  } else {
    state = "focus";
    sessions++; // Increment session count after completing a full cycle
  }

  return { state, sessions };
}

function getState() {
  return { state, sessions };
}

function getSessionCount() {
  return sessions;
}

function reset() {
  state = "focus";
  sessions = 0;
}

module.exports = { nextSession, getState, getSessionCount, reset };
// Added dummy comment to trigger hook