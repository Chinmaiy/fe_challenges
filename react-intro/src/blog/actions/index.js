import jsonPlaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

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

  /**
   * Whenever an action creator calls an action creator it needs to dispatch the result of calling it.
   */
  export const fetchPostsAndUsers = () => async (dispatch, getState) => {
      await dispatch(fetchPosts()); //make sure the API request completes i.e. posts are available in state

      //const userIds = _.uniq(_.map(getState().posts, 'userId'));
      //userIds.forEach(id => dispatch(fetchUser(id))); //do not need, in this case, to wait for the responses

      //refactor above with lodash
      _.chain(getState().posts)
        .map('userId') //the result of previous call is past as the first arguments to this next function
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
  };

 export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    dispatch({
        type: 'FETCH_POSTS',
        payload: response.data
    });
};

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: response.data
    });
}