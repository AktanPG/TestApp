import { combineReducers } from 'redux';

import authReducer from './auth';
import profileReducer from './profile';

//Root reducre that combines child reducers into the one

export default combineReducers({
    authState: authReducer,
    profileState: profileReducer
});