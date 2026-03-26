function updateUI(data) {
  const modeEl = document.getElementById("mode");

  modeEl.innerText = data.state;

  // Change color dynamically
  modeEl.className = data.state;

  document.getElementById("count").innerText = data.sessions;
}