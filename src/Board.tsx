import React from "react";

interface BoardProps {
  state: State;
}

export const Board = ({ state }: BoardProps): JSX.Element => {
  const columnIndices = [0, 1, 2, 3, 4, 5, 6];
  return (
    <>
      <h2>{state.nextToMove} to play</h2>
      <table>
        <thead>
          <tr>
            {columnIndices.map((col) => (
              <th>
                <button>{col}</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.board.map((row) => (
            <tr>
              {row.map((cell) => (
                <td>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
