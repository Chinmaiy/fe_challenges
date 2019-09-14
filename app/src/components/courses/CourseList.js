import React from 'react';
import { Grid, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { toast } from 'react-semantic-toasts';

import Course from './Course';
import Spinner from '../common/Spinner';
import { getCoursesWithOwnersInfo, deleteCourse } from '../../actions';

class CourseList extends React.Component {

    state = {
        courses: null
    };

    async componentDidMount() {
        const filter = this.props.match.params.username !== undefined;
        const courses = await getCoursesWithOwnersInfo(this.props.userInfo, filter);
        this.setState({
            courses
        });
    }

    render() {

        if(this.state.courses === null) {
            return <Spinner/>
        }

        if(this.state.courses.length === 0) {
            return (
                <Message 
                    info 
                    size="big"
                    header="No courses to display."
                />
            );
        }

        return (
            <Grid container columns={16} >
                {this.state.courses.map(course => 
                    <Grid.Column mobile={16} tablet={8} computer={4} key={course.id}>
                        <Course
                                courseId={course.id}
                                key={course.id}
                                name={course.name}
                                description={course.description}
                                ownerId={course.owner.id}
                                ownerName={course.owner.name}
                                ownerUsername={course.owner.username}
                                userInfo={this.props.userInfo}
                                onDelete={this.onDeleteCourseClick}
                        />
                    </Grid.Column>
                )}
            </Grid>
        );
    }

    onDeleteCourseClick = async courseId => {

        const response = await deleteCourse(courseId, this.props.userInfo.token);
        const { success, message } = response;

        if(success) {
            const newCourses = this.state.courses.filter(course => course.id !== courseId);
            this.setState({
                courses: newCourses
            });
        }

        toast({
            title: message,
            type: success ? 'info' : 'error',
            color: success ? 'teal' : 'red',
            size: 'small',
            time: 5000,
            animation: 'slide left'
        });
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    };
}


export default connect(mapStateToProps, null)(CourseList);