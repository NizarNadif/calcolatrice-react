import React from "react";
import "./style.css";

export function App() {
  return (
    <div className="app">
      <div className="background">
        CASIO
        <pre>fx-5B1BB0F PLUS</pre>
        <Schermo testo="0" />
        <Pulsante testo={7} />
        <Pulsante testo={8} />
        <Pulsante testo={9} />
        <Pulsante testo={"DEL"} />
        <Pulsante testo={"AC"} />
        <Pulsante testo={4} />
        <Pulsante testo={5} />
        <Pulsante testo={6} />
        <Pulsante testo={"X"} />
        <Pulsante testo={"÷"} />
        <Pulsante testo={1} />
        <Pulsante testo={2} />
        <Pulsante testo={3} />
        <Pulsante testo={"+"} />
        <Pulsante testo={"-"} />
        <Pulsante testo={0} />
        <Pulsante testo={"."} />
        <Pulsante testo={"KEK"} />
        <Pulsante testo={"Ans"} />
        <Pulsante testo={"="} />
      </div>
    </div>
  );
}

export function Schermo(props) {
  const testo = props.testo;
  return (
    <div className="schermo">
      <div>{testo}</div>
    </div>
  );
}

export function Pulsante(props) {
  const testo = props.testo;
  return (
    <button
      className="pulsante"
      onClick={() => {
        Saluto(testo);
      }}
    >
      {testo}
    </button>
  );
}

function Saluto(testo) {
  console.log(testo);
}
