import React, {useEffect} from "react";
import "./style.css";

export function App() {
  return (
    <div className="app">
      <div className="background">
        CASIO
        <pre>fx-5B1BB0F PLUS</pre>
        <Schermo testo={0} />
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
  return (
    <div className="schermo">
      <div>{props.testo}</div>
    </div>
  );
}

export function Pulsante(props) {
  const [count, setCount] = React.useState(0);

  function azione() {
    setCount(count + 1);
    console.log('tasto premuto ' + count + ' volte');
  }

  useEffect(() => {
    //questo metodo viene applicato ogni volta che il componente viene renderizzato
    console.log('rendering del tasto "' + props.testo + '"...');
    //in cima si deve importare così: import React, {useState, useEffect} from "react";
  });

  return (
    <button
      className="pulsante"
      onClick={() => { azione(); }}
    >
      {props.testo}
    </button>
  );
}