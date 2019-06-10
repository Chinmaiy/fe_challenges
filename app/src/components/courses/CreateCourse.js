import React from 'react';
import { Container, Header, Button, Divider } from 'semantic-ui-react';

import { EditableItemList } from '../generics';

class CreateCourse extends React.Component {

    state = {
        currentStep: 1,
        courseName: '',
        courseComponents: []
    }

    render() {

        const formStepNames = ["Basic Info", "Basic Components"];

        return (
            
            <Container>
                <Header 
                    as="h1"
                    color="teal"
                    icon="settings" 
                    content={`Create Course - ${formStepNames[this.state.currentStep]}`}
                />
                <EditableItemList 
                    items={this.state.courseComponents} 
                    placeholder="Component Name"
                    onAddItem={this.onAddItem}
                    onDeleteItem={this.onDeleteItem}
                />

                <Divider/>

                <Container fluid >
                    <Button color="teal">Back</Button>
                    <Button color="teal" floated="right">Next</Button>
                </Container>
            </Container>
        );
    }

    onAddItem = (itemName) => {
        const course = this.state.courseComponents.find(course => course.name === itemName);
        if(!course) {
            this.setState({
                courseComponents: [ ...this.state.courseComponents, { name: itemName } ]
            });
        }
    }

    onDeleteItem = (itemName) => {
        this.setState({
            courseComponents: this.state.courseComponents.filter(course => course.name !== itemName)
        });
    }
}

export default CreateCourse;