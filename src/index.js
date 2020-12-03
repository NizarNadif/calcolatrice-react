import React from "react";
import ReactDOM from "react-dom";

import { Calcolatrice } from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Calcolatrice />
  </React.StrictMode>,
  rootElement
);
