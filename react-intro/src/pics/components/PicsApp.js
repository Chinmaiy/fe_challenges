import './PicsApp.css';
import React from 'react';
import SearchBar from './SearchBar';

class PicsApp extends React.Component {

    onSearchSubmit = (term) => {
        console.log(term);
    }

    render() {
        return (
            <div className="pics-app ui container">
                <SearchBar onSubmit={this.onSearchSubmit} />
            </div>
        );
    }
}

export default PicsApp;