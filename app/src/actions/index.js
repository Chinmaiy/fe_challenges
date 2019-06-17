import fiiGradeApi from '../apis/fiiGradeApi';
import _ from 'lodash';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    LEFT_MENU_CLICK,
    GET_COURSES_SUCCESS
} from './types';

import history from '../history';

const wait = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

export const leftMenuClicked = (leftMenuActiveItem) => {
    return {
        type: LEFT_MENU_CLICK,
        payload: leftMenuActiveItem
    };
}

export const login = (payload) => async dispatch => {

    const response = await fiiGradeApi.post('/auth/signin', payload);
    dispatch({
        type: response.status === 200 ? LOGIN_SUCCESS : LOGIN_FAIL,
        payload: response.data
    });
}

export const signup = async (payload) => {

    const response = await fiiGradeApi.post('/auth/signup', payload);

    return {
        success: response.data.success,
        message: response.data.message
    }
}

export const logout = () => async dispatch => {

    //mock api request
    await wait(1000);

    dispatch({
        type: LOGOUT
    });

    history.push('/login');
}

export const getUser = async (userId, token) => {

    const response = await fiiGradeApi.get(`/users/${userId}`, {
        headers: {
            Authorization: token
        }
    });

    return response.data; 
}

export const getCourses = async (userInfo, filter) => {

    let params = {};

    if(filter) {
        if(userInfo.roles.includes("PROFESSOR")) {
            params.ownerId = userInfo.id;
        } else if(userInfo.roles.includes("STUDENT")) {
            params.enrolledUserId = userInfo.id;
        }
    }

    const response = await fiiGradeApi.get('/courses', {
        params,
        headers: {
            Authorization: userInfo.token
        }
    });

    return response.data;
}

export const getCoursesWithOwnersInfo = async (userInfo, filter) => {
    const courses = await getCourses(userInfo, filter);

    const users = await Promise.all(
        _.chain(courses)
            .map('createdBy')
            .uniq()
            .map(id => getUser(id, userInfo.token))
            .value());

    const ownersMap = users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});

    courses.forEach(course => course.owner = ownersMap[course.createdBy]);

    return courses;
}

export const createCourse = async (payload, token) => {

    const response = await fiiGradeApi.post('/courses/create', payload, {
        headers: {
            Authorization: token
        }
    });

    console.log(response);

    return {
        ...response.data
    }
}

export const isEnrolled = async (userInfo, courseId) => {

    const response = await fiiGradeApi.get(`/courses/${courseId}/checkEnrollment`, {
        params: {
            userId: userInfo.id
        },
        headers: {
            Authorization: userInfo.token
        }
    });

    return response.data.payload;
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