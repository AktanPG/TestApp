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
import './index.css';

// create the redux store
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

//Connect BrowserRouter and provide store

const app = (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

//Render
ReactDOM.render( app, document.getElementById('root'));
