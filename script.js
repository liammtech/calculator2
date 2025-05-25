buttonPanel = document.querySelector("#button-panel")

class calcButton {
    constructor(name, symbol, type,) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
    }
}

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
    new calcButton("equals", "=", "operator"),
]

function renderCalcButtons(buttons) {
    for (button in buttons) {
        newBtn = document.createElement("button");

        // Set attributes
        newBtn.setAttribute("id", calcButtons[button].name);
        newBtn.setAttribute("class", calcButtons[button].type);
        newBtn.textContent = calcButtons[button].symbol;

        buttonPanel.appendChild(newBtn);
    }
}

renderCalcButtons(calcButtons);