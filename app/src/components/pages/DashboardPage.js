import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LeftMenu from '../common/LeftMenu';
import CourseList from '../courses/CourseList';
import ToastContainer from '../common/ToastContainer';
import GradesTable from '../courses/GradesTable';
import GradesCard from '../courses/GradesCard';
import CreateCourse from '../courses/CreateCourse';

class DashboardPage extends React.Component {

    render() {
        return (
            <React.Fragment>
                <LeftMenu />
                <div className="right-container">
                    <Route
                        exact
                        path="/courses" 
                        render={props => <CourseList {...props} key={props.location.key}/> }  
                    />
                    <Route 
                        exact
                        path="/:username/courses"
                        render={props => <CourseList {...props} key={props.location.key}/> }
                    />
                    <Route 
                        exact 
                        path="/courses/:id([0-9]+)/grades"
                        render={props => {
                           let Component = () => ''; //todo Unauthorized component
                           if(this.props.userInfo.roles.includes('STUDENT')) {
                                Component = GradesCard;
                           } else if(this.props.userInfo.roles.includes('PROFESSOR')) {
                               Component = GradesTable;
                           }
                           return <Component {...props} 
                                    courseId={props.match.params.id} key={props.location.key} userInfo={this.props.userInfo}/>
                        }}
                    />
                    <Route
                        exact
                        path="/courses/create"
                        render={props => <CreateCourse key={props.location.key}/> }
                    />
                    <ToastContainer />
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo
    }
};

export default connect(mapStateToProps, null)(DashboardPage);