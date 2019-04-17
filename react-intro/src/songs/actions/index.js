//action creator
export const selectSong = (song) => {
    // return an action
    return {
        type: 'SONG_SELECTED', //required to have a type
        payload: song // not required
    };
};