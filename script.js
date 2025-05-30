const buttonPanel = document.querySelector("#button-panel");
const calculationDisplay = document.querySelector("#calculation-display");
const entryDisplay = document.querySelector("#entry-display");

const operatorMap = {
    add: '+',
    subtract: '-',
    multiply: '*',
    divide: '/',
    equals: '='
};


class CalcButton {
    constructor(name, symbol, type) {
        this.name = name;
        this.symbol = symbol;
        this.type = type;
        this.enter = () => handleButtonEntry(name, type); // Event listener for each button gets attached here
    }
}

class Calculation {
    #active;
    #chain;
    #result;
    #display;

    constructor() {
        this.active = true;
        this.chain = [];
        this.result = undefined;
        this.display = "";
    }

    // Active flag
    get active() {
        return this.#active;
    }

    set active(bool) {
        if (typeof bool != "boolean") {
            throw new Error(`Error: Calculation.active type must be boolean`)
        }
        this.#active = bool;
    }

    // Calculation chain
    clearChain() {
        this.#chain = [];
    }

    appendToChain(entryObj) {
        if (typeof entryObj !== CalcEntry) {
            throw new Error(`Invalid calculation chain item: type must be CalcEntry object`);
        }

        this.#chain.push(entryObj);

        if (entryObj.operator() == "equals") {
            this.calculateResult();
        }
    }

    // Calculation result

    calculateResult() {
        let expression = '';

        for (const obj of this.chain) {
            expression += obj.value();

            const opWord = obj.operator?.();
            if (opWord) {
                const opSymbol = operatorMap[opWord];
                if (!opSymbol) throw new Error(`Unknown operator: ${opWord}`);
                expression += ` ${opSymbol} `;
            }
        }

        try {
            const result = Function(`"use strict"; return (${expression})`)();
            return result;
        } catch (err) {
            throw new Error(`Failed to evaluate expression: "${expression}"`);
        }
    }

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
        this.buffer = []
        this.mode = "new";
        this.updateEntryDisplay();
    }

    // Active flag
    get active() {
        return this.#active;
    }

    set active(bool) {
        if (typeof bool != "boolean") {
            throw new Error(`Error: CalcEntry.active type must be boolean`)
        }
        this.#active = bool;
    }

    // Value
    get value() {
        return this.#value;
    }

    set value(val) {
        if (typeof val != "number") {
            throw new Error(`Error: CalcEntry.value type must be number`)
        }
        this.#value = val;
    }

    // Display string
    get display() {
        return this.#display;
    }

    set display(str) {
        if (typeof str != "string") {
            throw new Error(`Error: CalcEntry.string type must be number`)
        }        
    }

    updateEntryDisplay() {
        entryDisplay.textContent = this.#value;
    }

    // Buffer
    appendToBuffer(char) {
        if (typeof char !== 'string' || !/^[-.\d]$/.test(char)) {
            throw new Error(`Invalid character: ${char}`);
        }

        if (char === '.' && this.#buffer.includes('.')) return;

        this.#buffer.push(char);
    }

    clearBuffer() {
        this.#buffer = [];
    }

    getBufferAsString() {
        return this.#buffer.join('');
    }

    getBufferAsNumber() {
        return Number(this.getBufferAsString());
    }

    negateBuffer() {
        if (this.#buffer[0] == "-") {
            this.#buffer.shift();
        } else {
            this.#buffer.unshift("-");
        }
    }

    set buffer(newVal) {
        const allowed = new Set(['0','1','2','3','4','5','6','7','8','9','-','.']);
    
        let chars;

        if (typeof newVal === 'number' || typeof newVal === 'string') {
            chars = newVal.toString().split('');
        } else if (Array.isArray(newVal)) {
            chars = [...newVal.map(String)];
        } else {
            throw new Error("Buffer must be a string, number, or array");
        }

        this.#buffer = chars.filter(char => allowed.has(char));
    }

    get buffer() {
        return [...this.#buffer]; // Safe clone
    }

    // Mode
    get mode() {
        return this.#mode;
    }

    set mode(val) {
        if (!CalcEntry.allowedModes.includes(val)) {
            throw new Error(`Invalid mode: ${value}. Allowed values are: ${MyObject.allowedModes.join(', ')}`)
        }
        this.#mode = this.#value;
    }

    // Operator
    get operator() {
        return this.#operator;
    }

    set operator(val) {
        if (!CalcEntry.allowedOperators.includes(val)) {
            throw new Error(`Invalid operator: ${value}. Allowed values are: ${MyObject.allowedOperators.join(', ')}`)
        }
        this.#operator = this.#value;
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

function renderDisplay(currentEntry, currentCalculation = null) {
    if (currentEntry.value !== 0 && 
        !currentEntry.value) {
        throw new Error(`ERROR: RenderDisplay(): Must be given a valid currentEntry value`) // Not allowed: throw error for tracking
    } else {
        entryDisplay.textContent = currentEntry.value;
    }

    if (!currentCalculation || 
        currentCalculation.value !== 0 && 
        !currentCalculation.value) {
        console.log("RenderDisplay(): no calculation value provided, skipping...") // Always no calculation value at startup: allowed but logged
    } else {
        calculationDisplay.textContent = currentCalculation.value;
    }
}

function handleButtonEntry(buttonName, buttonType) {
    console.log(`Button name: ${buttonName}\nButton type: ${buttonType}`);

    switch(buttonType) {
        case "operand":
            handleOperand();
        case "modifier":
            handleModifier();
        case "operator":
            handleOperator();
        case "control":
            handleControl();
    }
}

function handleOperand() {
    return;
}

function handleModifier() {
    return;
}

function handleOperator() {
    return;
}

function handleControl() {
    return;
}

function initCalculator() {
    buttonPanel.innerHTML = "";
    let currentEntry = new CalcEntry(0);
    renderCalcButtons(calcButtons);
    renderDisplay(currentEntry);
};

initCalculator();