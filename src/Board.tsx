import React from "react";
import { playMove, startingState } from "./gameEngine/gameState";

const getDisplayMessage = (state: State): string => {
  if (state.phase === "⏹") {
    return "It's a tie!";
  }

  if (state.phase === "▶") {
    return `${state.nextToMove} to play`;
  }

  return `${state.phase} has won!`;
};

const columnIndices: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
export const Board = (): JSX.Element => {
  const [state, setState] = React.useState(startingState);
  const onClick = React.useCallback(
    (col: ColumnIndex) => () => {
      const newState = playMove(state, col);
      setState(newState);
    },
    [state]
  );

  return (
    <>
      <h2>{getDisplayMessage(state)}</h2>
      <table>
        <thead>
          <tr>
            {columnIndices.map((col, i) => (
              <th key={i}>
                <button
                  disabled={state.phase !== "▶" || state.board[0][col] !== "⚫"}
                  onClick={onClick(col)}
                >
                  {col}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.board.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setState(startingState)}>New game?</button>
    </>
  );
};
