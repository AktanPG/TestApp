import * as consts from '../consts';
import axios from 'axios';

//Profile action creators

export const getProfile = (id = null) => async(dispatch) => {

    // Dispatching to change loading state
    dispatch({type: consts.GET_PROFILE_START});

    //headers
    const headers = {'Content-Type': 'application/json'}

    //Handle errors
    try {
        // fetch api to get profile
        const response = await fetch('/api/users/profile', {
            headers, 
            method: 'POST', 
        });

        //parse
        const data = await response.json();

        //check for truth
        if(data.profile) return dispatch({type: consts.GET_PROFILE_TRUE, profile: data.profile});

        // dispatch success
        dispatch({type: consts.GET_PROFILE_FALSE});
    } catch(error) {

        //handle error
        console.log(error);
        dispatch({type: consts.GET_PROFILE_FALSE});
    }
};

export const changeAvatar = formData => dispatch => {

    dispatch({type: consts.CHANGE_AVATAR_START});

    axios.post('/api/users/avatar', formData)
    .then(res => {
        if(res.data.avatar) {
            dispatch({
                type: consts.CHANGE_AVATAR_TRUE, 
                avatar: res.data.avatar
            });
        } else {
            dispatch({
                type: consts.CHANGE_AVATAR_FALSE
            });
        }
    })
    .catch(error => {
        console.log(error);
        dispatch({
            type: consts.CHANGE_AVATAR_FALSE
        });
    });
}
