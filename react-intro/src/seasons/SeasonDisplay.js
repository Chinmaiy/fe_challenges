import './SeasonDisplay.css';
import React from 'react';

const seasonConfig = {
    summer: {
        text: 'Lets hit the beach!',
        iconName: 'sun'
    },
    winter: {
        text: 'Burr, it is chilly!',
        iconName: 'snowflake'
    }
};

const getSeason = (lat, month) => {
    if(month > 2 && month < 9) {
        return lat > 0 ? 'summer' : 'winner';
    } else {
        return lat > 0 ? 'winner' : 'summer';
    }
};

const SeasonDisplay = (props) => {
    const season = getSeason(props.latitude, new Date().getMonth());
    const { text, iconName } = seasonConfig[season];
    const icon = `massive ${iconName} icon`;
    return (
        <div className={`season-display ${season}`}>
            <i className={`${icon} left`}></i>
            <h1>{text}</h1>
            <i className={`${icon} right`}></i>
        </div>
    );
};

export default SeasonDisplay;