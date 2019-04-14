import React from 'react';

class Clock extends React.Component {
        
    state = { timeStr: getTimeStr() };

    getTimeStr() {
        return new Date().toLocaleTimeString();
    };
    
    componentDidMount() {
        setInterval(() => {
            this.setState({ timeStr: this.getTimeStr() })   
        }, 1000)
    };
    
    render() {
        return (
            <div className="clock">
                The time is: {this.state.timeStr}
            </div>
        );
    };
};

export default Clock;


