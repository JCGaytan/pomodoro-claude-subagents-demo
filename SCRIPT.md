# 🚀 LIVE SESSION — Pomodoro App (Claude Sub-Agents + MCP + Hooks)

## 🎯 Goal

Fix a bug and implement a feature using:

* GitHub Issue (QA input)
* MCP (Claude reads issue)
* Sub-agents (debug → implement → test → review)
* Hooks (automatic validation)

---

# ⏱️ 0–5 min — Setup

### Run project

```bash
npm install
node backend/server.js
```

Open:

```
frontend/index.html
```

👉 Show app working (don’t explain bug yet)

---

# ⏱️ 5–10 min — QA reports bug (GitHub)

## Create issue (LIVE)

Title:

```
Timer stuck in break mode
```

Body:

```
Steps:
1. Click next
2. Click next again

Expected:
focus → break → focus

Actual:
focus → break → break
```

---

# ⏱️ 10–15 min — MCP: Claude reads issue

## In Claude Code:

```bash
Analyze open GitHub issues in this repository
```

Then:

```bash
Take the timer bug issue and fix it using sub-agents
```

👉 Explain:

* Claude reads GitHub via MCP
* Not guessing → using real issue

---

# ⏱️ 15–25 min — Sub-agent workflow (CORE)

## Force orchestration

```bash
Use debugger agent to investigate,
then implementer to fix,
then test-runner to validate,
then code-reviewer to review
```

---

## What happens (explain while running)

### 🐞 Debugger

* Finds bug in `timer.js`
* Identifies wrong state transition

---

### 👨‍💻 Implementer

* Fixes logic
* Adds session counter feature

---

### 🧪 Test-runner

```bash
npm test
```

* Runs tests
* Confirms behavior

---

### 👀 Reviewer

* Checks correctness
* Suggests improvements

---

# ⏱️ 25–30 min — UI validation (IMPORTANT)

Refresh browser

👉 Show:

```
focus → break → focus ✅
Sessions: 1
```

Say:

> “We validated the fix at product level, not just code.”

---

# ⏱️ 30–35 min — Create PR

```bash
Create a pull request for the fix and link the issue
```

---

# ⏱️ 35–40 min — Hooks (CI simulation)

## Concept

Hooks = automatic actions after tools

Example:

* After Edit → run tests
* After Write → lint

👉 Claude supports pre/post tool hooks ([Claude API Docs][1])

---

## Suggested Hook (LOCAL)

### `.claude/hooks.json`

```json
{
  "PostToolUse": {
    "Edit": [
      "npm test"
    ]
  }
}
```

👉 Behavior:

* Every time Claude edits code → tests run automatically

---

## Alternative Hook (GitHub Actions)

### `.github/workflows/test.yml`

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

---

# 🤖 Sub-agents setup

## Option 1 — Manual (recommended)

Create:

```
.claude/agents/
```

### debugger.md

```md
---
name: debugger
---
Find root cause of bugs and propose minimal fixes.
```

### implementer.md

```md
---
name: implementer
---
Implement fixes and features with minimal changes.
```

### test-runner.md

```md
---
name: test-runner
---
Run tests and validate behavior.
```

### code-reviewer.md

```md
---
name: code-reviewer
---
Review code quality and correctness.
```

---

## Option 2 — Auto-generate (Claude)

```bash
Create sub-agents for:
- debugging
- implementation
- testing
- code review
```

👉 Claude can generate them automatically and store in `.claude/agents/`

---

# 🧠 How sub-agents work (explain briefly)

* Each sub-agent = isolated context
* Specialized role (debug, QA, etc.)
* Can run in sequence or parallel ([Colin McNamara][2])

---

# 🔁 Final Workflow (what students should remember)

```
QA → GitHub Issue → Claude (MCP)
   → Debugger → Implementer → Test → Review
   → Hooks → PR
```

---

# 🔥 Final Message

Say:

> “This is not prompting — this is orchestrating a software engineering workflow.”

---

# ⚠️ Backup Commands (if something fails)

```bash
Use debugger to find issue in timer.js
```

```bash
Fix bug and ensure tests pass
```

```bash
Run tests and validate changes
```

---

# ✅ End of Session

* Bug fixed
* Feature added
* Tests passing
* PR created
* Hooks demonstrated

---

[1]: https://docs.claude.com/en/docs/claude-code/settings?utm_source=chatgpt.com "Claude Code settings - Claude Docs"
[2]: https://colinmcnamara.com/blog/understanding-skills-agents-and-mcp-in-claude-code?utm_source=chatgpt.com "Understanding Skills, Agents, Subagents, and MCP in Claude Code: When to Use What | Colin McNamara"
