import { isThisMoveAWin } from "./statePredicates";

describe("IsThisMoveAWin", () => {
  it("identifies a trivial non-win", () => {
    const afterFirstMove: Board = [
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "🔴", "⚫", "⚫", "⚫"],
    ];

    expect(isThisMoveAWin(afterFirstMove, { row: 5, col: 3 }, "🔴")).toBe(
      false
    );
  });

  it("identifies a horizontal win", () => {
    const winningMove: Board = [
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "🔴", "🔴", "🔴", "🔴"],
    ];

    expect(isThisMoveAWin(winningMove, { row: 5, col: 5 }, "🔴")).toBe(true);
  });

  it("requires win to be contiguous", () => {
    const winningMove: Board = [
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "🔴", "🔴", "🔴", "⚫", "🔴", "🔴"],
    ];

    expect(isThisMoveAWin(winningMove, { row: 5, col: 3 }, "🔴")).toBe(false);
  });

  it("identifies a vertical win", () => {
    const winningMove: Board = [
      ["⚫", "⚫", "🟡", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "🟡", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "🟡", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "🟡", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ];

    expect(isThisMoveAWin(winningMove, { row: 0, col: 2 }, "🟡")).toBe(true);
  });

  it("identifies sw-ne diagonal win", () => {
    const winningMove: Board = [
      ["⚫", "⚫", "⚫", "🔴", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "🔴", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "🔴", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["🔴", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ];

    expect(isThisMoveAWin(winningMove, { row: 0, col: 3 }, "🔴")).toBe(true);
  });

  it("identifies nw-se diagonal win", () => {
    const winningMove: Board = [
      ["⚫", "🟡", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "🟡", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "🟡", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "🟡", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
      ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ];

    expect(isThisMoveAWin(winningMove, { row: 2, col: 3 }, "🟡")).toBe(true);
  });
});
