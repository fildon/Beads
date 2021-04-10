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

    expect(evaluateStateForPlayer(state, "🔴")).toEqual(1);
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

    expect(evaluateStateForPlayer(state, "🟡")).toEqual(0);
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

    expect(evaluateStateForPlayer(state, "🔴")).toEqual(1);
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

    expect(evaluateStateForPlayer(state, "🟡")).toEqual(0);
  });
});
