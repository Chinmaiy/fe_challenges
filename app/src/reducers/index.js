import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import leftMenuReducer from './menuReducer';

export default combineReducers(
    {
        form: formReducer,
        userInfo: authReducer,
        leftMenu: leftMenuReducer
    }
);