import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Button, Divider } from 'semantic-ui-react';
import _ from 'lodash';
import uniqid from 'uniqid';

import ExpressionBuilder from './ExpressionBuilder';
import { CourseBasicInfoForm } from './CourseBasicInfoForm';

import { createCourse } from '../../actions';
import history from '../../history';

class CreateCourse extends React.Component {

    state = {
        currentStep: 0,
        name: '',
        description: '',
        year: null,
        components: []
    }

    maxStepNr;

    render() {

        const formStepNames = ["Basic Course Information", "Grade Components"];

        const { name, description, year } = this.state;

        const steps = {
            0: <CourseBasicInfoForm
                    name={name}
                    description={description}
                    year={year}
                    onChange={this.onChange}
                />,
            1: <ExpressionBuilder 
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

    onAddExpression = (expressionName, expression, type) => {
        const component = this.state.components.find(component => component.name === expressionName);
        if(!component) {
            const detail = expression.map(elem => elem.item).reduce((acc, curr) => `${acc} ${curr.name}`, '');
            const formula = expression.map(elem => elem.item).reduce((acc, curr) => curr.type === 'var' ? `${acc} :${curr.name}:` : `${acc} ${curr.name}`, '');
            const newComponent = {
                id: uniqid(),
                name: expressionName,
                detail,
                expression: formula,
                type
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
        const payload = this.sanitizeForSerialization();
        const response = await createCourse(payload, this.props.token);
        if(response.success) {
            history.push('/'); //todo redirect link to course view
        } else {
            //todo add errors panel
        }
    }

    sanitizeForSerialization = () => {
        const payload = _.omit(this.state, ["currentStep"]);
        let serverKeyMapping = { detail: 'expressionDisplay' };

        let componentServerMapper = component => _(component)
            .omit("id")
            .mapKeys((v, k) => serverKeyMapping[k] || k)
            .value();

        payload.components = this.state.components.map(componentServerMapper)
            .map((component, index) => ({ ...component, orderDisplay: index }));
        
        return payload;
    }
}

const mapStateToProps = state => {
    return {
        token: state.userInfo.token
    }
}

export default connect(mapStateToProps, null)(CreateCourse);