import React from 'react';
import uniqid from 'uniqid';

const OPERATORS = {
    ADD: {
        id: uniqid(),
        name: '+'
    },
    SUB: {
        id: uniqid(),
        name: '-'
    },
    MUL: {
        id: uniqid(),
        name: 'x'
    },
    DIV: {
        id: uniqid(),
        name: '/'
    },
    LEFT_PAR: {
        id: uniqid(),
        name: '('
    },
    RIGHT_PAR: {
        id: uniqid(),
        name: ')'
    }
};

const OperatorsManager = () => {

    return (
        <div>Operators List</div>
    )
}

export default OperatorsManager;

