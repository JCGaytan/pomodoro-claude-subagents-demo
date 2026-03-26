# Hooks Guide — Automating Validation with Claude Code

## 🎯 Objective

In this guide you will learn how to:

* Configure hooks in Claude Code
* Automate validation (tests, safety checks, git workflow)
* Understand how hooks improve reliability in AI workflows

---

# 🧠 What are Hooks?

Hooks are **automatic actions triggered by events**.

```text
Claude action → Hook triggers → Command runs
```

### Examples

* Code is modified → run tests
* Bash command is executed → validate safety
* Code is updated → commit changes

---

# Where to Configure Hooks

Create the file:

```
.claude/settings.json
```

---

# Hook Structure

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolName",
        "hooks": [
          {
            "type": "command",
            "command": "your-command"
          }
        ]
      }
    ]
  }
}
```

---

## 🧠 Key Concepts

* **Event** → when the hook runs
* **matcher** → which tool triggers it (`Edit`, `Write`, `Bash`)
* **command** → shell command executed

---

# Hook 1 — Run Tests Automatically

## 🎯 Goal

Run tests every time code changes

---

## 📄 Configuration

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

---

## 🧠 What Happens

```text
Claude edits code → tests run automatically
```

---

## 💡 Why This Matters

* Prevents regressions
* Simulates CI/CD pipelines
* Ensures correctness after every change

---

# Hook 2 — Shell Command Guard

## 🎯 Goal

Prevent unsafe commands from executing

---

## 📁 Create Script

```
.claude/hooks/block-dangerous.sh
```

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

---

## 📄 Configuration

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

---

## 🧠 What Happens

```text
Claude runs bash → hook validates → command allowed or blocked
```

---

## 💡 Why This Matters

* Adds safety guardrails
* Prevents destructive operations
* Makes workflows more secure

---

# Hook 3 — Git Automation (Commit Changes)

## 🎯 Goal

Automatically commit changes after code edits

---

## 📁 Create Script

```
.claude/hooks/git-auto.sh
```

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

---

## Configuration

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
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

## 🧠 What Happens

```text
Claude edits code → changes are committed automatically
```

---

## 💡 Why This Matters

* Keeps history of changes
* Aligns with real Git workflows
* Enables PR-based development

---

# Combined Configuration

You can combine all hooks in a single file:

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

# Workflow with Hooks

```text
Edit code → Run tests → Commit changes → Safe workflow
```

---

# Key Takeaways

* Hooks automate validation
* They enforce consistency without prompting
* They simulate real CI/CD pipelines
* They make AI workflows more reliable and safe

---

# Optional Extensions

* Add linting (`npm run lint`)
* Add formatting (`prettier`)
* Trigger notifications (Slack, logs)

---

# 📌 Notes

* Keep hooks fast (avoid long-running commands)
* Use them for validation, not heavy processing
* Start simple, then extend

---
