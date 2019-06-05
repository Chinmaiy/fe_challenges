import React from 'react';
import { Route } from 'react-router-dom';

import LeftMenu from '../common/LeftMenu';
import CourseList from '../courses/CourseList';
import ToastContainer from '../common/ToastContainer';

export class DashboardPage extends React.Component {

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <LeftMenu />
                <div className="right-container">
                    <Route
                        exact
                        path="/courses/:which(all|own)" 
                        render={props => (<CourseList which={props.match.params.which} key={props.location.key}/>) }
                    />
                    <ToastContainer />
                </div>
            </React.Fragment>
        );
    }
}