import './SeasonsApp.css';
import React, {Component} from 'react';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
import ErrorDisplay from './ErrorDisplay';

class SeasonsApp extends Component {

    //place to do one time setup
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            errorMessage: ''
        };
    }

    //can initialize state without overriding the constructor: (babel transforms this line in a constructor)
    //state = { latitude: null, errorMessage: ''};

    //called ONE TIME, after the component is first rendered
    //good for data-loading (recommended way)
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({ latitude: position.coords.latitude }),
            (err) => this.setState({ errorMessage: err.message })
        );
    }

    //called after each render, except for the first time
    //ok to do data-loading when state/props change (e.g. from user input)
    componentDidUpdate() {
    }

    //do clean up, especially for non-React stuff
    componentWillUnmount() {

    }

    renderContent() {
        if(this.state.errorMessage && !this.state.latitude) {
            return <ErrorDisplay message={this.state.errorMessage} />
        }
        
        if(!this.state.errorMessage && this.state.latitude) {
            return <SeasonDisplay latitude={this.state.latitude} />;
        }

        return <Spinner size="big" message="Searching location..." />;
    }

    //just return JSX
    render() {
        return (
            <div className="seasons-app">
                {this.renderContent()}
            </div>
        );
    };
}

export default SeasonsApp;