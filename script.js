const buttonPanel = document.querySelector("#button-panel");
const calculationDisplay = document.querySelector("#calculation-display");
const entryDisplay = document.querySelector("#entry-display");

class CalcButton {
    constructor(name, symbol, type) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
        this.enter = () => handleEntry(name, type); // Event listener for each button gets attached here
    }
}

class Calculation {

}

class CalcEntry {
    #active;
    #value;
    #display;
    #buffer;
    #mode;
    #operator;

    static allowedModes = ["new", "entry", "modifier", "operator"]; // will always be in one of these four states
    static allowedOperators = ["add", "subtract", "multiply", "divide", "equals", undefined]; // Needs to allow it not being set yet

    constructor(value) {
        this.active = true;
        this.value = value;
        this.display = "";
        this.buffer = buffer;
        this.mode = undefined;
    }

        
}

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
    new CalcButton("equals", "=", "operator"),
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

}

function handleEntry(buttonName, buttonType) {
    console.log(`Button name: ${buttonName}\nButton type: ${buttonType}`);
}

function initCalculator() {
    buttonPanel.innerHTML = "";
    renderCalcButtons(calcButtons);
    renderDisplay();
};


initCalculator();