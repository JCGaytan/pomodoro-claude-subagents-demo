const express = require("express");
const cors = require("cors");

const { nextSession, getState } = require("./timer");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Pomodoro API running" });
});

// Get current state
app.get("/state", (req, res) => {
  res.json(getState());
});

// Move to next session (THIS triggers bug / fix)
app.post("/next", (req, res) => {
  const result = nextSession();
  res.json(result);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});