import React, { useReducer, useState } from 'react';
import CalculatorButton from '../components/calculator/button';
import styles from '../stylesheets/calculator/calculator.module.scss';
import CONSTANTS from '../utils/constants.json';
import isEmpty from '../utils/isEmpty';
import { MATEMATICAL_OPERATERS, WHITE_SPACE } from '../utils/regex';

function reducer(state, action) {
    switch (action.type) {
        case 'number':
            return {
                displayText: !isEmpty(state.infixString) || !isEmpty(state.displayText)
                    ? !Number.isNaN(Number(state.infixString[state.infixString.length - 1]))
                        ? `${state.displayText}${action.payload}`
                        : `${action.payload}`
                    : `${action.payload}`,
                infixString: `${state.infixString}${action.payload}`
            }

        case 'decimal':
            return {
                displayText: `${state.displayText}${action.payload}`,
                infixString: `${state.infixString}${action.payload}`
            }

        case 'clear':
            return { displayText: '', infixString: '' }

        case 'operator':
            return {
                ...state,
                infixString: `${state.infixString}${action.payload}`
            }

        case 'equal':
            const postFixEquation = convertInfixToPostfix(state.infixString);
            console.log('postFixEquation', postFixEquation)
            const output = solvePostfix(postFixEquation);
            return { ...state, displayText: output.toString(), }

        default:
            break;
    }
}

const convertInfixToPostfix = (infixString: string) => {
    let outputQueue = "";
    const operatorStack = [];
    const operators = {
        "^": {
            precedence: 4,
            associativity: "Right"
        },
        "/": {
            precedence: 3,
            associativity: "Left"
        },
        "*": {
            precedence: 3,
            associativity: "Left"
        },
        "+": {
            precedence: 2,
            associativity: "Left"
        },
        "-": {
            precedence: 2,
            associativity: "Left"
        }
    }
    infixString = infixString.replace(WHITE_SPACE, "");
    const _infixArray: Array<string> = infixString.split(MATEMATICAL_OPERATERS).filter(x => !isEmpty(x));
    const operator = '^*/+-';
    for (var i = 0; i < _infixArray.length; i++) {
        var token = _infixArray[i];
        if (!isNaN(parseFloat(token)) && isFinite(parseFloat(token))) {
            outputQueue += token + " ";
        } else if (operator.indexOf(token) !== -1) {
            var prevOperator = token;
            var nextOperator = operatorStack[operatorStack.length - 1];
            while (operator.indexOf(nextOperator) !== -1 &&
                ((operators[prevOperator].associativity === "Left"
                    && operators[prevOperator].precedence <= operators[nextOperator].precedence)
                    || (operators[prevOperator].associativity === "Right"
                        && operators[prevOperator].precedence < operators[nextOperator].precedence))) {
                outputQueue += operatorStack.pop() + " ";
                nextOperator = operatorStack[operatorStack.length - 1];
            }
            operatorStack.push(prevOperator);
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack[operatorStack.length - 1] !== "(") {
                outputQueue += operatorStack.pop() + " ";
            }
            operatorStack.pop();
        }
    }
    while (operatorStack.length > 0) {
        outputQueue += operatorStack.pop() + " ";
    }
    return outputQueue;
}

const solvePostfix = (postfix) => {
    const resultStack = [];
    postfix = postfix.split(" ");
    for (let i = 0; i < postfix.length; i++) {
        if (!isNaN(parseFloat(postfix[i])) && isFinite(parseFloat(postfix[i]))) {
            resultStack.push(parseFloat(postfix[i]));
        } else if (i < postfix.length - 1) {
            const a = resultStack.pop();
            const b = resultStack.pop();
            if (postfix[i] === "+") {
                resultStack.push(parseFloat(a) + parseFloat(b));
            } else if (postfix[i] === "-") {
                resultStack.push(parseFloat(b) - parseFloat(a));
            } else if (postfix[i] === "*") {
                resultStack.push(parseFloat(a) * parseFloat(b));
            } else if (postfix[i] === "/") {
                resultStack.push(parseFloat(b) / parseFloat(a));
            } else if (postfix[i] === "^") {
                resultStack.push(Math.pow(parseFloat(b), parseFloat(a)));
            }
        }
    }
    if (resultStack.length > 1) {
        return "error";
    } else {
        return resultStack;
    }
}

const Calculator = () => {
    const [state, dispatch] = useReducer(reducer, { displayText: '', infixString: '' })

    const onNumberClick = (value: string | number) => {
        const _localizedValue = value.toString().toLowerCase();
        if (_localizedValue === 'c') {
            dispatch({ type: 'clear', payload: '' });
        } else if (_localizedValue === '.') {
            if (!state.displayText.includes(_localizedValue)) {
                dispatch({ type: 'decimal', payload: _localizedValue });
            }
        } else {
            dispatch({ type: 'number', payload: _localizedValue });
        }
    }

    const onOperatorClick = (value: string) => {
        dispatch({ type: 'operator', payload: value });
    }

    const equalToClick = (value: string) => {
        // setDisplayText(`${displayText}${value}`);
    }

    const renderOperatorButtons = () => {
        return CONSTANTS.OPERATORS.map((operator: string) => <CalculatorButton value={operator} onClick={onOperatorClick} />);
    }

    const renderNumberPadButtons = () => {
        return [')', 7, 8, 9, '^', 4, 5, 6, '-', 1, 2, 3, '00', 0, '.', 'C'].map((number: string | number) => <CalculatorButton value={number} onClick={onNumberClick} />);
    }

    return (
        <>
            <div className={styles.calculatorContainer}>
                <div className={styles.display}>
                    {state.displayText}
                </div>
                <div className={styles.operators}>
                    {renderOperatorButtons()}
                </div>
                <div className={styles.numberPad}>
                    {renderNumberPadButtons()}
                </div>
                <div className={styles.enter}>
                    <CalculatorButton value={'='} onClick={() => dispatch({ type: 'equal', payload: '' })} />
                </div>
            </div>
        </>
    )
}

export default Calculator
