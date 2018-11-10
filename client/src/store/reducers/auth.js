import * as consts from '../consts';

const initalState = {
    auth: false,
    loading: true
}

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case consts.AUTH_TRUE: 
            return {
                ...state,
                auth: true,
                loading: false 
            }
        case consts.AUTH_FALSE: 
            return {
                ...state,
                auth: false,
                loading: false
            }
        default:
            return state;
    }
}

export default authReducer;