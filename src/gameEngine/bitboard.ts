export const createNewGame = (): GameState => {
  return {
    bitboard: [0n, 0n],
    height: [0n, 7n, 14n, 21n, 28n, 35n, 42n],
    toPlay: true,
    leafValue: null,
  };
};

export const playMove = (state: GameState, column: ColumnIndex): GameState => {
  const move = 1n << state.height[column];

  const newBitBoard: [bigint, bigint] = state.toPlay
    ? [state.bitboard[0] ^ move, state.bitboard[1]]
    : [state.bitboard[0], state.bitboard[1] ^ move];
  const newHeight = state.height.map((val, i) =>
    i === column ? val + 1n : val
  ) as typeof state.height;

  return {
    bitboard: newBitBoard,
    height: newHeight,
    toPlay: !state.toPlay,
    leafValue: isDraw(newHeight)
      ? 0
      : isWin(newBitBoard[0])
      ? Infinity
      : isWin(newBitBoard[1])
      ? -Infinity
      : null,
  };
};

const DIRECTIONS = [1n, 7n, 6n, 8n];
export const isWin = (bitboard: bigint): boolean =>
  DIRECTIONS.some((direction) => {
    const bb = bitboard & (bitboard >> direction);
    return (bb & (bb >> (2n * direction))) !== 0n;
  });

const TOP = [6n, 13n, 20n, 27n, 34n, 41n, 48n]
  .map((x) => 1n << x)
  .reduce((a, b) => a + b, 0n);
const COLUMNS: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
export const getLegalMoves = (height: GameState["height"]): ColumnIndex[] =>
  COLUMNS.filter((col) => (TOP & (1n << height[col])) === 0n);

const isDraw = (height: GameState["height"]): boolean =>
  !getLegalMoves(height).length;

export const toPrettyBoard = (bitboard: GameState["bitboard"]): Board => {
  const prettyBoard: Board = [
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
  ];

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const bitboardIndex = 7n * BigInt(col) + (5n - BigInt(row));
      const isRed = (bitboard[0] >> bitboardIndex) & 1n;
      const isYellow = (bitboard[1] >> bitboardIndex) & 1n;
      prettyBoard[row][col] = isRed ? "🔴" : isYellow ? "🟡" : "⚫";
    }
  }

  return prettyBoard;
};
