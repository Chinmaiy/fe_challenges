import React from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends React.Component {

    renderList() {
        return this.props.songs.map(song => {
            return (
                <div className="item" key={song.title}>
                    <div className="right floated content">
                        <button 
                            className="ui button primary"
                            onClick={() => this.props.selectSong(song)}
                        >
                            Select
                        </button>
                    </div>

                    <div className="content">{song.title}</div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="ui divided list">{this.renderList()}</div>
        );
    }
};

//convention to call it this way
const mapStateToProps = (state) => { // contains state from the redux store
    return { // return an object that is basically this.props in the component (will also contain dispatch function)
        songs: state.songs
    };
};

export default connect(mapStateToProps, {
    selectSong // key (name in the props)-value(wrapper of action creator that takes the action and passes it to redux dispatch) object
})(SongList); // connect will get state updates from the provider and will pass them to SongList