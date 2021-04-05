import { playMove, startingState } from "./gameState";

describe("GameState", () => {
  it("startingState is inprogress with RED to play", () => {
    expect(startingState.phase).toEqual("▶");
    expect(startingState.nextToMove).toEqual("🔴");
  });

  it("changes nextToMove after a move", () => {
    expect(startingState.nextToMove).toEqual("🔴");
    expect(playMove(startingState, 3).nextToMove).toEqual("🟡");
  });

  it("detects a red horizontal win", () => {
    const nearlyRedWin: State = {
      nextToMove: "🔴",
      phase: "▶",
      board: [
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
        ["🔴", "🔴", "🔴", "⚫", "🟡", "🟡", "🟡"],
      ],
    };

    const redHasFourInARow = playMove(nearlyRedWin, 3);

    expect(redHasFourInARow.phase).toEqual("🔴");
  });
});
