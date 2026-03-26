const { nextSession, getSessionCount, reset } = require("../backend/timer");

describe("Pomodoro Timer", () => {
  
  beforeEach(() => {
    reset(); // ensure clean state before each test
  });

  test("should start in focus mode", () => {
    const result = nextSession(); // first transition
    expect(result.state).toBe("break");
  });

  test("should alternate between focus and break", () => {
    let s1 = nextSession(); // focus → break
    let s2 = nextSession(); // break → focus (EXPECTED)

    expect(s2.state).toBe("focus"); // ❌ fails initially
  });

  test("should complete a full cycle (focus → break → focus)", () => {
    nextSession(); // break
    const result = nextSession(); // should return to focus

    expect(result.state).toBe("focus");
  });

  test("should increment session count after full cycle", () => {
    nextSession(); // focus → break
    nextSession(); // break → focus (1 full cycle)

    expect(getSessionCount()).toBe(1); // ❌ fails initially
  });

  test("should not increment session count on partial cycle", () => {
    nextSession(); // focus → break

    expect(getSessionCount()).toBe(0);
  });

});