import React from 'react';
import { Grid, GridRow, Button, GridColumn } from 'semantic-ui-react';

import uniqid from 'uniqid';
import _ from 'lodash';

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

const Operator = ({ operator, onClick }) => {
    return (
        <GridColumn>
            <Button color="teal" content={operator.name} onClick={() => onClick(operator)}/>
        </GridColumn>
    );
};

const OperatorsManager = ({ onOperatorClick }) => {

    const COLS_NR = 3; 

    const operators = Object.keys(OPERATORS)
        .map(key => OPERATORS[key])
        .map(operator => <Operator key={operator.id} operator={operator} onClick={onOperatorClick}/>);

    const ROWS_NR = operators.length / COLS_NR;

    return (
        <Grid celled columns="3" textAlign="center">

            {
                _.range(0, ROWS_NR)
                    .map(rowNr => 
                        <GridRow key={rowNr}>
                            {
                                _.range(0, COLS_NR)
                                    .map(colNr => {
                                        const idx = rowNr * COLS_NR + colNr;
                                        if(operators[idx])
                                            return operators[idx]
                                        else
                                            return <GridColumn />
                                    })
                            }
                        </GridRow>)
            }
        </Grid>
    );
}

export default OperatorsManager;

