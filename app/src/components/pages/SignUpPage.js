import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Container from '../Container';
import SignUpForm from '../login/SignUpForm';
import Logo from '../Logo';

import { signup } from '../../actions';

class SignUpPage extends React.Component {

    state = {
        success: false,
        message: ''
    }

    render() {
        if(this.state.success) {
            let to = '/login';
            if(this.props.isSignedIn) {  
                to = "/";
            }

            return <Redirect to={to}/>
        }
        return (
            <Container>
                <Logo/>
                <SignUpForm error={this.state.message} onSubmit={this.onSubmit}/>
            </Container>
        );
    }

    onSubmit = async values => {
        const { success, message } = await signup(values);
        this.setState({
            success,
            message
        });
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.userInfo.isSignedIn
    }
};

export default connect(mapStateToProps, null)(SignUpPage);