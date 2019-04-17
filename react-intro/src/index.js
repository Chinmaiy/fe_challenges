import React from 'react';
import ReactDOM from 'react-dom';
import App from './songs/components/App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './songs/reducers';

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
    </Provider>,
    document.querySelector('#root')
);