

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  operatorList = {
    "+": add(a, b),
    "-": subtract(a, b),
    "x": multiply(a, b),
    "/": divide(a, b),
  }
  if (operator in operatorList) return operatorList[operator];
}