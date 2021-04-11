import { evaluateStateForPlayer } from "./ai";

describe("AI", () => {
  it("recognises an immediate win", () => {
    const state: State = {
      nextToMove: "🔴",
      phase: "🔴",
      board: [
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "🔴", "🔴", "🔴", "🔴"],
      ],
    };

    expect(evaluateStateForPlayer(state, "🔴", 6)).toEqual({
      value: 1,
      timeToEnd: 0,
      certain: true,
    });
  });

  it("recognises an immediate loss", () => {
    const state: State = {
      nextToMove: "🔴",
      phase: "🔴",
      board: [
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "🔴", "🔴", "🔴", "🔴"],
      ],
    };

    expect(evaluateStateForPlayer(state, "🟡", 6)).toEqual({
      value: -1,
      timeToEnd: 0,
      certain: true,
    });
  });

  it("recognises a next move win", () => {
    const state: State = {
      nextToMove: "🔴",
      phase: "▶",
      board: [
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "🔴", "🔴", "🔴"],
      ],
    };

    expect(evaluateStateForPlayer(state, "🔴", 6)).toEqual({
      value: 1,
      timeToEnd: 1,
      certain: true,
    });
  });

  it("recognises a next move loss", () => {
    const state: State = {
      nextToMove: "🔴",
      phase: "▶",
      board: [
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "🔴", "🔴", "🔴"],
      ],
    };

    expect(evaluateStateForPlayer(state, "🟡", 6)).toEqual({
      value: -1,
      timeToEnd: 1,
      certain: true,
    });
  });
});
