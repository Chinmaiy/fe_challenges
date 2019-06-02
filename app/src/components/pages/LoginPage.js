import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Container from '../Container';
import Logo from '../Logo';
import LoginForm from '../login/LoginForm';

import { login } from '../../actions';

class LoginPage extends React.Component {

    render() {
        console.log(this.props);
        if(this.props.isSignedIn) {
            return <Redirect to="/dashboard"/>
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