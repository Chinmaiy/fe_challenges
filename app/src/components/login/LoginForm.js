import React from 'react';

import { Form as UIForm, Button, Message } from 'semantic-ui-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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

class LoginForm extends React.Component {

    render() {

        return (
            <Formik
                initialValues={{ email: '', password: ''}}
                validate={validate}
                onSubmit={(values, { setSubmitting }) => this.props.onSubmit(values)}
            >
                {({errors, touched, isSubmitting}) => (
                    <Form>
                        <UIForm as="div" error size="big">
                            <Field
                                errors={errors}
                                touched={touched}
                                name="email"
                                type="email"
                                icon="mail"
                                placeholder="Email"
                                disabled={isSubmitting}
                                as={this.renderFormField}
                            />
                            <ErrorMessage name="email" render={renderError}/>

                            <Field
                                errors={errors}
                                touched={touched}
                                name="password"
                                type="password"
                                icon="lock"
                                placeholder="Password"
                                disabled={isSubmitting}
                                as={this.renderFormField}
                            />
                            <ErrorMessage name="password" render={renderError}/>

                            <Button type="submit" disabled={isSubmitting} fluid color="teal">Login</Button>
                        </UIForm>
                    </Form>
                )}
            </Formik>
        );
    }

    renderFormField = ({ errors, touched, name, ...rest }) => {
        const errorPresent = errors[name] && touched[name];
        return (
            <UIForm.Field error={errorPresent}>
                <UIForm.Input
                    name={name}
                    iconPosition="left"
                    {...rest}
                />
            </UIForm.Field>
        );
    }
};

const renderError = errorMessage => {
    return <Message size="mini" error content={errorMessage}/>;
}


export default LoginForm;