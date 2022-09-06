const output = document.querySelector('.output');
const calculatorButtons = document.querySelectorAll('button');

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
    decimalCount = 0;
    operator = undefined;
};

function saveNumber() {
    
    numbers.unshift(Number(output.textContent));

    numberSaved = true;

    console.log("just saved number: " + numbers[0]);
    while (numbers.length > 5) {
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

    console.log("num1 is type: " + typeof num1);
    console.log("num2 is type: " + typeof num2);

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
        if (stringTotal.length > 12) {
            stringTotal = Math.round((total + Number.EPSILON) * 100) / 100;
    }

    // Truncate the end of the "number" if it's too large
    while (stringTotal.length > 12) {
        stringTotal.slice(0, -1);
    }

    total = Number(stringTotal);
    output.textContent = total;
    operatorCount = 0;
    operator = undefined;
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
    } else if (button.classList.contains("digit")) {
        if (length > 11) {
            return;
        }

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
    } else if (button.classList.contains("backspace")) {
            if (length > 0) 
                output.textContent = output.textContent.slice(0, -1);
            } else {
                output.textContent = '';
            }

};

for (const button of calculatorButtons) {
    button.addEventListener('click', populateDisplay);
};