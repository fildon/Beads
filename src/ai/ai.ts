import { playMove } from "../gameEngine/gameState";

const getLegalMoves = (board: Board): ColumnIndex[] => {
  const allMoves: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
  return allMoves.filter((col) => board[0][col] === "⚫");
};

export const evaluateStateForPlayer = (
  state: State,
  player: Player,
  recursiveLimit = 1
): number => {
  if (state.phase === "⏹") {
    // A tie is worth half a win
    return 0.5;
  }

  if (["🔴", "🟡"].includes(state.phase)) {
    // This state is a win or a loss
    return state.phase === player ? 1 : 0;
  }

  if (recursiveLimit === 0) {
    // We've hit our recursion limit so let's just return a guess
    return 0.5;
  }

  if (state.phase === "▶") {
    // This state is not finished, and we haven't hit our recursion depth yet
    const legalMoves = getLegalMoves(state.board);
    return (
      legalMoves
        .map((move) =>
          evaluateStateForPlayer(
            playMove(state, move),
            player,
            recursiveLimit - 1
          )
        )
        // Change sort ordering based on the next player (minimiser or maximiser)
        .sort((a, b) => (state.nextToMove === player ? b - a : a - b))[0]
    );
  }
};

export const pickBestMove = (state: State, player: Player): ColumnIndex => {
  // Get the set of all legal moves
  const legalMoves = getLegalMoves(state.board);
  // Evaluate the state each move would yield
  const bestMove = legalMoves
    .map((move) => ({
      move,
      value: evaluateStateForPlayer(playMove(state, move), player),
    }))
    // Descending sort by value, then pick first
    .sort((a, b) => b.value - a.value)[0].move;

  return bestMove;
};
