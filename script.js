window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").style.display = "none";
  }, 1500);
});

let display = document.getElementById("display");
let expressionDisplay = document.getElementById("expression");
let countDisplay = document.getElementById("count");
let calculationCount = 0;
let currentExpression = "";
let lastInput = "0";
let newNumberStarted = true;

function isOperator(char) {
  return ["+", "-", "×", "÷", "%", "^", "(", ")"].includes(char);
}

function appendValue(value) {
  if (display.innerText === "0" && value !== ".") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
  currentExpression = display.innerText;

  expressionDisplay.style.display = "none";
  if (!isNaN(value) && value !== " ") {
    if (newNumberStarted) {
      calculationCount++;
      countDisplay.innerText = "Count: " + calculationCount;
      newNumberStarted = false; 
    }
  }

  if (isOperator(value)) {
    newNumberStarted = true;
  }

  lastInput = value;
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
  currentExpression = display.innerText;
  expressionDisplay.innerText = currentExpression;
}

function clearDisplay() {
  display.innerText = "0";
  expressionDisplay.innerText = "";
  currentExpression = "";
  calculationCount = 0;
  countDisplay.innerText = "count: 0";
  newNumberStarted=true;
}

function calculateResult() {
  try {
    let expr = display.innerText;

    expr = expr.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");

    expr = expr.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, "Math.pow($1,$3)");

    expr = expr.replace(/÷/g, "/");

    expr = expr.replace(/×/g, "*");

    let result = eval(expr);
    expressionDisplay.innerText = display.innerText;
    expressionDisplay.style.display = "block";
    display.innerText = result;
  } catch {
    display.innerText = "Error";
  }
}
