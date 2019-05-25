import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '39730521105-kn869o11mtro82n5jvjctnvo2n5gaqbe.apps.googleusercontent.com',
                scope: 'email profile'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        }); //you need to load what api you want to use from google, callback when it is finished
    }

    onAuthChange = isSignedIn => { //passed in by the listen function
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn()
            .then(user => {
            })
            .catch(err => console.log(err.error));  
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else {
            return (
                <button className="ui red google button" 
                        onClick={this.props.isSignedIn ? this.onSignOutClick : this.onSignInClick}
                >
                    <i className="google icon"></i>
                    Sign {this.props.isSignedIn ? 'out' : 'in'}
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);