// Globale variabelen
let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetScreen = false;

// Input-veld (display)
const display = document.getElementById("myInput");

//Cijfers invoeren
function appendNumber(number) {
  if (display.value === "0" || shouldResetScreen) {
    display.value = number;
    shouldResetScreen = false;
  } else {
    //Cijfers achter elkaar invoegen
    display.value += number;
  }
}

//Punt invoegen (max 1 keer)
function appendDecimal() {
  if (shouldResetScreen) return;
  if (display.value.indexOf(".") === -1) {
    display.value += ".";
  }
}

//Operator selecteren
function chooseOperator(operator) {
  if (currentOperator !== "") evaluate();
  firstNumber = display.value;
  currentOperator = operator;
  shouldResetScreen = true;
}

//Berekening uitvoeren (zonder eval)
function evaluate() {
  if (currentOperator === "" || shouldResetScreen) return;

  secondNumber = display.value;
  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);
  let result;

  if (currentOperator === "+") result = a + b;
  else if (currentOperator === "-") result = a - b;
  else if (currentOperator === "*") result = a * b;
  else if (currentOperator === "/") {
    if (b === 0) {
      alert("Delen door nul is niet toegestaan!");
      clearCalculator();
      return;
    }
    result = a / b;
  }

  display.value = result;
  firstNumber = result;
  currentOperator = "";
  shouldResetScreen = true;
}

//Reset
function clearCalculator() {
  display.value = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = "";
  shouldResetScreen = false;
}

//Event listeners koppelen
function setupEventListeners() {
  document.querySelectorAll(".number").forEach(button =>
    button.addEventListener("click", () => appendNumber(button.textContent))
  );

  document.querySelectorAll(".operator").forEach(button =>
    button.addEventListener("click", () => chooseOperator(button.textContent))
  );

  document.getElementById("equals").addEventListener("click", evaluate);
  document.getElementById("clear").addEventListener("click", clearCalculator);
  document.getElementById("decimal").addEventListener("click", appendDecimal);
}

setupEventListeners();