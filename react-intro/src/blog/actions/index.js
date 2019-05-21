import jsonPlaceholder from '../apis/jsonPlaceholder';

/**
 * because of the way babel transpiles async/await syntax 
 * this is not an action creator that returns a plain js object
 * (which is required of an action creator so it will get dispatched by the redux store)
 * (the api response object gets dispatched which is not recognized by redux)
 */
// export const fetchPosts = async () => {

//     const response = await jsonPlaceholder.get('/posts');

//     return {
//         type: 'FETCH_POSTS',
//         payload: response
//     };
// };

/**
 * when reducers run the promise may not contain data (since the request is not finished)
 * (but the action gets to the reducer instantaneously)
 */
// export const fetchPosts = () => {

//     const promise = jsonPlaceholder.get('/posts');

//     return {
//         type: 'FETCH_POSTS',
//         payload: promise
//     };
// };

/**
 * Asynchronous action creator (takes time to get its data) - needs some mioddleware for dealing with async actions 
 * to make requests in a redux application; the dispatch will send actions to middleware (js functions) before 
 * they get to reducers to stop, modify them
 */

 /**
  * Redux Thunk allows action creators to return also functions and calls them to get the plain js object the redux needs
  * Invokes them with the dispatch and getState functions which are passed as arguments to dispatch manually an action
  * (i.e. after the requests finishes)
  */

 export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({
        type: 'FETCH_POSTS',
        payload: response
    })
};