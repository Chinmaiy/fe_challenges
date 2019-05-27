import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

/**
 * Every route/every component needs to fetch its own data 
 * i.e. work in isolation, do NOT depend on previous state
 * being set by some other component
 */


class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {

        if(!this.props.stream) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, { fetchStream })(StreamEdit);