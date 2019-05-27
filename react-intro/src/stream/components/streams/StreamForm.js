import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderInput = ({ input, label, inputId, meta }) => { //destructure props sent to this by redux-form + custom added on Field
        const className = `field ${this.renderError(meta) ? 'error' : ''}`;
        
        return (
            // <input
            //     onChange={formProps.input.onChange}
            //     value={formProps.input.value}
            // />
            <div className={className}>
                <label htmlFor={inputId}>{label}</label>
                <input {...input} id={inputId} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    }

    displayErrors({ error, touched }) {
        return error && touched;
    }

    renderError(meta) { //touched is true is the user interacted at least once with the element
        if (this.displayErrors(meta)) {
            return (
                <div className="ui error message">
                    <div className="header">{meta.error}</div>
                </div>
            );
        }
    }

    //called if the values are valid
    onSubmit = (formValues) => { //obs. the wrapper handleSubmit of redux-form prevents default behavior of event and calls out callback with the form values
        //clear form values
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form 
                className="ui form error" 
                onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Title" inputId="streamCreateTitle"
                />
                <Field 
                    name="description" 
                    component={this.renderInput} 
                    label="Description" 
                    inputId="streamCreateDescription"/>
                <button className="ui primary button">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title.';
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description.';
    }

    return errors; //contains error on each field in a property with the field's name
};

export default reduxForm({
    form: 'streamForm',
    validate //the key and value are equal
})(StreamForm);