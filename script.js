const display = document.querySelector('.displaySection');
const output = document.querySelector('.output');
const digitButtons = document.querySelectorAll('button');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalsButton = document.querySelector('.equals');

let numbers = [];
let operators = [];
let numberSaved = false;
let operatorCount = 0;
let totalled = false;
let operator = undefined;
let decimalCount = 0;

function clearDisplay() {
    while (numbers.length > 0) {
        numbers.pop();
    }
    while (operators.length > 0) {
        operators.pop();
    }
    
    numbers = [];
    operators = [];
    
    output.textContent = '';
    
    numberSaved = false;
    totalled = false;
    operatorCount = 0;
    operator = undefined;
};

function saveNumber() {
    
    numbers.unshift(Number(output.textContent));

    numberSaved = true;

    console.log("just saved number: " + numbers[0]);
    while (numbers.length > 3) {
        numbers.pop();   
    }
    decimalCount = 0;
    return;
}

function saveOperator(button) {

    operators.unshift(button.classList[1]);
    console.log("just saved operator: " + operators[0]);
    while (operators.length > 3) {
        operators.pop();
    }

    return;
}

function totalSum(button) {
   
    //do something here
    //to save output.textContent after a sum
    if (!numberSaved) {
        saveNumber();
        numbers.shift();
        output.textContent = numbers[0];
        return;
    }

    if (button === "=") {
        operator = operators[0];
    } else {
        operator = operators[1];
    }

    let num1 = numbers[1];
    let num2 = numbers[0];

    switch (operator) {
        case "add":
            total = num1 + num2;
            break;
        case "subtract":
            total = num1 - num2;
            break;
        case "multiply":
            total = num1 * num2;
            break;
        case "divide":
            if (num1 === 0 || num2 === 0) {
                output.textContent = "ERROR";
            } else {
                total = num1 / num2;
            }
            break;
    }

    // Testing for a decimal place and rounding the total if there is one.
    let stringTotal = String(total);
    if (stringTotal.includes(".")) {
        total = Math.round((total + Number.EPSILON) * 10000000) / 10000000;
    }

    output.textContent = total;
    saveNumber();
}

function populateDisplay(e) {
    
    e.preventDefault();
    
    if (numberSaved) {
        output.textContent = '';
        numberSaved = false;
    }

    const button = e.target;
    const length = output.textContent.length;

    if (button.classList.contains("clear")) {
        clearDisplay();
        return;
    } else if (button.classList.contains("decimal")) {
        if (decimalCount === 0) {
            output.textContent += button.value;
            decimalCount++;
        } else {
            return;
        }
    } else if (button.classList.contains("digit") && (length < 12)) {
        if (output.textContent.startsWith("0") && (output.textContent.charAt(1) !== ".")) {
            output.textContent = button.value;
        } else {
            output.textContent += button.value;
        }
    } else if (button.classList.contains("operator")) {
        
        if (length > 0) {
            saveNumber();
        }

        saveOperator(button);
        operatorCount++;

        if (operatorCount == 2) {
            totalSum();
            operatorCount--;
        }

    } else if (button.classList.contains("equals")) {

        if(length > 0) {

            saveNumber();
            totalSum(button.value);

        } else {
            output.textContent = "ERROR";
        }
    }
};

for (const button of digitButtons) {
    button.addEventListener('click', populateDisplay);
};