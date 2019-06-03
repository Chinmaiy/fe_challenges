import { LEFT_MENU_CLICK, LOGOUT } from '../actions/types';

const INITIAL_STATE = {
    activeItem: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LEFT_MENU_CLICK:
            return { ...state, activeItem: action.payload };
        case LOGOUT:
            return INITIAL_STATE
        default:
            return state;
    }
}