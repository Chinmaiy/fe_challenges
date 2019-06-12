import React, { useState } from 'react';
import { Input, Button, Label, Popup, List, Icon } from 'semantic-ui-react';

export const FlexColumnContainer = ({ children }) => {

    return (
        <div className="flex-column-container">
            {children}
        </div>
    );
}

export const AddableItem = ({ placeholder = '', onAddItem, ...rest }) => {

    const [ inputValue, setInputValue ] = useState('');

    const addBtn = <Button color="teal" content='Add' onClick={() => { onAddItem({ name: inputValue }); setInputValue(''); }}/>;

    return (
        <Input
            action={addBtn}
            placeholder={placeholder}
            value={inputValue}
            size="big"
            fluid
            onChange={({ target }) => setInputValue(target.value)}
            {...rest}
        />
    );
};

export const DeleteableItem = ({ item, onDeleteItem, onClickItem }) => {

    const { name, detail } = item;

    let itemProps = {
        'color': 'teal',
        'size': 'big'
    };

    if(onClickItem) {
        itemProps['onClick'] = () => onClickItem(item);
    }

    let labelNode = <Label
                        {...itemProps}
                    >
                        {name}
                        <Icon 
                            name="delete" onClick={ (event) => { event.stopPropagation(); onDeleteItem(item)} }
                        />
                    </Label>
    
    if(detail) {
        labelNode = <Popup content={detail} trigger={labelNode} />;
    }

    return labelNode;
};

export const DeleteableItemList = ({ items, horizontal = false, nested = false, ...rest }) => {

    return (
        <List horizontal={horizontal}>
            {items.map(item => 
                <List.Item key={item.id}>
                    <DeleteableItem item={nested ? item.item : item} { ...rest }/>
                </List.Item>
            )}
        </List>
    );
}

export const EditableItemList = ({ items=[], placeholder = '', onAddItem, onDeleteItem, onClickItem }) => {

    return (
        <FlexColumnContainer>
            <AddableItem placeholder={placeholder} onAddItem={onAddItem}/>
            <DeleteableItemList items={items} onDeleteItem={onDeleteItem} onClickItem={onClickItem}/>
        </FlexColumnContainer>
    );
}