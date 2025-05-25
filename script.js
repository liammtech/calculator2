class calcButton {
    constructor(name, symbol, type) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
    }
}

let calcButtons = [
    // Row 1
    calcButton("percentage", "%", "modifier"),
    calcButton("clear-entry", "CE", "control"),
    calcButton("clear-all", "C", "control"),
    calcButton("backspace", "⌫", "control"),

    // Row 2
    calcButton("reciprocal", "1/x", "modifier"),
    calcButton("square", "x²", "modifier"),
    calcButton("square-root", "√x", "modifier"),
    calcButton("divide", "÷", "operator"),

    // Row 3
    calcButton("seven", "7", "operand"),
    calcButton("eight", "8", "operand"),
    calcButton("nine", "9", "operand"),
    calcButton("multiply", "×", "operator"),

    // Row 4
    calcButton("four", "4", "operand"),
    calcButton("five", "5", "operand"),
    calcButton("six", "6", "operand"),
    calcButton("subtract", "-", "operator"),

    // Row 5
    calcButton("one", "1", "operand"),
    calcButton("two", "2", "operand"),
    calcButton("three", "3", "operand"),
    calcButton("add", "+", "operator"),

    // Row 6
    calcButton("toggle-parity", "+/-", "operand"),
    calcButton("zero", "0", "operand"),
    calcButton("decimal-point", ".", "operand"),
    calcButton("equals", "=", "operator"),
]

function renderCalcButtons(buttons) {
    for (button in buttons) {
        document.createElement("button")
    }
}