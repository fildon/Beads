import { GameState } from "./gameState";

describe("GameState", () => {
  it("empty board is inprogress with RED to play", () => {
    const game = new GameState();

    expect(game.phase).toEqual("INPROGRESS");
    expect(game.nextToMove).toEqual("RED");
  });

  it.todo("detects a tie");
  it.todo("detects a red horizontal win");
  it.todo("detects a red vertical win");
  it.todo("detects a red diagonal win");
  it.todo("detects a yellow horizontal win");
  it.todo("detects a yellow vertical win");
  it.todo("detects a yellow diagonal win");
  it.todo("rejects a move in a full column");
  it.todo("rejects a move after a completed game");
});
