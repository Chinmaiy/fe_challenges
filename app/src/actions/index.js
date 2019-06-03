import fiiGradeApi from '../apis/fiiGradeApi';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LEFT_MENU_CLICK,
    GET_COURSES_SUCCESS
} from './types';

import history from '../history';

const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

export const login = ({ email, password }) => async dispatch => {

    //mock api request
    await wait(2000);
    dispatch({
        type: LOGIN_SUCCESS,
        payload: {
            name: 'Chinmaiy',
            roles: ['student']
        }
    });
}

export const logout = () => async dispatch => {

    //mock api request
    await wait(1000);

    dispatch({
        type: LOGOUT
    });

    history.push('/login');
}

export const leftMenuClicked = (leftMenuActiveItem) => {
    return {
        type: LEFT_MENU_CLICK,
        payload: leftMenuActiveItem
    };
}

export const getCourses = () => async dispatch => {

    //mock api request
    await wait(2000);

    dispatch({
        type: GET_COURSES_SUCCESS,
        payload: [] //loaded courses
    });
}