'use strict';

var value = 0;

var states = {
    "start": 0,
    "operand1": 1,
    "operator": 2,
    "operand2": 3,
    "complete": 4
};

var state = states.start;

var operand1 = 0;
var operand2 = 0;
var operation = null;

function calculate(operand1, operand2, operation) {
    var uri = location.origin + "/arithmetic";

    switch (operation) {
        case '+':
            uri += "/add";
            break;
        case '-':
            uri += "/subtract";
            break;
        case '*':
            uri += "/multiply";
            break;
        case '/':
            uri += "/divide";
            break;
        default:
            console.error('Invalid operation: ${operation}');
            setError();
            return;
    }

    /*
    uri += "&operand1=" + encodeURIComponent(operand1);
    uri += "&operand2=" + encodeURIComponent(operand2);
    */

    var payLoad = JSON.stringify({ a: operand1, b: operand2 })

    setLoading(true);

    var http = new XMLHttpRequest();
    http.open("POST", uri, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = function () {
        setLoading(false);

        if (http.status == 200) {
            var response = JSON.parse(http.responseText);
            updateValue(response.result);
        } else {
            setError();
        }
    };

    http.onerror = function () {
        setLoading(false);
        setError();
    };

    http.send(payLoad);
}

function clearPressed() {
    updateValue(0);

    operand1 = 0;
    operand2 = 0;
    operation = null;
    state = states.start;
}

function clearEntryPressed() {
    updateValue(0);
    state = (state == states.operand2) ? states.operator : states.start;
}

function numberPressed(n) {
    var value = getValue();

    if (state == states.start || state == states.complete) {
        value = n;
        state = (n == '0' ? states.start : states.operand1);
    } else if (state == states.operator) {
        value = n;
        state = (n == '0' ? states.operator : states.operand2);
    } else if (value.replace(/[-\.]/g, '').length < 8) {
        value += n;
    }

    value += "";

    updateValue(value);
}

function decimalPressed() {
    if (state == states.start || state == states.complete) {
        updateValue('0.');
        state = states.operand1;
    } else if (state == states.operator) {
        updateValue('0.');
        state = states.operand2;
    } else if (!getValue().toString().includes('.')) {
        updateValue(getValue() + '.');
    }
}

function signPressed() {
    var value = getValue();

    if (value != 0) {
        updateValue(-1 * value);
    }
}

function operationPressed(op) {
    operand1 = getValue();
    operation = op;
    state = states.operator;
}

function equalPressed() {
    if (state < states.operand2) {
        state = states.complete;
        return;
    }

    if (state == states.operand2) {
        operand2 = getValue();
        state = states.complete;
    } else if (state == states.complete) {
        operand1 = getValue();
    }

    calculate(operand1, operand2, operation);
}

document.addEventListener('keypress', (event) => {
    if (event.key.match(/^\d+$/)) {
        numberPressed(event.key);
    } else if (event.key == '.') {
        decimalPressed();
    } else if (event.key.match(/^[-*+/]$/)) {
        operationPressed(event.key);
    } else if (event.key == '=') {
        equalPressed();
    } else if (event.key === 'Escape') {
        clearPressed();
    } else if (event.key === 'Backspace') {
        clearEntryPressed();
    }
});

function getValue() {
    return value;
}

function updateValue(n) {
    value = n;
    var displayValue = value;

    if (displayValue > 99999999) {
        displayValue = displayValue.toExponential(4);
    } else if (displayValue < -99999999) {
        displayValue = displayValue.toExponential(4);
    } else if (displayValue > 0 && displayValue < 0.0000001) {
        displayValue = displayValue.toExponential(4);
    } else if (displayValue < 0 && displayValue > -0.0000001) {
        displayValue = displayValue.toExponential(3);
    }

    var chars = displayValue.toString().split("");
    var html = "";

    for (var c of chars) {
        if (c == '-') {
            html += "<span class=\"resultchar negative\">" + c + "</span>";
        } else if (c == '.') {
            html += "<span class=\"resultchar decimal\">" + c + "</span>";
        } else if (c == 'e') {
            html += "<span class=\"resultchar exponent\">e</span>";
        } else if (c != '+') {
            html += "<span class=\"resultchar digit" + c + "\">" + c + "</span>";
        }
    }

    document.getElementById("result").innerHTML = html;
}

function setError(n) {
    document.getElementById("result").innerHTML = "ERROR";
}

function setLoading(loading) {
    if (loading) {
        document.getElementById("loading").style.visibility = "visible";
    } else {
        document.getElementById("loading").style.visibility = "hidden";
    }

    var buttons = document.querySelectorAll("BUTTON");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = loading;
    }
}
