const buttonPanel = document.querySelector("#button-panel");
const calculationDisplay = document.querySelector("#calculation-display");
const entryDisplay = document.querySelector("#entry-display");

class calcButton {
    constructor(name, symbol, type,) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
        this.enter = () => handleEntry(name, type);
    }
}

class calcEntry {
    constructor(value, display) {
        this.value = value;
        this.display = display;
    }
}

currentCalculation = null;
currentEntry = 0;

let calcButtons = [
    // Row 1
    new calcButton("percentage", "%", "modifier"),
    new calcButton("clear-entry", "CE", "control"),
    new calcButton("clear-all", "C", "control"),
    new calcButton("backspace", "⌫", "control"),

    // Row 2
    new calcButton("reciprocal", "1/𝑥", "modifier"),
    new calcButton("square", "𝑥²", "modifier"),
    new calcButton("square-root", "√𝑥", "modifier"),
    new calcButton("divide", "÷", "operator"),

    // Row 3
    new calcButton("seven", "7", "operand"),
    new calcButton("eight", "8", "operand"),
    new calcButton("nine", "9", "operand"),
    new calcButton("multiply", "×", "operator"),

    // Row 4
    new calcButton("four", "4", "operand"),
    new calcButton("five", "5", "operand"),
    new calcButton("six", "6", "operand"),
    new calcButton("subtract", "-", "operator"),

    // Row 5
    new calcButton("one", "1", "operand"),
    new calcButton("two", "2", "operand"),
    new calcButton("three", "3", "operand"),
    new calcButton("add", "+", "operator"),

    // Row 6
    new calcButton("toggle-parity", "+/-", "operand"),
    new calcButton("zero", "0", "operand"),
    new calcButton("decimal-point", ".", "operand"),
    new calcButton("equals", "=", "operand"),
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

function renderDisplay() {
    if (currentCalculation != null) {
        calculationDisplay.textContent = currentCalculation;
    } else {
        calculationDisplay.textContent = "";
    }

    if (currentEntry != null) {
        entryDisplay.textContent = currentEntry;
    } else {
        entryDisplay.textContent = 0;
    }
}

function handleEntry(buttonName, buttonType) {
    switch(buttonType) {
        case "operand":
            handleOperand(buttonName);
            break;
        case "modifier":
            handleModifier(buttonName);
            break;
        case "operator":
            handleOperator(buttonName);
            break;
        case "control":
            handleControl(buttonName);
            break;
    }
}

function handleOperand(buttonName) {
    alert(`Operand: ${buttonName}`)
    // if !
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

// modifiers = calcButtons
//     .filter(btn => btn.type == "modifier")
//     .map(item => item.name)

// operators = calcButtons
//     .filter(btn => btn.type == "operator")
//     .map(item => item.name)

// controls = calcButtons
//     .filter(btn => btn.type == "control")
//     .map(item => item.name)

// console.log(operands)
// console.log(modifiers)
// console.log(operators)
// console.log(controls)
