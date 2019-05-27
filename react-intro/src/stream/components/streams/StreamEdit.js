import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

/**
 * Every route/every component needs to fetch its own data 
 * i.e. work in isolation, do NOT depend on previous state
 * being set by some other component
 */


class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    //here formValues should contain only allowed changes from the form to send forward to the API
    //that's why _.pick is used when passing initial values for the form
    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    render() {

        if(!this.props.stream) {
            return <div>Loading...</div>;
        }

        return (
            //initialValues is a prop from redux-form used to pre-populate a form
            <div>
                <h3>Edit the Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);