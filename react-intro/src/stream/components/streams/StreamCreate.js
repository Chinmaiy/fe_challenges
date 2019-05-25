import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {

    renderInput({ input, label, inputId }) { //destructure props sent to this by redux-form + custom added on Field
        return (
            // <input
            //     onChange={formProps.input.onChange}
            //     value={formProps.input.value}
            // />
            <div className="field">
                <label htmlFor={inputId}>{label}</label>
                <input {...input} id={inputId}/>
            </div>
        );
    }

    onSubmit(formValues) { //obs. the wrapper handleSubmit of redux-form prevents default behavior of event and calls out callback with the form values
        console.log(formValues);
    }

    render() {
        return (
            <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
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

export default reduxForm({
    form: 'streamCreate'
})(StreamCreate);