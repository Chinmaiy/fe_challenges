import React from 'react';
import { Card } from 'semantic-ui-react';
import Course from './Course';

class CourseGrid extends React.Component {

    componentDidMount() {
        
    }

    render() {
        
        return (
            <Card.Group itemsPerRow="4">
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
                <Course />
            </Card.Group>
        );
    }
}

export default CourseGrid;