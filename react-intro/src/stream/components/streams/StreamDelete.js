import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

/**
 * Use React.Fragment when you want to have multiple siblings elements not wrapped in a single
 * explicit parent-element (which is a JSX requirement) which would be displayed in the DOM.
 */
class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    getModalActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={() => this.props.deleteStream(id)} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    getContentMessage() {
        if(!this.props.stream) {
            return "Are you sure you want to delete this stream?";
        }

        return `Are you sure you want to delete ${this.props.stream.title}`;
    }

    render() {
    
        return (
            <div>
                <Modal
                    title="Delete Stream"
                    content={this.getContentMessage()}
                    actions={this.getModalActions()}
                    onDismiss={() => history.push("/")}
                />
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);