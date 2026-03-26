# Live Session Guide — Pomodoro App (Agents + MCP + Hooks)

## Objective

In this session you will:

* Work with a real application (frontend + backend)
* Use GitHub to report and track issues
* Use Claude Code with sub-agents to:

  * Investigate a problem
  * Implement a solution
  * Validate behavior
* Add automated validation using hooks

---

# What are Hooks?


Hooks are **automatic actions triggered by events** in Claude Code.

```text
Claude action → Hook triggers → Command runs
```

### Documentation

* [Claude Code Hooks Reference](https://code.claude.com/docs/en/hooks)
* [Claude Code Hooks Guide](https://code.claude.com/docs/en/hooks-guide)

### Examples

* Code is modified → run tests
* Bash command is executed → validate safety
* Code is updated → commit changes

---

# 1. Configure Hooks (Before Starting)

## Create Hook Scripts Directory

```bash
mkdir -p .claude/hooks
```

---

## Hook 1 — Run Tests Automatically

Run tests every time code changes.

### Create Settings File

Create `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm test"
          }
        ]
      }
    ]
  }
}
```

**What happens:** Claude edits code → tests run automatically

**Why this matters:** Prevents regressions, simulates CI/CD pipelines, ensures correctness after every change

---

## Hook 2 — Shell Command Guard (Optional)

Prevent unsafe commands from executing.

### Create Script

Create `.claude/hooks/block-dangerous.sh`:

```bash
#!/bin/bash

INPUT=$(cat)

if echo "$INPUT" | grep -E "rm -rf|shutdown"; then
  echo "❌ Dangerous command blocked" >&2
  exit 2
fi

exit 0
```

Make it executable:

```bash
chmod +x .claude/hooks/block-dangerous.sh
```

### Add to Settings

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/block-dangerous.sh"
          }
        ]
      }
    ]
  }
}
```

**What happens:** Claude runs bash → hook validates → command allowed or blocked

---

## Hook 3 — Git Automation (Optional)

Automatically commit changes after code edits.

### Create Script

Create `.claude/hooks/git-auto.sh`:

```bash
#!/bin/bash

git add .

if ! git diff --cached --quiet; then
  git commit -m "auto: changes from Claude workflow"
fi
```

Make it executable:

```bash
chmod +x .claude/hooks/git-auto.sh
```

### Add to Settings

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm test"
          },
          {
            "type": "command",
            "command": "bash .claude/hooks/git-auto.sh"
          }
        ]
      }
    ]
  }
}
```
---

## Combined Configuration (Recommended)

Create `.claude/settings.json` with all hooks:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/block-dangerous.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npm test"
          },
          {
            "type": "command",
            "command": "bash .claude/hooks/git-auto.sh"
          }
        ]
      }
    ]
  }
}
```

---

## Workflow with Hooks

```text
Edit code → Run tests → Commit changes → Safe workflow
```

---

## Key Takeaways

* Hooks automate validation
* They enforce consistency without prompting
* They simulate real CI/CD pipelines
* They make AI workflows more reliable and safe

---

Further reading [HOOKS.md](./HOOKS.md)

# 2. Setup Application

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

# 3. Explore the Application

* Click the **Next** button multiple times
* Observe how the application behaves

**Try to understand:**

* What is happening?
* What seems incorrect?

---

# 4. Report the Issue (GitHub)

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

# 5. Use Claude with MCP

In Claude Code, connect to your repository.

### Documentation

* [Claude Code MCP Reference](https://code.claude.com/docs/en/mcp)

## Analyze issues

```bash
❯ Analyze briefly the open GitHub issues in this repository. Just make sure you understand the current issues
```

## Select the relevant issue

```bash
Take the timer issue and propose a solution
```

---

# 6. Work with Sub-Agents

You will use multiple agents with different responsibilities. Review on how to create subagents [here](./SUB_AGENTS.md).

## Sub-Agents Resources

* [Claude Code Sub-Agents (lst97)](https://github.com/lst97/claude-code-sub-agents) — Example sub-agent configurations
* [Claude Sub-Agent (zhsama)](https://github.com/zhsama/claude-sub-agent) — Alternative sub-agent implementations
* [Awesome Claude Code Subagents](https://github.com/VoltAgent/awesome-claude-code-subagents/tree/main/categories) — Curated list of sub-agent patterns

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

# 7. Validate the Solution

## Run tests

```bash
npm test
```

## Validate in UI

* Refresh the browser
* Interact with the app again

**Confirm:**

* Behavior is now correct
* Changes are reflected in the UI

---

# 8. Create a Pull Request

Once the solution is ready:

```bash
Create a pull request and reference the issue
```

---

# 9. Workflow Summary

```text
Configure Hooks → Application → Issue (GitHub)
                            → Claude (MCP)
                            → Sub-agents:
                                debugger → implementer → test → review
                            → Pull Request
```

---

# Key Takeaways

* Configure hooks BEFORE working to automate validation
* AI can operate across the full development lifecycle
* Sub-agents enable separation of responsibilities
* Hooks introduce reliability and automation
* GitHub integrates as the source of truth

---

# 10. Optional Exploration

* Try adding another issue
* Run multiple agent workflows
* Extend validation (linting, formatting)
* Improve the UI

---

# 11. Notes

* Work incrementally
* Validate often
* Use agents as collaborators, not replacements

---