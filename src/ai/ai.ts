import { playMove } from "../gameEngine/gameState";

const getLegalMoves = (board: Board): ColumnIndex[] => {
  const allMoves: ColumnIndex[] = [0, 1, 2, 3, 4, 5, 6];
  return allMoves.filter((col) => board[0][col] === "⚫");
};

type EvaluatedState = {
  value: number;
  timeToEnd: number;
  certain: boolean;
};

// A map of the board with each cell displaying how many wins could pass through it
const valueMap = [
  [3, 4, 5, 7, 5, 4, 3],
  [4, 6, 8, 10, 8, 6, 4],
  [5, 8, 11, 13, 11, 8, 5],
  [5, 8, 11, 13, 11, 8, 5],
  [4, 6, 8, 10, 8, 6, 4],
  [3, 4, 5, 7, 5, 4, 3],
];

const heuristicEvaluation = (state: State, player: Player): EvaluatedState => {
  let ourValue = 0;
  let enemyValue = 0;
  state.board.forEach((row, rIndex) =>
    row.forEach((cell, cIndex) => {
      if (cell === "⚫") {
        return;
      }
      const valueHere = valueMap[rIndex][cIndex] - 3 + 6 * Math.random(); // Add some fuzzing
      if (cell === player) {
        ourValue += valueHere;
      } else {
        enemyValue += valueHere;
      }
    })
  );
  const heuristicValue = (ourValue - enemyValue) / (ourValue + enemyValue);
  return { value: heuristicValue, timeToEnd: Infinity, certain: false };
};

const memoedEvaluations: Record<string, EvaluatedState> = {};

console;

const memoEvaluateStateForPlayer = (
  state: State,
  player: Player,
  recursiveLimit = 5
) => {
  const memoKey = state.board.map((row) => row.join("")).join("") + player;
  if (memoedEvaluations[memoKey]) {
    return memoedEvaluations[memoKey];
  }

  const realEvaluation = evaluateStateForPlayer(state, player, recursiveLimit);

  if (realEvaluation.certain) {
    memoedEvaluations[memoKey] = realEvaluation;
  }

  return realEvaluation;
};

// Maximises result on our turn, but minimises it on opponent's turn
const minMaxValueComparator = (
  a: EvaluatedState,
  b: EvaluatedState,
  maximise = true // should this sorter try to maximise or minimise the result
) => {
  const ascendingValueComparison = a.value - b.value;
  const ascendingTimeComparison = a.timeToEnd - b.timeToEnd;

  const valueSort = ascendingValueComparison * (maximise ? -1 : 1);
  // Time sorter rushes wins for the maximiser but delays losses... both vice versa for the minimizer
  const timeSort = ascendingTimeComparison * (maximise === a.value > 0 ? 1 : -1);

  return valueSort || timeSort; // Primarily sort by value but tiebreak on time
};

export const evaluateStateForPlayer = (
  state: State,
  player: Player,
  recursiveLimit: number
): EvaluatedState => {
  if (state.phase === "⏹") {
    // A tie is worth nothing!
    return { value: 0, timeToEnd: 0, certain: true };
  }

  if (["🔴", "🟡"].includes(state.phase)) {
    // This state is a win or a loss
    return {
      value: state.phase === player ? 1 : -1,
      timeToEnd: 0,
      certain: true,
    };
  }

  if (recursiveLimit === 0) {
    return heuristicEvaluation(state, player);
  }

  const rankedFutureStates = getLegalMoves(state.board)
    .map((move) =>
      memoEvaluateStateForPlayer(
        playMove(state, move),
        player,
        recursiveLimit - 1
      )
    )
    .sort((a, b) => minMaxValueComparator(a, b, state.nextToMove === player));

  const bestFutureState = rankedFutureStates[0];

  return {
    value: bestFutureState.value,
    timeToEnd: bestFutureState.timeToEnd + 1,
    certain: bestFutureState.certain,
  };
};

export const pickBestMove = (state: State): ColumnIndex => {
  // Get the set of all legal moves
  const legalMoves = getLegalMoves(state.board);
  // Evaluate the state each move would yield
  const rankedMoves = legalMoves
    .map((move) => ({
      move,
      evaluation: memoEvaluateStateForPlayer(
        playMove(state, move),
        state.nextToMove
      ),
    }))
    .sort((a, b) => minMaxValueComparator(a.evaluation, b.evaluation));

  // pick randomly from equal best
  const bestMove = rankedMoves[0];
  const equalBestMoves = rankedMoves
    .filter(
      ({ evaluation }) =>
        evaluation.value === bestMove.evaluation.value &&
        evaluation.timeToEnd === bestMove.evaluation.timeToEnd
    )
    .map(({ move }) => move);

  const randomBestMove =
    equalBestMoves[Math.floor(Math.random() * equalBestMoves.length)];

  return randomBestMove;
};
