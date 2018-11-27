import * as consts from '../consts';

export const getProfile = (id=null) => async(dispatch) => {
    dispatch({type: consts.GET_PROFILE_START});

    const headers = {'Content-Type': 'application/json'}

    try {
        const response = await fetch('/api/users/profile', {
            headers, 
            method: 'POST', 
            body: JSON.stringify({[id ? 'id' : 'token']: id ? id : window.localStorage.getItem('mplace-token')})
        });
        const data = await response.json();

        if(data.profile) return dispatch({type: consts.GET_PROFILE_TRUE, profile: data.profile});

        dispatch({type: consts.GET_PROFILE_FALSE});
    } catch(error) {
        console.log(error);
        dispatch({type: consts.GET_PROFILE_FALSE});
    }
};
