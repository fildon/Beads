import React from "react";
import { banner, bannerContent } from "./mainPage.module.css";

export const MainPage = () => (
  <>
    <header className={banner}>
      <div className={bannerContent}>
        <h1>🔴Connect4🔵</h1>
      </div>
    </header>
    <section>
      <h2>Header</h2>
      <article>hello world</article>
    </section>
  </>
);
