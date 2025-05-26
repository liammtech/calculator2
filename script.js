const buttonPanel = document.querySelector("#button-panel");
const calculationDisplay = document.querySelector("#calculation-display");
const entryDisplay = document.querySelector("#entry-display");

class CalcButton {
    constructor(name, symbol, type) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
        this.enter = () => handleEntry(name, type);
    }
}

class Calculation {
        constructor(value, display) {
        this.value = value;
        this.display = display;
    }
}

class CalcEntry {
    constructor(value, display) {
        this.value = value;
        this.display = display;
    }
}

calculationFlag = false;
entryFlag = false;

let calcButtons = [
    // Row 1
    new CalcButton("percentage", "%", "modifier"),
    new CalcButton("clear-entry", "CE", "control"),
    new CalcButton("clear-all", "C", "control"),
    new CalcButton("backspace", "⌫", "control"),

    // Row 2
    new CalcButton("reciprocal", "1/𝑥", "modifier"),
    new CalcButton("square", "𝑥²", "modifier"),
    new CalcButton("square-root", "√𝑥", "modifier"),
    new CalcButton("divide", "÷", "operator"),

    // Row 3
    new CalcButton("seven", "7", "operand"),
    new CalcButton("eight", "8", "operand"),
    new CalcButton("nine", "9", "operand"),
    new CalcButton("multiply", "×", "operator"),

    // Row 4
    new CalcButton("four", "4", "operand"),
    new CalcButton("five", "5", "operand"),
    new CalcButton("six", "6", "operand"),
    new CalcButton("subtract", "-", "operator"),

    // Row 5
    new CalcButton("one", "1", "operand"),
    new CalcButton("two", "2", "operand"),
    new CalcButton("three", "3", "operand"),
    new CalcButton("add", "+", "operator"),

    // Row 6
    new CalcButton("toggle-parity", "+/-", "operand"),
    new CalcButton("zero", "0", "operand"),
    new CalcButton("decimal-point", ".", "operand"),
    new CalcButton("equals", "=", "operand"),
]

function renderCalcButtons(buttons) {
    for (button in buttons) {
        newBtn = document.createElement("button");

        // Set attributes
        newBtn.setAttribute("id", calcButtons[button].name);
        newBtn.setAttribute("class", calcButtons[button].type);
        newBtn.textContent = calcButtons[button].symbol;

        // Assign event listener to button
        newBtn.addEventListener("click", calcButtons[button].enter);

        buttonPanel.appendChild(newBtn);
    }
}

function renderDisplay(currentCalculation, currentEntry) {
    if (calculationFlag != false) {
        calculationDisplay.textContent = currentCalculation;
    } else {
        calculationDisplay.textContent = "";
    }

    if (entryFlag != false) {
        entryDisplay.textContent = currentEntry;
    } else {
        entryDisplay.textContent = 0;
    }
}

function handleEntry(buttonName, buttonType) {
    if (!calculationFlag) { // If there is no current calculation: new calculation
        calculationFlag = true;
        currentCalculation = new Calculation(0, 0);
    }

    if (!entryFlag) { // If this is the first operand being entered: new entry
        entryFlag = true;
        currentEntry = new CalcEntry(0, 0);
    }

    let newValue;

    switch(buttonType) {
        case "operand":
            handleOperand(buttonName, currentEntry);
            break;
        case "modifier":
            handleModifier(buttonName, currentEntry);
            break;
        case "operator":
            handleOperator(buttonName, currentEntry);
            break;
        case "control":
            handleControl(buttonName, currentEntry);
            break;
    }

    renderDisplay((currentCalculation.value === 0 ? "" : currentCalculation.value), currentEntry.value)
}

function handleOperand(buttonName, currentEntry) {
    if (buttonName === "zero" && currentEntry.value === 0 ) {
        return;
    }

    if (buttonName != "decimal-point" && buttonName != "zero" && currentEntry.value === 0 ) {
        currentEntry.value = "";
    }

    switch(buttonName) {
        case "toggle-parity":
            if (currentEntry.value === "") {
                currentEntry.value = 0;
                break;
            } else if(currentEntry.value.charAt(0) === "-") {
                currentEntry.value = currentEntry.value.slice(1);
            } else {
                currentEntry.value = "-" + currentEntry.value;
            }
            break;
        case "decimal-point":
            if (currentEntry.value.indexOf(".") != -1) {
                break;
            }
            currentEntry.value += ".";
            break;
        case "one":
            currentEntry.value += "1";
            break;
        case "two":
            currentEntry.value += "2";
            break;
        case "three":
            currentEntry.value += "3";
            break;
        case "four":
            currentEntry.value += "4";
            break;
        case "five":
            currentEntry.value += "5";
            break;
        case "six":
            currentEntry.value += "6";
            break;
        case "seven":
            currentEntry.value += "7";
            break;
        case "eight":
            currentEntry.value += "8";
            break;
        case "nine":
            currentEntry.value += "9";
            break;
    }


};

function handleModifier(buttonName) {
    alert(`Modifier: ${buttonName}`)
};

function handleOperator(buttonName) {
    alert(`Operator: ${buttonName}`)
};

function handleControl(buttonName) {
    alert(`Control: ${buttonName}`)
};

renderCalcButtons(calcButtons);
renderDisplay();


//Here if I need it

// operands = calcButtons
//     .filter(btn => btn.type == "operand")
//     .map(item => item.name)

modifiers = calcButtons
    .filter(btn => btn.type == "modifier")
    .map(item => item.name)

// operators = calcButtons
//     .filter(btn => btn.type == "operator")
//     .map(item => item.name)

// controls = calcButtons
//     .filter(btn => btn.type == "control")
//     .map(item => item.name)

// console.log(operands)
console.log(modifiers)
// console.log(operators)
// console.log(controls)
