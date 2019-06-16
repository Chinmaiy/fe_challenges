import React, { useState } from 'react';
import { Segment, Divider, Header, Select } from 'semantic-ui-react';
import uniqid from 'uniqid';
import { AddableItem, DeleteableItemList, FlexColumnContainer } from '../generics';
import OperatorsManager from './OperatorsManager';

//variables = [ { id: ..., name: ..., detail: ... } ] //details will be displayed as tooltip if present
//expression = [ { id: ..., item: {...} }]

const typeOptions = [
    { key: 'typeNr', value: 'NUMERIC', text: 'Numeric' },
    { key: 'typeBool', value: 'BOOLEAN', text: 'Condition'}
]

const ExpressionBuilder = ({ expressionNamePlaceholder, variablesHeader, variables, onAddExpression, onDeleteVariable }) => {

    const [ expression, setExpression ] = useState([]);
    const [ type, setType ] = useState("NUMERIC");

    const internalOnAddExpression = item => {
        onAddExpression(item.name, expression, type);
        setExpression([]);
    }

    const onDeleteExpressionElem = item => setExpression(expression.filter(elem => elem.id !== item.id));

    const internalOnDeleteVariable = variable => {
        setExpression(expression.filter(elem => elem.item.id !== variable.id));
        onDeleteVariable(variable);
    };

    const onClickVariable = variable => setExpression([ ...expression, { id: uniqid(), item: { ...variable, type: 'var' } }]);

    const onOperatorClick = operator => setExpression([ ...expression, { id: uniqid(), item: { ...operator, type: 'op' } }]);

    const onAddConstantValue = constant => setExpression([ ...expression, { id: uniqid(), item: { ...constant, type: 'const' }}]);

    return (
        <Segment.Group>
            <Segment padded>
                <AddableItem placeholder={expressionNamePlaceholder} onAddItem={internalOnAddExpression}/>
                <Divider />
                <Select
                    options={typeOptions}
                    defaultValue='NUMERIC'
                    onChange={(event, props) => setType(props.value)}
                />
            </Segment>
            <Segment padded>
                <Header color="teal" as="h3">Formula:</Header>
                <DeleteableItemList horizontal nested items={expression} onDeleteItem={onDeleteExpressionElem}/>
            </Segment>
            <Segment.Group horizontal>
                <Segment padded="very">
                    <Header color="teal" as="h3">{variablesHeader}</Header>
                    <DeleteableItemList items={variables} onDeleteItem={internalOnDeleteVariable} onClickItem={onClickVariable}/>
                </Segment>
                <Segment padded="very">
                    <Header color="teal" as="h3">Operators:</Header>
                    <FlexColumnContainer verticalCenter>
                        <OperatorsManager onOperatorClick={onOperatorClick}/>
                        <Divider />
                        <AddableItem type="number" placeholder="Number" onAddItem={onAddConstantValue}/>
                    </FlexColumnContainer>
                </Segment>
            </Segment.Group>
        </Segment.Group>
    );
}

export default ExpressionBuilder;