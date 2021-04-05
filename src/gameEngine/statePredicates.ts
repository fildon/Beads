const countWhile = <T>(
  array: T[],
  predicate: (element: T) => boolean
): number => {
  let i = 0;
  while (i < array.length && predicate(array[i])) {
    i++;
  }
  return i;
};

export const isThisMoveAWin = (
  board: Board,
  move: Position,
  player: Player
): boolean => {
  const cellMatch = (cell: Cell) => cell === player;
  const isThisMoveAWinOnAxis = (axis: Cell[]): boolean => {
    const positive = axis.slice(move.col + 1, move.col + 4);
    const negative = axis.slice(undefined, move.col).slice(-3).reverse();

    return (
      // Current piece automatically matches, so we only need to find 3 more
      countWhile(positive, cellMatch) + countWhile(negative, cellMatch) >= 3
    );
  };
  return [
    board[move.row], // horizontal axis
    board.map((row) => row[move.col]), // vertical axis
    board.map((row, rowIndex) => row[move.col + rowIndex - move.row]), // Diagonal axis
    board.map((row, rowIndex) => row[move.col - rowIndex + move.row]), // The other diagonal
  ].some(isThisMoveAWinOnAxis);
};
