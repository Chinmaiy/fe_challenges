import React, { useState } from 'react';
import { Input, Button, Label, Popup, List, Icon } from 'semantic-ui-react';

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

export const DeleteableItem = ({ name, detail, onDeleteItem, onClickItem }) => {

    let itemProps = {
        'color': 'teal',
        'size': 'big'
    };

    if(onClickItem) {
        itemProps['onClick'] = () => onClickItem(name);
    }

    let labelNode = <Label
                        {...itemProps}
                    >
                        {name}
                        <Icon 
                            name="delete" onClick={ (event) => { event.stopPropagation(); onDeleteItem(name)} }
                        />
                    </Label>
    
    if(detail) {
        labelNode = <Popup content={detail} trigger={labelNode} />;
    }

    return labelNode;
};

export const EditableItemList = ({ items=[], placeholder = '', onAddItem, onDeleteItem, onClickItem }) => {

    return (
        <FlexColumnContainer>
            <AddableItem placeholder={placeholder} onAddItem={onAddItem}/>
            <List>
                {items.map(item => 
                    <List.Item key={item.name}>
                        <DeleteableItem name={item.name} detail={item.detail} onDeleteItem={onDeleteItem} onClickItem={onClickItem} />
                    </List.Item>
                )}
            </List>
        </FlexColumnContainer>
    );
}