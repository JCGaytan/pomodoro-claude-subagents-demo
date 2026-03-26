
# 🤖 Create Sub-Agents

## Option 1 — Manual

Create folder:

```
.claude/agents/
```

### debugger.md

```md
---
name: debugger
---
Investigate bugs and identify root causes.
```

### implementer.md

```md
---
name: implementer
---
Apply fixes and implement improvements.
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
Review correctness and code quality.
```

---

## Option 2 — Auto-generate with Claude

```bash
Create sub-agents for debugging, implementation, testing, and code review
```

Claude will generate and store them automatically.
