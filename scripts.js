

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

// this will store what we want to appear on numDisplay
let numDisplayContent = '';

let secondNumDisplay = document.querySelector('#secondaryNumberDisplay');
secondNumDisplay.textContent = '';

// will store the operands/operators that we wil add, subtract, etc.
let operandArray = [];
let operatorArray = [];

const nums = document.querySelectorAll('.row > .nums');
const numsArray = Array.from(nums);

const ops = document.querySelectorAll('.row > .ops');
const opsArray = Array.from(ops);

const eq = document.querySelector('.eq');

const allClear = document.querySelector('.allClear');

// functionality for number buttons
numsArray.forEach(num => {
  num.addEventListener('click', function() {
    numDisplayContent = numDisplayContent + num.textContent;

    // appends number clicked onto the display
    numDisplay.textContent = numDisplayContent;
    secondNumDisplay.textContent += `${num.textContent}`;
  })
});

// functionality for operator buttons
opsArray.forEach(op => {
  op.addEventListener('click', function() {
    // add the current number/operator on display to operandArray/operatorArray
    operandArray.push(parseFloat(numDisplay.textContent));
    operatorArray.push(op.textContent);
    secondNumDisplay.textContent += ` ${op.textContent} `;

    let result;
    // if, for example, we previously clicked 2, +, 2 then + again,
    // we add (or subtract, multiply, etc.) the previous two numbers
    // and current display is changed to the result
    if (operandArray.length === 2) {
      // checks if we are dividing by zero
      if (operandArray[1] === 0 && operatorArray[0] === '/') {

        // resets calculator, displaying error message before resetting
        errorMessage();
      } else {
        // by this point our operandArray contains two operands, and
        // two operators, of which we select the first operator
        // since that is the operator with precedence (we clicked it first)
        result = operate(operandArray[0], operandArray[1], operatorArray[0])
                  .toPrecision(5);
        numDisplay.textContent = result;

        // resets the two arrays to be used for the next calculation
        operandArray = [parseFloat(numDisplay.textContent)];
        operatorArray = [operatorArray[1]];
      }
    }

    // set numDisplayContent to empty string, as when we press another number,
    // the next operand shouldn't be appended to the current operand
    numDisplayContent = '';
  })
});

// functionality for equal button
eq.addEventListener('click', function() {
  if (!(operandArray.length === 0)) {
    operandArray.push(parseFloat(numDisplay.textContent));
    if (operandArray[1] === 0 && operatorArray[0] === '/') {
      errorMessage();
    } else {
      // current number on display added to operandArray
      result = operate(operandArray[0], operandArray[1], operatorArray[0]);
      operandArray = [];
      operatorArray = [];
      numDisplay.textContent = result.toPrecision(5);
    }
  }
});

// functionality for all clear
allClear.addEventListener('click', function() {
  calcClear();
});

// clears the calculator's 'memory'
function calcClear() {
  numDisplayContent = '';
  operandArray = [];
  operatorArray = [];
  numDisplay.textContent = 0;
  secondNumDisplay.textContent = '';
}

// error message + resetting the numDisplay.textContent + resetting the whole calc
function errorMessage() {
  numDisplay.textContent = 'Unable to divide by zero! Resetting...'
  setTimeout(function() {
    calcClear()}, 1000)
}
