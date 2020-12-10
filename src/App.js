import React, { useEffect, useReducer } from "react";
import { inserisci, calcola, cancella, cancellaTutto, changeAngle } from "./script.js";
import "./style.css";

export function App() {
  return (
    <Calcolatrice />
  )
}


export function Calcolatrice() {
  const [espressione, setEspressione] = React.useState('0');
  const [risultato, setRisultato] = React.useState('');
  const [angolo, setAngolo] = React.useState('rad')
  return (
    <div className="calcolatrice">
        <div className="logo">CASIO</div>
        <pre style={{display: "inline-block"}}>fx-5B1BB0F PLUS</pre>
      <div style={{fontFamily: "hypocrisy", fontStyle: "italic", marginBottom: "-10px"}}>NATURAL-V.P.A.M.</div>
      <pre style={{textAlign: "right", marginRight: "15px" }}>1st edition</pre>
      <Schermo testo={espressione} risultato={risultato} />
      <Pulsante onClick={() => setAngolo(changeAngle()) } testo={angolo} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, 'sin('))} testo={"sin"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, 'cos('))} testo={"cos"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, 'tan('))} testo={"tan"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '%'))} testo={"%"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, 'log('))} testo={"log"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '√'))} testo={"√"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '^'))} testo={"^"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '('))} testo={"("} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, ')'))} testo={")"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '7'))} testo={7} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '8'))} testo={8} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '9'))} testo={9} />
      <Pulsante onClick={() => setEspressione(cancella(espressione))} testo={"DEL"}  bg_color={['#8BA937', 'green']} />
      <Pulsante onClick={() => setEspressione(cancellaTutto())} testo={"AC"} bg_color={['#8BA937', 'green']} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '4'))} testo={4} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '5'))} testo={5} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '6'))} testo={6} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, 'x'))} testo={"X"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '÷'))} testo={"÷"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '1'))} testo={1} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '2'))} testo={2} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '3'))} testo={3} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '+'))} testo={"+"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '-'))} testo={"-"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '0'))} testo={0} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, '.'))} testo={"."} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, 'π'))} testo={"π"} />
      <Pulsante onClick={() => setEspressione(inserisci(espressione, 'Ans'))} testo={"Ans"} />
      <Pulsante onClick={() => setRisultato(calcola(espressione))} testo={"="} />
    </div>
  );
}

export function Schermo(props) { 
  return (
    <div className="schermo">
      <span>{props.testo}</span>
      <div className="cursore">|</div>
    <div className="risultato">{props.risultato}</div>
    </div>
  );
}

export function Pulsante(props) {
  /* useEffect(() => {
    //questo metodo viene applicato ogni volta che il componente viene renderizzato
    console.log('rendering del tasto "' + props.testo + '"...');
    //in cima si deve importare così: import React, {useState, useEffect} from "react";
  }); */
  let stile = {};
  let stileAttivo = {};
  if (props.bg_color != undefined) {
    stile = { backgroundColor: props.bg_color[0], boxShadow: '1px 2px 4px ' + props.bg_color[1] }
    stileAttivo = {backgroundColor: 'red' }
  }

  return (
    <a className="pulsante"
      onClick={() => { props.onClick() }} style={stile} >
      {props.testo}
    </a>
  );
}