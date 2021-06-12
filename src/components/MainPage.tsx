import React from "react";
import { Board } from "./Board";

export const MainPage = () => (
  <>
    <header className="banner">
      <div className="bannerContent">
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
