// Pomodoro Timer - Enhanced UI Controller
const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60;  // 5 minutes in seconds

let currentTime = FOCUS_TIME;
let timerInterval = null;
let isRunning = false;

// DOM Elements
const timerDisplay = document.getElementById('timer');
const timerLabel = document.getElementById('timerLabel');
const timerCard = document.getElementById('timerCard');
const modeElement = document.getElementById('mode');
const countElement = document.getElementById('count');
const focusTimeElement = document.getElementById('focusTime');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const statusMessage = document.getElementById('statusMessage');
const nextBtn = document.getElementById('nextBtn');
const btnText = nextBtn.querySelector('.btn-text');
const btnIcon = nextBtn.querySelector('.btn-icon');
const modeTabs = document.querySelectorAll('.mode-tab');

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update timer display
function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(currentTime);
    timerDisplay.classList.add('counting');
    setTimeout(() => timerDisplay.classList.remove('counting'), 1000);
}

// Start/Pause timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        btnText.textContent = 'Resume';
        btnIcon.textContent = '▶';
        statusMessage.textContent = 'Timer paused. Click Resume to continue.';
    } else {
        isRunning = true;
        btnText.textContent = 'Pause';
        btnIcon.textContent = '⏸';
        statusMessage.textContent = modeElement.classList.contains('focus')
            ? 'Focus session in progress! Stay productive 💪'
            : 'Take a break! Relax and recharge 🌟';

        timerInterval = setInterval(() => {
            if (currentTime > 0) {
                currentTime--;
                updateTimerDisplay();
            } else {
                // Timer finished
                clearInterval(timerInterval);
                isRunning = false;
                completeSession();
            }
        }, 1000);
    }
}

// Complete current session
function completeSession() {
    btnText.textContent = 'Start Session';
    btnIcon.textContent = '▶';
    statusMessage.textContent = 'Session complete! Click to continue.';
}

// Update UI based on state
function updateUI(data) {
    const state = data.state;
    const sessions = data.sessions;

    // Update mode badge
    modeElement.textContent = state;
    modeElement.className = `state-badge ${state}`;

    // Update timer card style
    timerCard.className = `timer-card ${state}-mode`;

    // Update tabs
    modeTabs.forEach(tab => {
        if (tab.dataset.mode === state) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Reset timer for new state
    clearInterval(timerInterval);
    isRunning = false;
    currentTime = state === 'focus' ? FOCUS_TIME : BREAK_TIME;
    updateTimerDisplay();

    // Update labels
    if (state === 'focus') {
        timerLabel.textContent = 'Time to focus!';
        statusMessage.textContent = 'Ready to focus? Click Start Session to begin.';
        progressFill.classList.remove('break');
    } else {
        timerLabel.textContent = 'Take a break!';
        statusMessage.textContent = 'Great work! Take a short break to recharge.';
        progressFill.classList.add('break');
    }

    btnText.textContent = 'Start Session';
    btnIcon.textContent = '▶';

    // Update stats
    countElement.textContent = sessions;
    const focusMinutes = sessions * 25;
    focusTimeElement.textContent = focusMinutes;

    // Update progress (goal: 4 sessions)
    const goal = 4;
    const progressPercent = Math.min((sessions / goal) * 100, 100);
    progressFill.style.width = `${progressPercent}%`;
    progressText.textContent = `${sessions} / ${goal} sessions`;
}

// Fetch current state from backend
async function fetchState() {
    try {
        const response = await fetch('http://localhost:3000/state');
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Failed to fetch state:', error);
        statusMessage.textContent = '⚠️ Cannot connect to server. Make sure it\'s running on port 3000.';
        statusMessage.style.borderLeftColor = '#ef4444';
    }
}

// Advance to next session
async function next() {
    // If timer is running, treat this as pause
    if (isRunning) {
        toggleTimer();
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/next', { method: 'POST' });
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Failed to advance session:', error);
        statusMessage.textContent = '⚠️ Cannot connect to server. Make sure it\'s running on port 3000.';
        statusMessage.style.borderLeftColor = '#ef4444';
    }
}

// Tab click handlers
modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Visual feedback only - actual mode change happens via next()
        const mode = tab.dataset.mode;
        if (mode !== modeElement.textContent) {
            next();
        }
    });
});

// Button click handler
nextBtn.addEventListener('click', () => {
    if (nextBtn.textContent.includes('Start') || nextBtn.textContent.includes('Resume')) {
        toggleTimer();
    } else if (nextBtn.textContent.includes('Pause')) {
        toggleTimer();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        toggleTimer();
    } else if (e.code === 'Enter') {
        e.preventDefault();
        next();
    }
});

// Load initial state when page loads
fetchState();

// Refresh state every 30 seconds to stay in sync
setInterval(fetchState, 30000);
