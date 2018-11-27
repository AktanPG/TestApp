import * as consts from '../consts';

const initalState = {
    auth: false,
    loading: true
}

//Auth reducer to manage auth state 

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        // if success
        case consts.AUTH_TRUE: 
            return {
                ...state,
                auth: true,
                loading: false 
            }
        //if faile
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