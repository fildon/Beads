import * as React from "react";
import { useReanimator } from "ceramic-components";
import { pickBestMove } from "../ai/ai";
import {
  playMove,
  createNewGame,
  toPrettyBoard,
  getLegalMoves,
} from "../gameEngine/bitboard";

const getDisplayMessage = (state: GameState): string => {
  if (state.leafValue === 0) {
    return "It's a tie!";
  }

  if (state.leafValue === null) {
    return `${state.toPlay ? "🔴" : "🟡"} to play`;
  }

  return `${state.leafValue > 0 ? "🔴" : "🟡"} has won!`;
};

const useBoard = () => {
  const [state, setState] = React.useState(createNewGame());
  const [loading, setLoading] = React.useState(false);
  const playInColumn = (col: ColumnIndex) => {
    if (
      state.leafValue !== null ||
      !getLegalMoves(state.height).includes(col) ||
      loading
    )
      return;
    const newState = playMove(state, col);
    setState(newState);
  };

  const reset = () => loading || setState(createNewGame());
  const displayMessage = getDisplayMessage(state);

  const makeBotMove = () => {
    if (loading) return;
    setLoading(true);
    pickBestMove(state)
      .then((bestMove) => playInColumn(bestMove))
      .finally(() => setLoading(false));
  };

  const board = toPrettyBoard(state.bitboard);

  return {
    displayMessage,
    playInColumn,
    reset,
    makeBotMove,
    state,
    board,
    loading,
  };
};

const AnimatedCell = ({ children }: { children: Cell }) => {
  const { ref: reanimatorRef } = useReanimator([children]);

  if (children === "⚫") {
    // We don't animate empty cells
    return <span>⚫</span>;
  }

  return (
    <>
      <span style={{ position: "absolute" }}>⚫</span>
      <span ref={reanimatorRef} className="animate-drop">
        {children}
      </span>
    </>
  );
};

const columnIndices: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
export const Board = () => {
  const {
    displayMessage,
    playInColumn,
    reset,
    makeBotMove,
    state: { leafValue },
    board,
    loading,
  } = useBoard();

  return (
    <>
      <h2>{displayMessage}</h2>
      <button disabled={loading || leafValue !== null} onClick={makeBotMove}>
        {loading ? "THINKING" : "Let the bot decide"}
      </button>
      <table>
        <thead>
          <tr>
            {columnIndices.map((col) => (
              <th key={col}>
                <button disabled={loading} onClick={() => playInColumn(col)}>
                  {"⬇"}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {board.map((row, i) => (
            <tr key={i}>
              {columnIndices.map((col) => (
                <td key={col}>
                  <button onClick={() => playInColumn(col)}>
                    <AnimatedCell>{row[col]}</AnimatedCell>
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button disabled={loading} onClick={reset}>
        New game?
      </button>
    </>
  );
};
