type Player = "🔴" | "🟡";
type Cell = Player | "⚫";
type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell]; // A row is 7 cells
type Board = [Row, Row, Row, Row, Row, Row]; // A board is 6 rows
type Phase = "▶" | "⏹" | "🔴" | "🟡";
type State = {
  nextToMove: Player;
  phase: Phase;
  board: Board;
};
type ColumnIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type RowIndex = 0 | 1 | 2 | 3 | 4 | 5;
type Position = { row: RowIndex; col: ColumnIndex };
