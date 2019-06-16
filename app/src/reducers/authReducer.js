import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: false,
    token: '',
    id: null,
    username: '',
    name: '',
    roles: [],
    createdAt: ''
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LOGIN_SUCCESS:
            return { ...state, 
                    isSignedIn: true,
                    ...action.payload
                };
        case LOGIN_FAIL:
        case LOGOUT:
            return { ...INITIAL_STATE,
                    isSignedIn: false
                };
        default: return state;
    }
}