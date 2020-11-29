import React, {Component} from 'react';

import Display from '../../components/Display';

import './Calculator.css';
import Keypad from '../../components/Keypad';

class Calculator extends Component {
    // TODO: Make calculator available in both calculator input logic schools
    // 1) Immediate Execution Logic (Default and current)
    // 2) Formula/Expression Logic

// TODO: Set a max value for the output
    state = {
        output: '0',
        operation: '0',
        lastInput: '',
        operator: ''
    };

    initialState = {...this.state};

    KEY_MAPPING = {
        '0': 'zero',
        '1': 'one',
        '2': 'two',
        '3': 'three',
        '4': 'four',
        '5': 'five',
        '6': 'six',
        '7': 'seven',
        '8': 'eight',
        '9': 'nine',
        '*': 'multiply',
        '+': 'add',
        '-': 'subtract',
        '/': 'divide',
        ',': 'point',
        '.': 'point',
        Backspace: 'clear',
        Delete: 'clear',
        clearAll: 'clearAll',
        'Enter': 'equal'
    }

    flashKey = id => {

        let key = document.getElementById(id);

        key.classList.add('KeyFlash');
        window.setTimeout(() => {
            key.classList.remove('KeyFlash');
        }, 100);

    }


    calculate = (type, num1, num2) => {

        let result = undefined;
        switch(type) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
        }

        return result;
    }

    handleInput = inputId => {

        this.flashKey(inputId);

        const KEY_MAPPING_REVERSED = {};
        for(let key in this.KEY_MAPPING) {
            KEY_MAPPING_REVERSED[this.KEY_MAPPING[key]] = key;
        }

        if(
            !isNaN(KEY_MAPPING_REVERSED[inputId]) ||
            (
                inputId === 'point' &&
                !this.state.output.includes('.')
            )
        ) {

            let output = this.state.output;
            let operation = this.state.operation;

            if(isNaN(this.state.operation.slice(-1))) {
                output = KEY_MAPPING_REVERSED[inputId];
                operation = operation.concat(KEY_MAPPING_REVERSED[inputId]);
            } else if(this.state.operation === '0'){
                operation = KEY_MAPPING_REVERSED[inputId];
                output = KEY_MAPPING_REVERSED[inputId];
            } else {
                output = output.concat(KEY_MAPPING_REVERSED[inputId]);
                operation = operation.concat(KEY_MAPPING_REVERSED[inputId]);
            }

            this.setState({
                output: output,
                operation: operation
            })

        } else if(
            inputId === 'clear' &&
            this.state.output.length > 0
        ) {

            let operation = this.state.operation;
            if(operation.slice(-1) !== '=') {
                operation = operation.slice(0, -1);
            }

            let output = this.state.output.slice(0, -1);

            this.setState({
                output: output,
                operation: operation
            })

        } else if(inputId === 'clearAll') {

            this.setState({
                ...this.initialState
            })

        } else if(
            inputId === 'add' ||
            inputId === 'subtract' ||
            inputId === 'multiply' ||
            inputId === 'divide'
        ) {
            let operation = this.state.operation;

            if(isNaN(operation.slice(-1))) {

                this.setState({
                    operation: operation.slice(0, -1).concat(KEY_MAPPING_REVERSED[inputId]),
                    operator: inputId
                })            

                if(operation.slice(-1) === '=') {
                    this.setState({
                        lastInput: this.state.output
                    })
                }

            } else {

                let lastInput = parseFloat(this.state.lastInput);
                let operation = this.state.operation;

                if(
                    !isNaN(lastInput) &&
                    operation.match(/\+|-|\/|\*/) !== null
                ) {
                    let num1 = lastInput;
                    let num2 = parseFloat(this.state.output);
                    if(
                        !isNaN(num2) &&
                        this.state.operator !== ''
                    ) {
                        let result = this.calculate(this.state.operator, num1, num2).toString();

                        this.setState({
                            lastInput: result,
                            output: result,
                            operation: operation.concat(KEY_MAPPING_REVERSED[inputId]),
                            operator: inputId
                        })
                    } else {
                        this.setState({
                            operation: operation.concat(KEY_MAPPING_REVERSED[inputId]),
                        })
                    }

                } else {
                    this.setState({
                        lastInput: this.state.output,
                        operation: this.state.operation.concat(KEY_MAPPING_REVERSED[inputId]),
                        operator: inputId
                    })
                }     

            }

        } else if(inputId === 'equal') {
            let num1 = parseFloat(this.state.lastInput);
            let num2 = parseFloat(this.state.output);
            // Show result in case of inappropriate output
            if(
                !isNaN(num1) && 
                !isNaN(num2) &&
                this.state.operator !== '' &&
                !isNaN(this.state.operation.slice(-1))
            ) {
                let result = this.calculate(this.state.operator, num1, num2).toString();
                this.setState({
                    lastInput: result,
                    output: result,
                    operator: '',
                    operation: this.state.operation.concat('=')
                })
            }
        }



    }

    componentDidMount() {

        document.addEventListener('keydown', clickedKey => {

            if(
                (clickedKey.ctrlKey && clickedKey.key === 'Backspace') ||
                (clickedKey.ctrlKey && clickedKey.key === 'Delete')
            ) {

                this.handleInput('clearAll');

            } else if(this.KEY_MAPPING.hasOwnProperty(clickedKey.key)){

                this.handleInput(this.KEY_MAPPING[clickedKey.key]);
            }

        })

    }

    render() {
        return (
            <div id="Calculator">
                <Display 
                    output={this.state.output} 
                    operation={this.state.operation}
                />
                <Keypad hadnleInput={this.handleInput} />
            </div>
        );
    }

}

export default Calculator;