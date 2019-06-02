import React from 'react';

import { Form, Button, Message } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component {

    render() {
        return (
            <Form error size="big" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>

                <Field 
                    name="email" 
                    component={this.renderFormField} 
                    icon="mail"
                    placeholder="Email"
                    type="email"/>

                <Field 
                    name="password" 
                    component={this.renderFormField}
                    icon="lock"
                    placeholder="Password"
                    type="password"/>

                <Button fluid color="teal">Login</Button>
            </Form>
        );
    }

    renderFormField({ input, meta, icon, placeholder, type }) {
        const error = displayError(meta);
        return (
            <Form.Field error={error}>
                <Form.Input
                {...input}
                icon={icon}
                iconPosition="left" 
                placeholder={placeholder}
                type={type}/>

                {renderError(meta)}
                
            </Form.Field>
        );
    }
};

const displayError = ({ error, touched }) => {
    return error && touched;
};

const renderError = meta => {
    if(displayError(meta)) {
        return <Message size="mini" error content={meta.error}/>;
    }
};

const validate = ({ email, password }) => {
    const errors = {};

    if (!email) {
        errors.email = 'You need to provide an email to login.';
    }

    if(!password) {
        errors.password = 'You need to provide a password to login.';
    }

    return errors;
};

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);