import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          isSignedIn ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.userInfo.isSignedIn
    }
}

export default connect(mapStateToProps, {})(PrivateRoute);