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

const memoedEvaluations: Record<string, EvaluatedState> = {};

const memoEvaluateStateForPlayer = (
  state: State,
  player: Player,
  recursiveLimit = 6
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

// TODO memoize... but note that the recursiveLimit needs to be taken into account for memoization
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
    // TODO a smarter heuristic?
    // We've hit our recursion limit so let's just return a guess
    return { value: 0, timeToEnd: Infinity, certain: false };
  }

  // Maximises result on our turn, but minimises it on opponent's turn
  const minMaxValueSorter = (a: EvaluatedState, b: EvaluatedState) =>
    state.nextToMove === player ? b.value - a.value : a.value - b.value;

  const rankedFutureStates = getLegalMoves(state.board)
    .map((move) =>
      memoEvaluateStateForPlayer(
        playMove(state, move),
        player,
        recursiveLimit - 1
      )
    )
    .sort((a, b) => minMaxValueSorter(a, b) || a.timeToEnd - b.timeToEnd);

  const bestFutureState = rankedFutureStates[0];

  return {
    value: bestFutureState.value,
    timeToEnd: bestFutureState.timeToEnd + 1,
    certain: bestFutureState.certain,
  };
};

// tie break sorting function only to be used when a.value === b.value
const timeToEndSorter = (a: EvaluatedState, b: EvaluatedState) =>
  // we want to rush wins and delay losses
  a.value > 0 ? a.timeToEnd - b.timeToEnd : b.timeToEnd - a.timeToEnd;

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
    // Descending sort by value, with timeToEnd tiebreaker
    .sort(
      (a, b) =>
        b.evaluation.value - a.evaluation.value ||
        timeToEndSorter(a.evaluation, b.evaluation)
    );

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
