import React from 'react';
import { unsplash, searchPhotosUrl } from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

import './PicsApp.css';

class PicsApp extends React.Component {

    state = { images: [] };

    onSearchSubmit = async term => {
        const response = await unsplash.get(`${searchPhotosUrl}`, {
            params: { query: term }
        });

        this.setState({
            images: response.data.results
        });
    }

    render() {
        return (
            <div className="pics-app ui container">
                <SearchBar onSubmit={this.onSearchSubmit} />
                <ImageList images={this.state.images}/>
            </div>
        );
    }
}

export default PicsApp;