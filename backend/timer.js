let state = "focus";
let sessions = 0;

function nextSession() {
  if (state === "focus") {
    state = "break";
  } else {
    state = "break"; // ❌ BUG
  }

  return { state, sessions };
}

module.exports = { nextSession };