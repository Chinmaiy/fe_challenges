import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import createStreamReducer from './createStreamReducer';
import streamReducer from './streamReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer.plugin( //exact key for redux-form + reducer from library (adding plugin part for clearing form data after submit)
        {
            streamCreate: createStreamReducer
        }
    ),
    streams: streamReducer
});