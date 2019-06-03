import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    name: null,
    roles: []
};

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case LOGIN_SUCCESS:
            return { ...state, 
                    isSignedIn: true, 
                    name: action.payload.name, 
                    roles: action.payload.roles 
                };
        case LOGIN_FAIL:
        case LOGOUT:
            return { ...INITIAL_STATE,
                    isSignedIn: false
                };
        default: return state;
    }
}