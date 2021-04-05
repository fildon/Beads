import React from "react";
import styles from "./mainPage.module.css";
import { Board } from "./Board";

const testState: State = {
  nextToMove: "🔴",
  phase: "▶",
  board: [
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "⚫", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "🔴", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "🟡", "⚫", "⚫", "⚫"],
    ["⚫", "⚫", "⚫", "🟡", "⚫", "⚫", "⚫"],
    ["🔴", "🔴", "🔴", "🟡", "⚫", "⚫", "⚫"],
  ],
};

export const MainPage = () => (
  <>
    <header className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1>🔴Connect4️⃣🟡</h1>
      </div>
    </header>
    <section>
      <article>
        <Board state={testState} />
      </article>
    </section>
  </>
);
