import * as React from "react";
import { useReanimator } from "ceramic-components";
import { pickBestMove } from "../ai/ai";
import { playMove, startingState } from "../gameEngine/gameState";

const getDisplayMessage = (state: State): string => {
  if (state.phase === "⏹") {
    return "It's a tie!";
  }

  if (state.phase === "▶") {
    return `${state.nextToMove} to play`;
  }

  return `${state.phase} has won!`;
};

const useBoard = () => {
  const [state, setState] = React.useState(startingState);
  const playInColumn = React.useCallback(
    (col: ColumnIndex) => {
      if (state.phase !== "▶" || state.board[0][col] !== "⚫") return;
      const newState = playMove(state, col);
      setState(newState);
    },
    [state]
  );

  const reset = React.useCallback(() => setState(startingState), []);
  const displayMessage = getDisplayMessage(state);

  const makeBotMove = () => {
    const bestMove = pickBestMove(state);
    playInColumn(bestMove);
  };

  return {
    displayMessage,
    playInColumn,
    reset,
    makeBotMove,
    state,
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
    state: { phase, board },
  } = useBoard();

  return (
    <>
      <h2>{displayMessage}</h2>
      <button disabled={phase !== "▶"} onClick={makeBotMove}>
        Let the bot decide
      </button>
      <table>
        <thead>
          <tr>
            {columnIndices.map((col) => (
              <th key={col}>
                <button
                  disabled={phase !== "▶" || board[0][col] !== "⚫"}
                  onClick={() => playInColumn(col)}
                >
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
      <button onClick={reset}>New game?</button>
    </>
  );
};
