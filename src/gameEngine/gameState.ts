import { isThisMoveAWin } from "./statePredicates";

export const startingState: State = {
  nextToMove: "🔴",
  phase: "▶",
  board: [
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
  ],
};

const isTheBoardFull = (board: Board): boolean =>
  board.every((row) => row.every((cell) => cell !== "⚫"));

export const playMove = (priorState: State, targetCol: ColumnIndex): State => {
  if (priorState.board[0][targetCol] !== "⚫") {
    // This column is full already
    throw new Error("Can't play move into a full column");
  }

  const currentPlayer = priorState.nextToMove;
  const targetRow = priorState.board
    .map((row, rowIndex) => ({ cell: row[targetCol], rowIndex }))
    .reverse()
    .find(({ cell }) => cell === "⚫").rowIndex as RowIndex;

  // Clone the prior board
  const board = priorState.board.map((row) => [...row]) as Board;

  // Place the new piece
  board[targetRow][targetCol] = currentPlayer;

  const nextToMove = currentPlayer === "🔴" ? "🟡" : "🔴";

  if (
    isThisMoveAWin(board, { row: targetRow, col: targetCol }, currentPlayer)
  ) {
    return {
      nextToMove,
      phase: currentPlayer,
      board,
    };
  }

  if (isTheBoardFull(board)) {
    // Neither player has won, but the board is full, so it is a tie
    return {
      nextToMove,
      phase: "⏹",
      board,
    };
  }

  // The game is still in progress
  return {
    nextToMove,
    phase: "▶",
    board,
  };
};
