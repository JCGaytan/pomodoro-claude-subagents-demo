let state = "focus";
let sessions = 0;

function reset() {
  state = "focus";
  sessions = 0;
}

function getSessionCount() {
  return sessions;
}

function nextSession() {
  if (state === "focus") {
    state = "break";
  } else {
    state = "focus";
    sessions++;
  }

  return { state, sessions };
}

module.exports = { nextSession, getSessionCount, reset };