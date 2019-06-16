import React from 'react';
import { Container, Header, Button, Divider, Input, Select } from 'semantic-ui-react';
import _ from 'lodash';
import uniqid from 'uniqid';

import { EditableItemList, FlexColumnContainer } from '../generics';
import ExpressionBuilder from './ExpressionBuilder';

import { createCourse } from '../../actions';

import history from '../../history';

const CourseBasicInfoForm = ({ onChange, ...props }) => {

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

class CreateCourse extends React.Component {

    state = {
        currentStep: 0,
        name: '',
        description: '',
        year: null,
        components: [
            {
                id: uniqid(),
                name: 'Component 1'
            },
            {
                id: uniqid(),
                name: 'Component 2',
                detail: 'Component 1 + 1',
                expressionType: 'NUMERIC',
                expression: ':Component 1: + 1'
            }
        ]
    }

    maxStepNr;

    render() {

        const formStepNames = ["Basic Course Information", "Basic Components", "Grade Components"];

        const { name, description, year } = this.state;

        const steps = {
            0: <CourseBasicInfoForm
                    name={name}
                    description={description}
                    year={year}
                    onChange={this.onChange}
                />,
            1:  <EditableItemList 
                    items={this.state.components} 
                    placeholder="Component Name"
                    onAddItem={this.onAddItem}
                    onDeleteItem={this.onDeleteItem}
                    onClickItem={this.onClickItem}
                />,
            2: <ExpressionBuilder 
                    expressionNamePlaceholder="Component Name"
                    variablesHeader="Created Components:"
                    variables={this.state.components}
                    onDeleteVariable={this.onDeleteItem}
                    onAddExpression={this.onAddExpression}
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

                {/*display errors */}

                {steps[this.state.currentStep]}               

                <Divider/>

                {this.renderNavigationButtons()}
            </Container>
        );
    }

    onChange = (event, props) => {
        const { name, value } = props;
        this.setState({
            [name]: value
        });
    }

    onAddItem = (item) => {
        const component = this.state.components.find(component => component.name === item.name);
        if(!component) {
            this.setState({
                components: [ ...this.state.components, { ...item, id: uniqid() } ]
            });
        }
    }

    onDeleteItem = ({ id }) => {
        this.setState({
            components: this.state.components.filter(component => component.id !== id)
        });
    }

    onAddExpression = (expressionName, expression) => {
        const component = this.state.components.find(component => component.name === expressionName);
        if(!component) {
            const detail = expression.map(elem => elem.item).reduce((acc, curr) => `${acc} ${curr.name}`, '');
            const formula = expression.map(elem => elem.item).reduce((acc, curr) => curr.type === 'var' ? `${acc} :${curr.name}:` : `${acc} ${curr.name}`, '');
            const newComponent = {
                id: uniqid(),
                name: expressionName,
                detail,
                expression: formula
            };
            this.setState({
                components: [ ...this.state.components, newComponent ]
            });
        }
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

    onSaveBtnClick = async () => {
        const response = await createCourse(this.state)
        console.log(response);
    }
}

export default CreateCourse;