import React from 'react';
import { Container, Header, Button, Divider, Input, Label } from 'semantic-ui-react';
import _ from 'lodash';
import uniqid from 'uniqid';

import { EditableItemList, FlexColumnContainer } from '../generics';
import ExpressionBuilder from './ExpressionBuilder';

import history from '../../history';

const CourseBasicInfoForm = ({ onChange }) => {

    return (
        <FlexColumnContainer fluid>

            <Input 
                placeholder="Course Name"
                size="big"
                name="courseName"
                onChange={onChange}
            />

        </FlexColumnContainer>
    );
}

class CreateCourse extends React.Component {

    state = {
        currentStep: 2,
        courseName: '',
        courseYear: null,
        courseComponents: [
            {
                id: uniqid(),
                name: 'Component 1'
            },
            {
                id: uniqid(),
                name: 'Component 2',
                detail: 'Component 1 + 1'
            }
        ]
    }

    maxStepNr;

    render() {

        const formStepNames = ["Basic Course Information", "Basic Components", "Grade Components"];

        const steps = {
            0: <CourseBasicInfoForm
                    onChange={this.onChange}
                />,
            1:  <EditableItemList 
                    items={this.state.courseComponents} 
                    placeholder="Component Name"
                    onAddItem={this.onAddItem}
                    onDeleteItem={this.onDeleteItem}
                    onClickItem={this.onClickItem}
                />,
            2: <ExpressionBuilder 
                    namePlaceholder="Component Name"
                    variables={this.state.courseComponents}
                    onDeleteItem={this.onDeleteItem}
                    onClickItem={this.onClickItem}
                />
        };

        this.maxStepNr = _.max(Object.keys(steps).map(key => parseInt(key)));

        return (
            
            <Container>
                <Header 
                    as="h1"
                    color="teal"
                    icon="settings" 
                    content={`Create Course - ${formStepNames[this.state.currentStep]}`}
                />

                {steps[this.state.currentStep]}               

                <Divider/>

                {this.renderNavigationButtons()}
            </Container>
        );
    }

    onChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onAddItem = (item) => {
        const course = this.state.courseComponents.find(course => course.id === item.id);
        if(!course) {
            this.setState({
                courseComponents: [ ...this.state.courseComponents, { ...item, id: uniqid() } ]
            });
        }
    }

    onDeleteItem = ({ id }) => {
        this.setState({
            courseComponents: this.state.courseComponents.filter(course => course.id !== id)
        });
    }

    onClickItem = (item) => {
        console.log(item);
    }

    renderNavigationButtons = () => {

        return (
            <Container fluid>
                { this.state.currentStep > 0 ? <Button color="teal" onClick={() => this.setState({ currentStep: this.state.currentStep - 1})}>Back</Button> : null }

                { 
                    this.state.currentStep === this.maxStepNr ? 
                    <Button color="teal" floated="right" onClick={this.onSaveBtnClick}>Save</Button> :
                    <Button color="teal" floated="right" onClick={() => this.setState({ currentStep: this.state.currentStep + 1 })}>Next</Button>
                }
               
            </Container>
        );
    }

    onSaveBtnClick = () => {
        history.push("/courses/create"); //todo navigate to newly created course
    }
}

export default CreateCourse;