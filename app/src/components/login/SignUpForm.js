import React from 'react';

import { Form, Input, Message } from 'semantic-ui-react';

class SignUpForm extends React.Component {

    state = {
        name: '',
        username: '',
        email: '',
        password: ''
    };

    onInputChange = ({value, name}) => {
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <Form error size="big" onSubmit={this.onSubmit}>

                {
                    renderError(this.props.error)
                }

                <Form.Field 
                    control={this.renderFormField}
                    name="name"
                    icon="id card"
                    placeholder="Name"
                    type="text"/>

                <Form.Field
                    control={this.renderFormField}
                    name="username" 
                    icon="user"
                    placeholder="Username"
                    type="text"/>

                <Form.Field
                    control={this.renderFormField}
                    name="email" 
                    icon="mail"
                    placeholder="Email"
                    type="email"/>

                <Form.Field
                    control={this.renderFormField}
                    name="password" 
                    icon="lock"
                    placeholder="Password"
                    type="password"/>

                <Form.Button type="submit" fluid color="teal" >Sign up</Form.Button>
            </Form>
        );
    }

    renderFormField = ({ error, onChange, ...rest}) => {

        return (
            <Input
            onChange={(event, input) => this.onInputChange(input)}
            iconPosition="left"
            {...rest}
            />
        );
    }
};

const renderError = error => {
    if(error) {
        return <Message size="mini" error content={error}/>;
    }
};

const validate = ({ name, username, email, password }) => {
    const errors = {};

    if (!name) {
        errors.email = 'You need to provide a name to sign up.';
    }

    if (!username) {
        errors.email = 'You need to provide an username to sign up.';
    }

    if (!email) {
        errors.email = 'You need to provide an email to sign up.';
    }

    if(!password) {
        errors.password = 'You need to provide a password to sign up.';
    }

    return errors;
};

export default SignUpForm;