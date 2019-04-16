import React from 'react';
import './VideoItem.css';

const VideoItem = ({ video, onVideoSelect }) => {
    const title = video.snippet.title;
    return (
        <div className="video-item item" onClick={() => onVideoSelect(video)}>
            <img className="ui image" src={video.snippet.thumbnails.medium.url} alt={title} />
            <div className="content">
                <div className="header">
                    {title}
                </div>
            </div>
        </div>
    );  
}

export default VideoItem;