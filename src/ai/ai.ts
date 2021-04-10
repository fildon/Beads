import { playMove } from "../gameEngine/gameState";

export const evaluateStateForPlayer = (state: State, player: Player) => {
  if (state.phase === "⏹") {
    return 0.5;
  }

  if (state.phase === "▶") {
    // This is where the magic needs to happen
    return 0.5;
  }

  return state.phase === player ? 1 : 0;
};

const getLegalMoves = (board: Board): ColumnIndex[] => {
  const allMoves: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
  return allMoves.filter((col) => board[0][col] === "⚫");
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
