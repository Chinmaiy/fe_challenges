import { CREATE_STREAM } from "../actions/types";

export default (state, action) => {
    switch(action.type) {
        case CREATE_STREAM:
            return undefined; //clear form data
        default:
            return state;
    }
};