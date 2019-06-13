import React from 'react';
import uniqid from 'uniqid';
import { Segment, Grid, GridRow, Button, GridColumn } from 'semantic-ui-react';

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

const Operator = ({ name }) => {
    return (
        <GridColumn>
            <Button color="teal" content={name}/>
        </GridColumn>
    );
};

const OperatorsManager = () => {

    const operators = Object.keys(OPERATORS)
        .map(key => OPERATORS[key].name)
        .map(name => <Operator name={name}/>);

    return (
        <Grid celled columns="3" textAlign="center">
            <GridRow>
                {operators[0]}
                {operators[1]}
                {operators[2]}
            </GridRow>
            <GridRow>
                {operators[3]}
                {operators[4]}
                <GridColumn>

                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default OperatorsManager;

