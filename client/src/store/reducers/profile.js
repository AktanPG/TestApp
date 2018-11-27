import * as consts from '../consts';

const initalState = {
    profile: null,
    loading: true
}

const authReducer = (state = initalState, action) => {
    switch (action.type) {
        case consts.GET_PROFILE_START: return {...state, loading: true};
        
        case consts.GET_PROFILE_TRUE: 
            return {
                ...state,
                profile: action.profile,
                loading: false
            };

        case consts.GET_PROFILE_FALSE: return {...state, loading: false};
        default:
            return state;
    }
}

export default authReducer;