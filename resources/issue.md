### Summary
The Pomodoro timer does not alternate correctly between focus and break sessions.

---

### Steps to Reproduce
1. Open the application in the browser
2. Click the "Next" button once
3. Click the "Next" button again

---

### Expected Behavior
The timer should alternate between states:

focus → break → focus

---

### Actual Behavior
The timer remains in break state:

focus → break → break

---

### Impact
- Incorrect session flow
- Break cycles are repeated
- User experience is inconsistent

---

### Possible Area
The issue is likely related to state transition logic in:
backend/timer.js

---

### Additional Notes
- Behavior is reproducible consistently
- No errors shown in console