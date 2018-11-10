import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers';
import logger from './store/middleWares/logger';

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
window.store = store;
window.state = store.getState;

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

ReactDOM.render( app, document.getElementById('root'));
