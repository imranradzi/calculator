

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

let numDisplay = document.querySelector('#numberDisplay');
let numDisplayContent = '';
let displayValue = 0;
let currentOperator;
const nums = document.querySelectorAll('.row > .nums');
const numsArray = Array.from(nums);
const ops = document.querySelectorAll('.row > .ops');
const opsArray = Array.from(ops);
const eq = document.querySelector('.eq');
const allClear = document.querySelector('.allClear');

numsArray.forEach(num => {
  num.addEventListener('click', function() {
    numDisplayContent = numDisplayContent + num.textContent;
    numDisplay.textContent = numDisplayContent;
  })
});

opsArray.forEach(op => {
  op.addEventListener('click', function() {
    displayValue = parseInt(numDisplay.textContent);
    numDisplay.textContent = op.textContent;
    numDisplayContent = '';
    currentOperator = op.textContent;
  })
});

eq.addEventListener('click', function() {
  result = operate(displayValue,
              parseInt(numDisplayContent), currentOperator);
  numDisplay.textContent = result.toString();
  displayValue = result;
});

allClear.addEventListener('click', function() {
  numDisplayContent = '';
  displayValue = 0;
  numDisplay.textContent = numDisplayContent;
});
