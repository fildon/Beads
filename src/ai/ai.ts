import { pick_best_move } from "rusty-bot";

export const pickBestMove = (state: GameState): ColumnIndex => {
  const bestmove = pick_best_move(...state.bitboard);
  console.log(`bot chose: ${bestmove}`);
  return bestmove as ColumnIndex;
};
