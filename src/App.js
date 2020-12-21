import React, { useReducer, useContext } from "react";
import {
	inserisci,
	calcola,
	cancella,
	cancellaTutto,
	changeAngle,
	isFunction,
} from "./script.js";
import "./style.css";

export function App() {
	return <Calcolatrice />;
}

const AppContext = React.createContext(null);

function reducer(state, action) {
	let newState = { ...state };
	switch (action.type) {
		case "inserisci":
			newState.espressione = inserisci(
				state.espressione,
				action.payload.pulsante
			);
			break;
		case "angolo":
			newState.angolo = changeAngle(state.angolo);
			break;
		case "calcola":
			newState.risultato = calcola(state.espressione);
			break;
		case "elimina":
			newState.espressione = cancella(state.espressione);
			break;
		case "pulisci":
			newState.espressione = cancellaTutto(state.espressione);
			break;
		default:
			break;
	}
	console.log(newState);
	return newState;
}

export function Calcolatrice() {
	const [state, dispatch] = useReducer(reducer, {
		espressione: "0",
		risultato: "",
		angolo: "rad",
		pulsanti: [
			"rad",
			"sin",
			"cos",
			"tan",
			"%",
			"log",
			"√",
			"^",
			"(",
			")",
			"7",
			"8",
			"9",
			"DEL",
			"AC",
			"4",
			"5",
			"6",
			"x",
			"÷",
			"1",
			"2",
			"3",
			"+",
			"-",
			"0",
			".",
			"π",
			"Ans",
			"=",
		],
	});

	const pulsantiJSX = state.pulsanti.map((nome) => (
		<Pulsante testo={nome} key={nome} />
	));
	/* dispatch({
		type: 'add',
		payload: '7'
	}); */
	return (
		<div className="calcolatrice">
			<div className="logo">CASIO</div>
			<pre style={{ display: "inline-block" }}>fx-5B1BB0F PLUS</pre>
			<div
				style={{
					fontFamily: "hypocrisy",
					fontStyle: "italic",
					marginBottom: "-10px",
				}}
			>
				NATURAL-V.P.A.M.
			</div>
			<pre style={{ textAlign: "right", marginRight: "15px" }}>
				1st edition
			</pre>
			<AppContext.Provider value={{ state, dispatch }}>
				<Schermo />
				{pulsantiJSX}
				{/*
					onClick={() => setEspressione(cancella(espressione))}
					testo={"DEL"}
					bg_color={["#8BA937", "green"]}
				*/}
			</AppContext.Provider>
		</div>
	);
}

export function Schermo(props) {
	const { state, dispatch } = useContext(AppContext);
	return (
		<div className="schermo">
			<span>{state.espressione}</span>
			<div className="cursore">|</div>
			<div className="risultato">{state.risultato}</div>
		</div>
	);
}

export function Pulsante(props) {
	const { state, dispatch } = useContext(AppContext);
	let stile = {};
	if (props.bg_color != undefined) {
		stile = {
			backgroundColor: props.bg_color[0],
			boxShadow: "1px 2px 4px " + props.bg_color[1],
		};
	}

	let testo = props.testo;
	let tipo = "inserisci";
	switch (testo) {
		case "=":
			tipo = "calcola";
			break;
		case "DEL":
			tipo = "elimina";
			break;
		case "AC":
			tipo = "pulisci";
			break;
		case "rad":
		case "deg":
			tipo = "angolo";
			break;
		default:
			tipo = "inserisci";
			break;
	}

	let pulsante = testo;
	if (isFunction(pulsante)) pulsante += "(";

	function esegui() {
		dispatch({ type: tipo, payload: { pulsante: pulsante } });
		if (testo == "rad" || testo == "deg") testo = state.angolo;
	}

	if (testo == "rad" || testo == "deg") {
		return (
			<a className="pulsante" onClick={() => esegui()} style={stile}>
				{state.angolo}
			</a>
		);
	}
	return (
		<a className="pulsante" onClick={() => esegui()} style={stile}>
			{testo}
		</a>
	);
}
