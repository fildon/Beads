export const isThisMoveAWin = (
  board: Board,
  move: Position,
  player: Player
): boolean => {
  const isThisMoveAWinOnAxis = (axis: Cell[]): boolean =>
    ({ "🔴": /🔴🔴🔴🔴/, "🟡": /🟡🟡🟡🟡/ }[player].test(axis.join("")));
  return [
    board[move.row], // horizontal axis
    board.map((row) => row[move.col]), // vertical axis
    board.map((row, rowIndex) => row[move.col + rowIndex - move.row]), // NW - SE diagonal
    board.map((row, rowIndex) => row[move.col - rowIndex + move.row]), // NE - SW diagonal
  ].some(isThisMoveAWinOnAxis);
};
