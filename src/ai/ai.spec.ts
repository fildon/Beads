import { evaluateStateForPlayer } from "./ai";

describe("AI", () => {
  it("recognises a win", () => {
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

  it("recognises a loss", () => {
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
});
