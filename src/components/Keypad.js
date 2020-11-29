import React from 'react';

const Keypad = props => {

    const KEYS = [
        {
            text: 'AC',
            classes: 'Wide',
            id: 'clearAll'
        },
        {
            text: 'C',
            id: 'clear'
        },
        {
            text: '÷',
            classes: 'ArithmeticOperator',
            id: 'divide'
        },
        {
            text: '7',
            id: 'seven'
        },
        {
            text: '8',
            id: 'eight'
        },
        {
            text: '9',
            id: 'nine'
        },
        {
            text: 'x',
            classes: 'ArithmeticOperator',
            id: 'multiply'
        },
        {
            text: '4',
            id: 'four'
        },
        {
            text: '5',
            id: 'five'
        },
        {
            text: '6',
            id: 'six'
        },
        {
            text: '-',
            classes: 'ArithmeticOperator',
            id: 'subtract'
        },
        {
            text: '1',
            id: 'one'
        },
        {
            text: '2',
            id: 'two'
        },
        {
            text: '3',
            id: 'three'
        },
        {
            text: '+',
            classes: 'ArithmeticOperator',
            id: 'add'
        },
        {
            text: '0',
            classes: 'Wide',
            id: 'zero'
        },
        {
            text: '.',
            id: 'point'
        },
        {
            text: '=',
            id: 'equal'
        }
    ];

    return (
        <div id="Keypad">
            {KEYS.map(key => (
                <div 
                    key={key.id}
                    id={key.id}    
                    className={key.classes !== undefined ? 'Key '+ key.classes : 'Key'}
                    onClick={() => props.hadnleInput(key.id)}
                >
                    <span>{key.text}</span>
                </div>
            ))}
        </div>
    );
}

export default Keypad;