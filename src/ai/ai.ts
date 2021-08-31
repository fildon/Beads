import { pick_best_move } from "rusty-bot";

export const pickBestMove = (state: GameState): ColumnIndex => {
  const bestmove = pick_best_move(
    state.bitboard[0],
    state.bitboard[1],
    8,
    false
  );
  return bestmove as ColumnIndex;
};
