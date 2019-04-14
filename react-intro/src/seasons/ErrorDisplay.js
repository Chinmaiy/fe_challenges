import './ErrorDisplay.css';
import React from 'react';

const ErrorDisplay = (props) => {
    return (
        <div className="error-display">
            Error: {props.message}
        </div>
    );
};

ErrorDisplay.defaultProps = {
    message: 'There was a problem completing the operation.'
};

export default ErrorDisplay;