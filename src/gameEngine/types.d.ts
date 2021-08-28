/**
 * ```md
 *   6 13 20 27 34 41 48   55 62     Additional row
 * +---------------------+
 * | 5 12 19 26 33 40 47 | 54 61     top row
 * | 4 11 18 25 32 39 46 | 53 60
 * | 3 10 17 24 31 38 45 | 52 59
 * | 2  9 16 23 30 37 44 | 51 58
 * | 1  8 15 22 29 36 43 | 50 57
 * | 0  7 14 21 28 35 42 | 49 56 63  bottom row
 * +---------------------+
 * ```
 */
type GameState = {
  /**
   * Pair of bitarrays to store x and o positions (player1 and player2)
   */
  bitboard: [bigint, bigint];
  /**
   * stores next available row in each column
   */
  height: [bigint, bigint, bigint, bigint, bigint, bigint, bigint];
  /**
   * true if player1 to play
   * false if player2 to play
   */
  toPlay: boolean;
  /**
   * If this state is a leaf node, the value for player1. Infinity for win. -Infinity for loss. 0 for tie.
   * Null if not a leaf node
   */
  leafValue: number | null;
};

type Player = "🔴" | "🟡";
type Cell = Player | "⚫";
type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell]; // A row is 7 cells
type Board = [Row, Row, Row, Row, Row, Row]; // A board is 6 rows
type Phase = "▶" | "⏹" | "🔴" | "🟡";
type ColumnIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
