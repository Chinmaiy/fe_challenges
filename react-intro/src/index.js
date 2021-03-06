import React from "react";
import ReactDOM from "react-dom";

/** STREAM APP */
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
// import reduxThunk from 'redux-thunk';

// import App from './stream/components/App';
// import reducers from './stream/reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//     reducers,
//     composeEnhancers(applyMiddleware(reduxThunk))
// );

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.querySelector('#root')
// );

import App from "./hooks/components/App";

ReactDOM.render(<App />, document.querySelector("#root"));
