import streamsApi from '../apis/streams';
import history from '../history';
import { 
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streamsApi.post('/streams', { ...formValues, userId });

    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });

    //programmatic navigation to get the user back to the root route by changing the URL with the history object
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
    const response = await streamsApi.get('/streams');

    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    });
};

export const fetchStream = id => async dispatch => {
    const response = await streamsApi.get(`/streams/${id}`);

    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    });
};

export const editStream = (id, formValues) => async dispatch => {
    const response = await streamsApi.patch(`/streams/${id}`, formValues); //to update only the properties in the form

    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });

    history.push('/');
};

export const deleteStream = id => async dispatch => {
    await streamsApi.delete(`/streams/${id}`);
    
    dispatch({
        type: DELETE_STREAM,
        payload: id
    });
    history.push('/');
};