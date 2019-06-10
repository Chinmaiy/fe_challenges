import React, { useState } from 'react';
import { Input, Button, Label, Popup, List } from 'semantic-ui-react';

export const FlexColumnContainer = ({ children }) => {

    return (
        <div className="flex-column-container">
            {children}
        </div>
    );
}

export const AddableItem = ({ placeholder = '', onAddItem }) => {

    const [ inputValue, setInputValue ] = useState('');

    const addBtn = <Button color="teal" content='Add' onClick={() => { onAddItem(inputValue); setInputValue(''); }}/>;

    return (
        <Input
            action={addBtn}
            placeholder={placeholder}
            value={inputValue}
            size="big"
            onChange={({ target }) => setInputValue(target.value)}
        />
    );
};

export const DeleteableItem = ({ name, detail, onDeleteItem }) => {

    let labelNode = <Label
                        color="teal"
                        content={name}
                        onRemove={() => onDeleteItem(name)}
                        size="big"
                    />
    
    if(detail) {
        labelNode = <Popup content={detail} trigger={labelNode} />;
    }

    return labelNode;
};

export const EditableItemList = ({ items=[], placeholder = '', onAddItem, onDeleteItem }) => {

    return (
        <FlexColumnContainer>
            <AddableItem placeholder={placeholder} onAddItem={onAddItem}/>
            <List>
                {items.map(item => 
                    <List.Item key={item.name}>
                        <DeleteableItem name={item.name} detail={item.detail} onDeleteItem={onDeleteItem}/>
                    </List.Item>
                )}
            </List>
        </FlexColumnContainer>
    );
}