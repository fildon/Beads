export const getLegalMoves = (board: Board): ColumnIndex[] => {
  const allMoves: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
  return allMoves.filter((col) => board[0][col] === "⚫");
};
