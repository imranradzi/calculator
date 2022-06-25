

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
  })
});

// functionality for operator buttons
opsArray.forEach(op => {
  op.addEventListener('click', function() {
    // add the current number/operator on display to operandArray/operatorArray
    operandArray.push(parseInt(numDisplay.textContent));
    operatorArray.push(op.textContent);
    numDisplay.textContent = op.textContent;

    // set numDisplayContent to empty string, as when we press another number,
    // the next operand shouldn't be appended to the current operand
    numDisplayContent = '';
  })
});

// functionality for equal button
eq.addEventListener('click', function() {
  // current number on display added to operandArray
  operandArray.push(parseInt(numDisplayContent));

  // if 0 is on display then we do nothing
  if (!(numDisplayContent == 0)) {
    let i = 0;
    let result = operandArray.reduce((prevVal, currVal) => {
      console.log('i am running')
      return operate(prevVal, currVal, operatorArray[i++]);
    });

  
    // empty operandArray/operator after we have performed all operators
    // to make way for next set of operations
    operandArray = [];
    operatorArray = [];
  
    numDisplayContent = result;
    numDisplay.textContent = result;
  }
});

// functionality for all clear
allClear.addEventListener('click', function() {
  numDisplayContent = '';
  operandArray = [];
  operatorArray = [];
  numDisplay.textContent = 0;
});
