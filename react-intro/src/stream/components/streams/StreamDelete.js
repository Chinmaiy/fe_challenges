import React from 'react';
import Modal from '../Modal';
import history from '../../history';

/**
 * Use React.Fragment when you want to have multiple siblings elements not wrapped in a single
 * explicit parent-element (which is a JSX requirement) which would be displayed in the DOM.
 */
const StreamDelete = () => {

    const actions = (
        <React.Fragment>
            <button className="ui negative button">Delete</button>
            <button className="ui button">Cancel</button>
        </React.Fragment>
    );

    return (
        <div>
            <Modal
                title="Delete Stream"
                content="Are you sure you want to delete this stream?"
                actions={actions}
                onDismiss={() => history.push("/")}
            />
        </div>
    );
};

export default StreamDelete;