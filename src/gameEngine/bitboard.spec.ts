import {
  createNewGame,
  getLegalMoves,
  isWin,
  playMove,
  toPrettyBoard,
} from "./bitboard";

test("plays move on blank board", () => {
  const blankBoard = createNewGame();
  const nextBoard = playMove(blankBoard, 1);
  expect(nextBoard.bitboard[0]).toBe(BigInt(2 ** 7));
});

test("renders one move game to pretty board", () => {
  const blankBoard = createNewGame();
  const oneMoveGame = playMove(blankBoard, 1);
  const prettyBoard = toPrettyBoard(oneMoveGame.bitboard);
  expect(oneMoveGame.toPlay).toBe(false);
  expect(oneMoveGame.leafValue).toBeNull();
  expect(prettyBoard).toEqual([
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "🔴", "⚫", "⚫", "⚫", "⚫", "⚫"],
  ]);
});

test("renders two move game to pretty board", () => {
  const blankBoard = createNewGame();
  const twoMoveGame = playMove(playMove(blankBoard, 1), 5);
  const prettyBoard = toPrettyBoard(twoMoveGame.bitboard);
  expect(twoMoveGame.toPlay).toBe(true);
  expect(twoMoveGame.leafValue).toBeNull();
  expect(prettyBoard).toEqual([
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "🔴", "⚫", "⚫", "⚫", "🟡", "⚫"],
  ]);
});

test("isWin recognises won board", () => {
  expect(isWin(BigInt(2 ** 21 + 2 ** 28 + 2 ** 35 + 2 ** 42))).toBe(true);
});

test("recognises a full game", () => {
  let game = createNewGame();
  const moves: ColumnIndex[] = [3, 1, 4, 1, 5, 3, 6];
  moves.forEach((move) => {
    game = playMove(game, move);
  });
  const prettyBoard = toPrettyBoard(game.bitboard);

  expect(game.toPlay).toBe(false);
  expect(game.leafValue).toBe(Infinity);
  expect(prettyBoard).toEqual([
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "🟡", "⚫", "🟡", "⚫", "⚫", "⚫"],
    ["⚫", "🟡", "⚫", "🔴", "🔴", "🔴", "🔴"],
  ]);
});

test("legalMoves only returns columns with space", () => {
  const game = playMove(
    playMove(
      playMove(playMove(playMove(playMove(createNewGame(), 3), 3), 3), 3),
      3
    ),
    3
  );

  expect(getLegalMoves(game.height)).toEqual([0, 1, 2, 4, 5, 6]);
});
