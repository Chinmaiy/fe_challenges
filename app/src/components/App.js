import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import { DashboardPage, renderWithDashboard } from './pages/DashboardPage';

import history from '../history';
import PrivateRoute from './PrivateRoute';
import CourseList from './courses/CourseList';

class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/login" exact component={LoginPage}/>
                    <PrivateRoute component={DashboardPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;