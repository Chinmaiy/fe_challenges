import React from 'react';
import { Card } from 'semantic-ui-react';
import Course from './Course';
import Spinner from '../common/Spinner';
import { getCourses } from '../../actions';

class CourseList extends React.Component {

    state = {
        courses: null
    };

    async componentDidMount() {
        const courses = await getCourses(this.props.which);
        this.setState({
            courses
        });
    }

    render() {

        if(this.state.courses === null) {
            return <Spinner/>
        }

        //TODO add pagination ?
        return (
            <Card.Group itemsPerRow="4">

                {this.state.courses.map(course => 
                    <Course
                            key={course.id}
                            name={course.name}
                            description={course.description}
                    />
                )}
            </Card.Group>
        );
    }
}


export default CourseList;