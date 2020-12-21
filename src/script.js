const toRad = Math.PI / 180;
const toDegree = 180 / Math.PI;
const actualAngle = toRad;
let degree = false;
let risultati = [0];

export function changeAngle(angle) {
	switch (angle) {
		case "rad":
			degree = true;
			return "deg";
		case "deg":
			degree = false;
			return "rad";
		default:
			break;
	}
}

export function inserisci(espressione, carattere) {
	let res = espressione;
	if (res.charAt(0) == "0" && !isOperand(carattere)) {
		res = res.slice(1, res.length);
	}
	res += carattere;
	return res;
}

export function calcola(espressione) {
	return daInAPos(espressione);
}

export function cancella(espressione) {
	let res = espressione;
	let daRimuovere = 1;
	if (res.length >= 3) {
		let ultimeTre = res.slice(res.length - 3, res.length);
		if (isFunction(ultimeTre) || ultimeTre == "NaN" || ultimeTre == "Ans")
			daRimuovere = 3;
	}
	res = espressione.slice(0, res.length - daRimuovere);
	return res;
}

export function cancellaTutto() {
	return "";
}

function isOperand(x) {
	return x == "+" || x == "-" || x == "x" || x == "÷" || x == "^" || x == "%";
}

export function isFunction(x) {
	return x == "cos" || x == "sin" || x == "tan" || x == "log" || x == "√";
}

function precedence(a, b) {
	if (a == "+" || a == "-") return false;
	else return b == "+" || b == "-";
}

function eseguiOp(b, a, x) {
	if (x == "+") {
		if (a == null) return Number(0) + Number(b);
		return Number(a) + Number(b);
	}
	if (x == "-") {
		if (a == null) return Number(0) - Number(b);
		return Number(a) - Number(b);
	}
	if (x == "x") return Number(a) * Number(b);
	if (x == "÷") return Number(a) / Number(b);
	if (x == "^") return Math.pow(a, b);
	if (x == "%") return Number(a) % Number(b);
	return 0;
}

function eseguiFun(n, x) {
	let risultato = 0;
	if (x == "sin") {
		if (degree) {
			risultato = Math.sin(n * toRad);
		} else {
			risultato = Math.sin(n);
		}
	} else if (x == "cos") {
		if (degree) {
			risultato = Math.cos(n * toRad);
		} else {
			risultato = Math.cos(n);
		}
	} else if (x == "tan") {
		if (degree) {
			if (n % 360 == 90 || n % 360 == -270) return "+infinito";
			else if (n % 360 == 270 || n % 360 == -90) return "-infinito";
			return Math.tan(n * toRad);
		}
		risultato = Math.tan(n);
	} else if (x == "log") {
		risultato = Math.log10(n);
	} else if (x == "√") {
		return Math.sqrt(n);
	}
	//if (typeof risultato !== 'undefined') return 0;
	//if (isNaN(risultato)) return 0;
	return risultato;
}

function daInAPos(infix) {
	let posfix = [];
	let stackChar = [];
	console.log("-----------------------------------");
	console.log("Infissa: " + infix);
	//Conversione a posfissa
	stackChar.push("(");
	for (var i = infix.length; i > 0; i--) infix += ")";
	for (var i = 0; stackChar.length != 0; i++) {
		let x = infix[i];
		if (!isNaN(x) || x == "." || x == "π") {
			if (x == "π") x = Math.PI;
			let numero = "";
			while (!isNaN(x) || x == ".") {
				numero += x;
				i++;
				x = infix[i];
			}
			posfix.push(numero);
			i--;
		} else if (infix.slice(i, i + 3) == "Ans") {
			posfix.push("Ans");
			i += 2;
		} else if (x == "(") stackChar.push("(");
		else if (x == ")") {
			let a = stackChar.pop();
			while (isOperand(a) || isFunction(a)) {
				posfix.push(a);
				a = stackChar.pop();
			}
		} else if (isNaN(x)) {
			if (isFunction(infix.slice(i, i + 3))) {
				x = infix.slice(i, i + 3);
				i += 2;
			}
			let a = stackChar.pop();
			while (isOperand(a) || isFunction(a)) {
				if (!precedence(x, a)) {
					posfix.push(a);
					a = stackChar.pop();
				} else {
					stackChar.push(a);
					break;
				}
			}
			if (!isOperand(a) || !isFunction(a)) stackChar.push(a);
			stackChar.push(x);
		}
	}
	for (let i = 0; i < posfix.length; i++) {
		if (isOperand(posfix[i]) && posfix[i] == posfix[i + 1])
			posfix.splice(i, 1);
	}
	console.log("Postfissa: " + posfix);
	return daPosADouble(posfix);
}

function daPosADouble(posfix) {
	let stackInt = [];
	let risultato;

	posfix.forEach((x) => {
		if (x == "Ans") {
			let n = risultati.pop();
			risultati.push(n);
			stackInt.push(n);
		} else if (!isNaN(x)) {
			stackInt.push(x);
		} else if (isFunction(x)) {
			let n = stackInt.pop();
			let risultato = eseguiFun(n, x);
			stackInt.push(risultato);
		} else if (x == "√") {
			let n = stackInt.pop();
			let risultato = eseguiFun(n, x);
			stackInt.push(risultato);
		} else {
			let a = stackInt.pop();
			let b = stackInt.pop();
			let risultato = eseguiOp(a, b, x);
			if (risultato == "+infinito" || risultato == "-infinito")
				return risultato;
			stackInt.push(risultato);
		}
	});
	risultato = stackInt.pop();
	console.log("Risultato: " + risultato);
	console.log("-----------------------------------");
	risultati.push(risultato);
	return "" + risultato;
}
