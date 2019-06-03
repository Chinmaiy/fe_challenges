import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

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
        return (
            <Container>
                <Logo/>
                <LoginForm onSubmit={this.props.login}/>
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