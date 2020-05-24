import { combineReducers } from 'redux';
import authReducer from './authReducer';
import leftMenuReducer from './menuReducer';

export default combineReducers(
    {
        userInfo: authReducer,
        leftMenu: leftMenuReducer
    }
);