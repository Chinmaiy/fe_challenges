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

export const getCourses = async (which) => {

    let payload = null;

    switch(which) {
        case 'all':
            payload = [
                {
                    id: 1,
                    name: 'Lorem, ipsum.',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos iusto, ea sed eligendi id praesentium?'
                },
                {
                    id: 2,
                    name: 'Lorem, ipsum.',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos iusto, ea sed eligendi id praesentium?'
                },
                {
                    id: 3,
                    name: 'Lorem, ipsum.',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos iusto, ea sed eligendi id praesentium?'
                },
                {
                    id: 4,
                    name: 'Lorem, ipsum.',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos iusto, ea sed eligendi id praesentium?'
                },
                {
                    id: 5,
                    name: 'Lorem, ipsum.',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos iusto, ea sed eligendi id praesentium?'
                }
            ]; break;
        case 'own':
            payload = [
                {
                    id: 2,
                    name: 'Owned Course',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos iusto, ea sed eligendi id praesentium?'
                }
            ]; break;
        default: 
    }

    //mock api request
    await wait(500);

    return payload;
}

export const enroll = async courseId => {

    //need also the user id or get it from the session on the server
    await wait(500);

    return {
        enrolled: true
    }
};

export const getGradesCardData = async courseId => {

    //await wait(1000);

    //should use the user id on the query as well
    //will return a map of column name and object

    const payload = {
        courseName: "Lorem, ipsum.",
        data: [
            {
                name: "Course Component 1",
                value: 7
            },
            {
                name: "Course Component 2",
                value: 8
            },
            {
                name: "Final Grade",
                formula: "(Course Component 1 + Course Component 2) / 2",
                value: 7.5
            }
        ]
    };

    return payload;
}

export const getGradesTableData = async courseId => {

    await(500);

    const payload = {
        columns: [
            {
                id: 1,
                name: "Course Component 1"
            },
            {
                id: 2,
                name: "Course Component 2"
            },
            {
                id: 3,
                name: "Formula 1",
                formula: "(C_1 + C_2) / 2"
            }
        ]
    }

    return payload;
}