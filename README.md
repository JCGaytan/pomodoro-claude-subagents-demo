# 🍅 Pomodoro App

A simple full-stack Pomodoro application with a backend API and a frontend UI.

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* **Node.js (>= 18)**
* **npm** (comes with Node.js)
* A web browser (Chrome, Edge, Safari, etc.)

Node.js is required to run the backend server and manage dependencies, while npm is used to install project packages ([MDN Web Docs][1]).

---

## 📦 Installation

Clone the repository:

```bash
git clone <your-repo-url>
cd pomodoro-agents-demo
```

Install dependencies:

```bash
npm install
```

This will install required packages such as:

* Express (backend server)
* Jest (testing)

---

## ▶️ Running the Application

### 1. Start the backend server

```bash
node backend/server.js
```

You should see:

```text
Server running on http://localhost:3000
```

The backend is built using Express, a lightweight framework for building APIs in Node.js ([GeeksforGeeks][2]).

---

### 2. Open the frontend

Open the following file in your browser:

```text
frontend/index.html
```

---

### 3. Interact with the app

* Click the **Next** button to interact with the timer
* Observe changes directly in the UI

---

## 🧪 Running Tests

To execute the test suite:

```bash
npm test
```

---

## 🧱 Project Structure

```text
pomodoro-agents-demo/
├── frontend/              # UI (HTML, CSS, JS)
│   ├── index.html
│   ├── app.js
│   └── styles.css
│
├── backend/              # API server (Node + Express)
│   ├── server.js
│   └── timer.js
│
├── tests/                # Unit tests
│   └── timer.test.js
│
├── .claude/              # Agent configurations
│   └── agents/
│
├── package.json          # Project dependencies
└── README.md
```

---

## 🧠 Overview

* **Frontend**: simple UI for interacting with the timer
* **Backend**: API that manages application state
* **Tests**: validate core logic
* **Agents**: predefined configurations for AI workflows

---

## 🚀 Notes

* The backend runs locally on `http://localhost:3000`
* The frontend communicates with the backend via HTTP requests
* No build step is required — everything runs locally

---

## 📌 Quick Start Summary

```bash
npm install
node backend/server.js
# open frontend/index.html
```

[1]: https://developer.mozilla.org/ms/docs/Learn/Server-side/Express_Nodejs/development_environment?utm_source=chatgpt.com "Setting up a Node development environment - Learn web development | MDN"
[2]: https://www.geeksforgeeks.org/how-to-set-up-your-node-js-and-express-development-environment/?utm_source=chatgpt.com "How to set up your Node.js and Express development environment? - GeeksforGeeks"
