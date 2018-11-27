import { combineReducers } from 'redux';

import authReducer from './auth';
import profileReducer from './profile';

export default combineReducers({
    authState: authReducer,
    profileState: profileReducer
});