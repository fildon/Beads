import React from "react";
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
      const newState = playMove(state, col);
      setState(newState);
    },
    [state]
  );

  const reset = React.useCallback(() => setState(startingState), []);
  const displayMessage = getDisplayMessage(state);

  return {
    displayMessage,
    playInColumn,
    reset,
    state,
  };
};

const columnIndices: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
export const Board = () => {
  const { displayMessage, playInColumn, reset, state } = useBoard();
  const { board, phase } = state;

  const makeBotMove = () => {
    const bestMove = pickBestMove(state);
    playInColumn(bestMove);
  };

  return (
    <>
      <h2>{displayMessage}</h2>
      <button disabled={phase !== "▶"} onClick={makeBotMove}>
        Let the bot decide
      </button>
      <table>
        <thead>
          <tr>
            {columnIndices.map((col, i) => (
              <th key={i}>
                <button
                  disabled={phase !== "▶" || board[0][col] !== "⚫"}
                  onClick={() => playInColumn(col)}
                >
                  {col}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={reset}>New game?</button>
    </>
  );
};
