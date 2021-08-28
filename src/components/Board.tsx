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
  const playInColumn = React.useCallback(
    (col: ColumnIndex) => {
      if (
        state.leafValue !== null ||
        !getLegalMoves(state.height).includes(col)
      )
        return;
      const newState = playMove(state, col);
      setState(newState);
    },
    [state]
  );

  const reset = React.useCallback(() => setState(createNewGame()), []);
  const displayMessage = getDisplayMessage(state);

  const makeBotMove = () => {
    const bestMove = pickBestMove(state);
    playInColumn(bestMove);
  };

  const board = toPrettyBoard(state.bitboard);

  return {
    displayMessage,
    playInColumn,
    reset,
    makeBotMove,
    state,
    board,
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
  } = useBoard();

  return (
    <>
      <h2>{displayMessage}</h2>
      <button disabled={leafValue !== null} onClick={makeBotMove}>
        Let the bot decide
      </button>
      <table>
        <thead>
          <tr>
            {columnIndices.map((col) => (
              <th key={col}>
                <button onClick={() => playInColumn(col)}>{"⬇"}</button>
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
      <button onClick={reset}>New game?</button>
    </>
  );
};
