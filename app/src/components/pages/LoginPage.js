import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Button, Divider } from 'semantic-ui-react';

import Container from '../Container';
import Logo from '../Logo';
import LoginForm from '../login/LoginForm';

import { login } from '../../actions';

class LoginPage extends React.Component {

    render() {
        if(this.props.isSignedIn) {
            const prevLocation = this.props.location.state || { from: { pathname: '/' } };
            return <Redirect to={prevLocation.from.pathname}/>
        }
        //todo should disable sign up when waiting login
        return (
            <Container>
                <Logo/>
                <LoginForm onSubmit={this.props.login}/>
                <Divider />
                <Button as={Link} to="/signup" color="teal">Sign up</Button>
            </Container>  
        );
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.userInfo.isSignedIn
    }
};

export default connect(mapStateToProps, { login })(LoginPage);