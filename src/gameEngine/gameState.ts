type Player = "RED" | "YELLOW";

type Cell = Player | "EMPTY";

type Column = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type GamePhase = "INPROGRESS" | "TIE" | "REDWIN" | "YELLOWWIN";

type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell]; // A row has 7 cells
type Board = [Row, Row, Row, Row, Row, Row]; // A board has 6 rows

/**
 * Immutable gameState object
 */
export class GameState {
  readonly nextToMove: Player;
  readonly phase: GamePhase;
  readonly boardMap: Board;

  constructor(board?: Board) {
    this.phase = "INPROGRESS";
    this.boardMap = board || [
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
      ["EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY", "EMPTY"],
    ];
    // Compute nextToMove based on the parity of remaining EMPTY cells
    this.nextToMove =
      this.boardMap
        .map((row) => row.filter((cell) => cell === "EMPTY").length % 2)
        .reduce((acc, curr) => (acc + curr) % 2) === 0
        ? "RED"
        : "YELLOW";
  }

  /**
   * Generates and returns the new GameState resulting from the provided move.
   * @param move The column into which the current player places a piece.
   */
  playMove(move: Column): GameState {
    // TODO reject illegal moves, i.e. full column, trying to play after a win
    return new GameState();
  }
}
