import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

    //called if the values are valid
    onSubmit = (formValues) => { //obs. the wrapper handleSubmit of redux-form prevents default behavior of event and calls out callback with the form values
        //clear form values
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create A Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null, { createStream })(StreamCreate);