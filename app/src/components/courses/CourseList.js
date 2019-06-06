import React from 'react';
import { Card, Grid } from 'semantic-ui-react';
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

        return (
            <Grid stackable container columns={16} >
                {this.state.courses.map(course => 
                    <Grid.Column mobile={16} tablet={8} computer={4} key={course.id}>
                        <Course
                                key={course.id}
                                name={course.name}
                                description={course.description}
                        />
                    </Grid.Column>
                )}
            </Grid>
        );
    }
}


export default CourseList;