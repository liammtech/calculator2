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
        this.display = [];
        this.operands = [];
        this.operators = [];
    }
}

class CalcEntry {
    constructor(strValue, display) {
        this.strValue = strValue;
        this.display = display;
        this.numValue = Number(strValue);
    }

    appendStrValue(newChar) {
        this.strValue += newChar;
        this.numValue = Number(this.strValue);
    }

    updateNumValue(newValue) {
        this.numValue = newValue;
        this.strValue = this.numValue.toString();
    }

    updateDisplayValue(newValue) {
        this.displayValue = newValue;
    }
}

calculationFlag = false;
entryFlag = false;
modifierFlag = false;
operatorFlag = false;

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
    new CalcButton("toggle-parity", "+/-", "modifier"),
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

function renderDisplay(currentCalculationStr, currentEntryStr) {
    if (calculationFlag != false) {
        calculationDisplay.textContent = currentCalculationStr;
    } else {
        calculationDisplay.textContent = "";
    }

    if (entryFlag != false) {
        entryDisplay.textContent = currentEntryStr;
    } else {
        entryDisplay.textContent = 0;
    }
}

function handleEntry(buttonName, buttonType) {
    if (!calculationFlag) { // If there is no current calculation chain: new calculation
        calculationFlag = true;
        currentCalculation = new Calculation(0, 0);
    }

    if (!entryFlag) { // If this is the first operand being entered: new entry
        entryFlag = true;
        currentEntry = new CalcEntry(0, 0);
    }

    if (buttonType === "operand" && modifierFlag) {
        entryFlag = true;
        modifierFlag = false;
        currentEntry = new CalcEntry(0, 0);
    }

    let newValue;

    switch(buttonType) {
        case "operand":
            handleOperand(buttonName, currentEntry); // Doesn't interact directly with the calculation chain, so doesn't need the currentCalculation object
            break;
        case "modifier":
            handleModifier(buttonName, currentEntry, currentCalculation);
            break;
        case "operator":
            handleOperator(buttonName, currentEntry, currentCalculation);
            break;
        case "control":
            handleControl(buttonName, currentEntry, currentCalculation);
            break;
    }

    if (entryFlag) {
        renderDisplay((currentEntry.displayValue === 0 ? "" : currentEntry.displayValue), currentEntry.numValue)
    }
}

function updateCalculationOperands(operand) {
    currentCalculation.operands.push(operand);
    console.log(currentCalculation.operands);
}

function updateCalculationOperators(operator) {

}

function handleOperand(buttonName, currentEntry) {
    if (buttonName === "zero" && currentEntry.strValue === 0 ) {
        return;
    }

    if (buttonName != "decimal-point" && buttonName != "zero" && currentEntry.numValue === 0 ) {
        currentEntry.strValue = "";
    }

    switch(buttonName) {
        case "decimal-point":
            if (currentEntry.strValue.indexOf(".") != -1) {
                break;
            }
            currentEntry.valueBuffer += ".";
            break;
        case "one":
            currentEntry.appendStrValue("1");
            break;
        case "two":
            currentEntry.appendStrValue("2");
            break;
        case "three":
            currentEntry.appendStrValue("3");
            break;
        case "four":
            currentEntry.appendStrValue("4");
            break;
        case "five":
            currentEntry.appendStrValue("5");
            break;
        case "six":
            currentEntry.appendStrValue("6");
            break;
        case "seven":
            currentEntry.appendStrValue("7");
            break;
        case "eight":
            currentEntry.appendStrValue("8");
            break;
        case "nine":
            currentEntry.appendStrValue("9");
            break;
    }
};

function handleModifier(buttonName, currentEntry, currentCalculation) {
    let modifierStr = "";
    switch (buttonName) {
        case "toggle-parity":
            if (currentEntry.strValue === "") {
                currentEntry.strValue = 0;
                break;
            } else if(currentEntry.strValue.charAt(0) === "-") {
                currentEntry.strValue = currentEntry.strValue.slice(1);
            } else {
                currentEntry.strValue = "-" + currentEntry.strValue;
                currentEntry.numValue = -Math.abs(currentEntry.numValue);
            if (!currentEntry.displayValue) {
                currentEntry.updateDisplayValue(`${currentEntry.strValue}`);
            } else {
                currentEntry.updateDisplayValue(`-${currentEntry.displayValue})`);
            }
            }

            break;
        case "percentage":
            if (currentCalculation.operands.length === 0 ||
                currentCalculation.operands[0] === 0
            ) {
                currentEntry.numValue = 0;
                break;
            } else if (
                currentCalculation.operands.length === 1
            ) {
                currentEntry.numValue = currentCalculation.operands[0] / 100;
                currentCalculation.operands.push(currentEntry.numValue);
                break;
            } else if (
                currentCalculation.operands.length === 2
            ) {
                currentEntry.numValue = currentCalculation.operands[1] / 100;
                currentEntry.updateDisplayValue(currentEntry.strValue);
                currentCalculation.operands.push(currentEntry.numValue);
                break;
            }
        case "reciprocal":
            if (currentEntry.numValue === 0) {
                break;
            } else {
                if (!currentEntry.displayValue) {
                    currentEntry.updateDisplayValue(`1/(${currentEntry.strValue})`);
                } else {
                    currentEntry.updateDisplayValue(`1/(${currentEntry.displayValue})`);
                }
                currentEntry.updateNumValue(1 / currentEntry.numValue);
                entryDisplay.classList.add("result-display");
                break;
            }
        case "square":
            if (currentEntry.numValue === 0) {
                break;
            } else {
                console.log(currentEntry.numValue);
                if (!currentEntry.displayValue) {
                    currentEntry.updateDisplayValue(`sqr(${currentEntry.strValue})`);
                } else {
                    currentEntry.updateDisplayValue(`sqr(${currentEntry.displayValue})`);
                }
                currentEntry.updateNumValue(currentEntry.numValue * currentEntry.numValue);
                
                entryDisplay.classList.add("result-display")
                break;
            }
        case "square-root":
            if (currentEntry.numValue === 0) {
                break;
            } else if (currentEntry.numValue < 0) {
                console.log(entryDisplay);
                entryDisplay.textContent = "INVALID";
                entryFlag = false;
                calculationFlag = false;
                break;
            } else {
                console.log(currentEntry.numValue);
                if (!currentEntry.displayValue) {
                    currentEntry.updateDisplayValue(`sqrt(${currentEntry.strValue})`);
                } else {
                    currentEntry.updateDisplayValue(`sqrt(${currentEntry.displayValue})`);
                }
                currentEntry.updateNumValue(Math.sqrt(currentEntry.numValue));
                entryDisplay.classList.add("result-display")
                break;
            }
    }
    renderDisplay((currentCalculation.value === 0 ? "" : currentCalculation.value), currentEntry.numValue)
    if (modifierFlag) {
        updateCalculationOperands(currentEntry);
        calculationFlag = true;
    }
    else {
        calculationFlag = true;
        modifierFlag = true;
    }
};

function handleOperator(buttonName, currentEntry, currentCalculation) {
    alert(`Operator: ${buttonName}`)
};

function handleControl(buttonName) {
    switch (buttonName) {
        case "clear-all":
            initCalculator();
            break;
        case "clear-entry":
            currentEntry.numValue = 0;
            break;
    }
};

function initCalculator() {
    calculationFlag = false;
    entryFlag = false;
    modifierFlag = false;
    operatorFlag = false;
    buttonPanel.innerHTML = "";
    renderCalcButtons(calcButtons);
    renderDisplay();
};

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

initCalculator();