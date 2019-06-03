import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

import history from '../history';
import PrivateRoute from './PrivateRoute';

class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <Switch>
                    <PrivateRoute path="/" exact component={DashboardPage}/>
                    <Route path="/login" exact component={LoginPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;