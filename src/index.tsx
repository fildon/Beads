import React from "react";
import { render } from "react-dom";
import { MainPage } from "./components/MainPage";

document.addEventListener("DOMContentLoaded", () => {
  render(<MainPage />, document.getElementById("root"));
});
