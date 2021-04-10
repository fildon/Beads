import { playMove } from "../gameEngine/gameState";

const getLegalMoves = (board: Board): ColumnIndex[] => {
  const allMoves: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
  return allMoves.filter((col) => board[0][col] === "⚫");
};

export const evaluateStateForPlayer = (
  state: State,
  player: Player,
  recursiveLimit: number
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
    // TODO a smarter heuristic?
    // We've hit our recursion limit so let's just return a guess
    return 0.5 + 0.1 * Math.random();
  }

  // This state is not finished, and we haven't hit our recursion depth yet
  return (
    getLegalMoves(state.board)
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
};

const evaluateStateMemo: Record<string, number> = {};

const memoEvaluateStateForPlayer = (
  state: State,
  player: Player,
  recursiveLimit = 6
) => {
  const memoKey = state.board.map((row) => row.join("")).join("") + player;
  if (!evaluateStateMemo[memoKey]) {
    evaluateStateMemo[memoKey] = evaluateStateForPlayer(
      state,
      player,
      recursiveLimit
    );
  }

  return evaluateStateMemo[memoKey];
};

export const pickBestMove = (state: State): ColumnIndex => {
  // Get the set of all legal moves
  const legalMoves = getLegalMoves(state.board);
  // Evaluate the state each move would yield
  const bestMove = legalMoves
    .map((move) => ({
      move,
      value: memoEvaluateStateForPlayer(
        playMove(state, move),
        state.nextToMove
      ),
    }))
    // Descending sort by value, then pick first
    .sort((a, b) => b.value - a.value)[0].move;

  return bestMove;
};
