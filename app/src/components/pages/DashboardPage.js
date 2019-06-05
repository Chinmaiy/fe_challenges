import React from 'react';
import { Route } from 'react-router-dom';
import LeftMenu from '../common/LeftMenu';
import CourseList from '../courses/CourseList';

export class DashboardPage extends React.Component {

    render() {
        return (
            <div>
                <LeftMenu />
                <div className="right-container">
                    <Route 
                        exact
                        path="/courses/:which(all|own)" 
                        render={props => (<CourseList which={props.match.params.which} key={props.location.pathname}/>) }
                    />
                </div>
            </div>
        );
    }
}