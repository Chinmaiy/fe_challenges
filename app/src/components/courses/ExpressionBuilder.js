import React, { useState } from 'react';
import { Segment, Icon, Divider } from 'semantic-ui-react';
import uniqid from 'uniqid';
import { AddableItem, DeleteableItemList } from '../generics';

//variables = [ { id: ..., name: ..., detail: ... } ] //details will be displayed as tooltip if present

const Operations = () => {

    return (
        <div>Operations List</div>
    );
};

const ExpressionBuilder = ({ namePlaceholder, variables, onAddExpression, onDeleteItem }) => {

    const [ expression, setExpression ] = useState([]);


    return (
        <Segment.Group>
            <Segment>
                <AddableItem placeholder={namePlaceholder}/>
            </Segment>
            <Segment>
                <DeleteableItemList horizontal nested items={expression} />
            </Segment>
            <Segment.Group horizontal>
                <Segment>
                    <DeleteableItemList items={variables} />
                </Segment>
                <Segment>
                    <Operations />
                    <Divider />
                    <AddableItem type="number" placeholder="Constant Value"  />
                </Segment>
            </Segment.Group>
        </Segment.Group>
    );
}

export default ExpressionBuilder;