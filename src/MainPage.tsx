import React from "react";
import * as styles from "./mainPage.module.css";
import { Board } from "./Board";

export const MainPage = () => (
  <>
    <header className={styles.banner}>
      <div className={styles.bannerContent}>
        <h1>🔴Connect4️⃣🟡</h1>
      </div>
    </header>
    <section>
      <article>
        <Board />
      </article>
    </section>
  </>
);
