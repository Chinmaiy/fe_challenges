import React from 'react';
import { Input, Select, Divider } from 'semantic-ui-react';
import { FlexColumnContainer } from '../generics';

export const CourseBasicInfoForm = ({ onChange, ...props }) => {

    //todo - should get these from the server and passed in as props
    const yearOptions = [
        { key: "year1", value: 1, text: "1" },
        { key: "year2", value: 2, text: "2" },
        { key: "year3", value: 3, text: "3" },
    ]

    return (
        <FlexColumnContainer fluid>

            <Input 
                value={props.name}
                placeholder="Name"
                size="big"
                name="name"
                onChange={onChange}
            />

            <Divider />

            <Input 
                value={props.description}
                placeholder="Description"
                size="big"
                name="description"
                onChange={onChange}
            />

            <Divider />

            <Select 
                value={props.year}
                placeholder="Year"
                name="year"
                options={yearOptions}
                onChange={onChange}
            />

        </FlexColumnContainer>
    );
}