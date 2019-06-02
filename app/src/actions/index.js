import fiiGradeApi from '../apis/fiiGradeApi';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from './types';

export const login = ({ email, password }) => async dispatch => {

    //make api request
    setTimeout(() => {
        console.log('dispatch login action')
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                name: 'Chinmaiy',
                roles: ['student']
            }
        });
    }, 1000);
}