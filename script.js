// Create functions for operations
let operand1 = 0;
let operand2 = 0;
let sign = "";

let expressionArray = [];
let currentValue = "";
let tempExpression = "";
let tempArray;
let answer = document.querySelector("#expressionResult");
let lastResult = 0;
// let result = 0;

let expression = document.querySelector("#expression");

function add(num1, num2) {
	return num1 + num2;
}
function subtract(num1, num2) {
	return num1 - num2;
}
function multiply(num1, num2) {
	return num1 * num2;
}
function divide(num1, num2) {
	return num1 / num2;
}

function operate(num1, operator, num2) {
	num1 = +num1;
	num2 = +num2;
	let result = 0;
	switch (operator) {
		case "+":
			result = add(num1, num2);

			break;
		case "-":
			result = subtract(num1, num2);
			break;

		case "*":
			result = multiply(num1, num2);
			break;

		case "/":
			result = divide(num1, num2);
			break;

		default:
			break;
	}
	return result;
}

function displayExpression() {
	if (!isNaN(currentValue) || currentValue === ".") {
		const lastElement = expressionArray[expressionArray.length - 1];

		if (typeof lastElement === "string" && !isNaN(lastElement)) {
			expressionArray[expressionArray.length - 1] += currentValue;
		} else {
			expressionArray.push(currentValue);
		}
	} else if (["+", "-", "*", "/"].includes(currentValue)) {
		// Replace the operator if the last element is also an operator
		if (
			typeof expressionArray[expressionArray.length - 1] === "string" &&
			isNaN(expressionArray[expressionArray.length - 1])
		) {
			expressionArray[expressionArray.length - 1] = currentValue;
		} else {
			expressionArray.push(currentValue);
		}
	}

	if (expressionArray.length == 3) {
		tempArray = expressionArray.slice();
	}

	if (expressionArray.length > 3) {
		if (
			currentValue == "+" ||
			currentValue == "-" ||
			currentValue == "/" ||
			currentValue == "*"
		) {
			expressionArray = [];
			expressionArray.push(lastResult);
			expressionArray.push(currentValue);
		} else {
			tempArray = expressionArray.slice();
			operate(tempArray[0], tempArray[1], tempArray[2]);
		}
	}

	expression.textContent = expressionArray.join("");
}

function displayAnswer() {
	ans = operate(tempArray[0], tempArray[1], tempArray[2]);
	lastResult = ans;
	if (ans % 1 === 0) {
		answer.textContent = ans;
	} else {
		answer.textContent = ans.toFixed(2);
	}
}

/**
 *
 * ADD EVENT LISTNERS TO BUTTONS
 */
let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
	button.addEventListener("click", (event) => {
		// currentValue = event.target.id;
		currentValue = button.id;

		switch (currentValue) {
			case "=":
				{
					expression.textContent = tempArray.join("");
					displayAnswer();
					tempArray = [];
				}

				break;
			case "clr":
				{
					expression.textContent = "";
					answer.textContent = "";
					expressionArray = [];
				}
				break;

			case "backSpaced":
				{
					// extract last digit, last substring
					expressionArray.pop();
					tempArray.pop();
					expression.textContent = tempArray.join("");
				}
				break;
			case "dot":
				// {
				// 	// get the last element and append dot and the next coming value to it
				// 	expressionArray[expressionArray.length - 1] =
				// 		expressionArray[expressionArray.length - 1] + ".";
				// 	tempArray[expressionArray.length - 1] =
				// 		tempArray[expressionArray.length - 1] + ".";
				// 	// append next coming value to the element that has a dot
				// 	expression.textContent = tempArray.join("");
				// }
				break;

			default:
				// expression.textContent = tempExpression;
				displayExpression();
				break;
		}
	});
});

// calculator pad event listener

// Function Calls

// console.log(operate(3, "+", 4));
// console.log(operate(3, "-", 4));
// console.log(operate(3, "*", 4));
// console.log(operate(3, "/", 3));
