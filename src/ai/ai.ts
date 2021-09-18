import { pick_best_move } from "rusty-bot";

export const pickBestMove = (state: GameState): Promise<ColumnIndex> => {
  // Although pick_best_move is synchronous, it takes a while to compute
  // By wrapping it in a Promise like this, we can avoid blocking the main thread
  return new Promise((resolve) => {
    setTimeout(() => {
      const bestMove = pick_best_move(
        state.bitboard[0],
        state.bitboard[1],
        9,
        false
      ) as ColumnIndex;

      resolve(bestMove);
    });
  });
};
