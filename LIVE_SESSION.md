# 🚀 Live Session Guide — Pomodoro App (Agents + MCP + Hooks)

## 🎯 Objective

In this session you will:

* Work with a real application (frontend + backend)
* Use GitHub to report and track issues
* Use Claude Code with sub-agents to:

  * Investigate a problem
  * Implement a solution
  * Validate behavior
* Add automated validation using hooks

---

# 🧱 1. Setup

## Install dependencies

```bash
npm install
```

## Start the backend

```bash
node backend/server.js
```

## Open the app

Open in your browser:

```
frontend/index.html
```

---

# 🧪 2. Explore the Application

* Click the **Next** button multiple times
* Observe how the application behaves

👉 Try to understand:

* What is happening?
* What seems incorrect?

---

# 🐞 3. Report the Issue (GitHub)

Create a new GitHub issue in your repository.

## Suggested structure

**Title**

```
Timer behavior is inconsistent
```

**Description**

```
Steps:
1. Click next
2. Click next again

Expected:
The timer alternates between states

Actual:
The behavior is inconsistent
```

---

# 🔌 4. Use Claude with MCP

In Claude Code, connect to your repository.

## Analyze issues

```bash
Analyze open GitHub issues in this repository
```

## Select the relevant issue

```bash
Take the timer issue and propose a solution
```

---

# 🤖 5. Work with Sub-Agents

You will use multiple agents with different responsibilities. Review on how to create subagents [here](./SUB_AGENTS.md).

## Run a structured workflow

```bash
Use debugger to investigate the issue,
then implementer to apply a fix,
then test-runner to validate,
then code-reviewer to review changes
```

---

## What each agent does

* **debugger** → finds the root cause
* **implementer** → applies changes
* **test-runner** → validates behavior
* **code-reviewer** → reviews correctness

---

# 🧪 6. Validate the Solution

## Run tests

```bash
npm test
```

## Validate in UI

* Refresh the browser
* Interact with the app again

👉 Confirm:

* Behavior is now correct
* Changes are reflected in the UI

---

# 🌿 7. Create a Pull Request

Once the solution is ready:

```bash
Create a pull request and reference the issue
```

---

# ⚙️ 8. Add Hooks (Automation)

Hooks allow automatic validation after changes.

---

## Option 1 — Local Claude Hooks

Create:

```
.claude/hooks.json
```

### Example

```json
{
  "PostToolUse": {
    "Edit": [
      "npm test"
    ]
  }
}
```

👉 Effect:

* Every time code is modified → tests run automatically

---

## Option 2 — GitHub Actions (CI)

Create:

```
.github/workflows/test.yml
```

### Example

```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test
```

👉 Effect:

* Tests run automatically on every PR

---

# 🔁 9. Workflow Summary

```text
Application → Issue (GitHub)
            → Claude (MCP)
            → Sub-agents:
                debugger → implementer → test → review
            → Hooks (automatic validation)
            → Pull Request
```

---

# 🧠 Key Takeaways

* AI can operate across the full development lifecycle
* Sub-agents enable separation of responsibilities
* Hooks introduce reliability and automation
* GitHub integrates as the source of truth

---

# 🚀 Optional Exploration

* Try adding another issue
* Run multiple agent workflows
* Extend validation (linting, formatting)
* Improve the UI

---

# 📌 Notes

* Work incrementally
* Validate often
* Use agents as collaborators, not replacements

---
