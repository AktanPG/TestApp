import * as consts from '../consts';

const initalState = {
    profile: null,
    loading: true,
    avatarLoading: false
}

// Reducer for manage profile state

const profileReducer = (state = initalState, action) => {
    switch (action.type) {
        case consts.GET_PROFILE_START: return {...state, loading: true};
        
        case consts.GET_PROFILE_TRUE: 
            return {
                ...state,
                profile: action.profile,
                loading: false
            };

        case consts.GET_PROFILE_FALSE: return {...state, loading: false};

        case consts.CHANGE_AVATAR_START: return {...state, avatarLoading: true};

        case consts.CHANGE_AVATAR_TRUE: 
            return {
                ...state,
                profile: {
                    ...state.profile,
                    avatar: action.avatar
                },
                avatarLoading: false
            }

        case consts.CHANGE_AVATAR_FALSE: return {...state, avatarLoading: false}

        default:
            return state;
    }
}

export default profileReducer;