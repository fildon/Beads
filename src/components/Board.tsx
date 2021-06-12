import * as React from "react";
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

const useReanimator = (deps: React.DependencyList) => {
  const ref = React.createRef<HTMLElement>();
  const element = ref.current;
  React.useEffect(() => {
    if (!element) {
      return;
    }
    element.style.animation = "none";
    element.offsetHeight;
    element.style.animation = "";
  }, [element, ...deps]);

  return { ref };
};

const AnimatedCell = ({ children }: { children: Cell }) => {
  const { ref: reanimatorRef } = useReanimator([children]);

  if (children === "⚫") {
    // We don't animate empty cells
    return (
      <td>
        <span>⚫</span>
      </td>
    );
  }

  return (
    <td style={{ position: "relative" }}>
      <span style={{ position: "absolute" }}>⚫</span>
      <span ref={reanimatorRef} className={"animate-drop"}>
        {children}
      </span>
    </td>
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
                <AnimatedCell key={j}>{cell}</AnimatedCell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={reset}>New game?</button>
    </>
  );
};
