import * as consts from '../consts';

//Auth action creators

export const auth = history => async dispatch => {

    //fetch api to get auth response from server 
    const res = await fetch('/api/auth/check', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    });

    //parse
    const data = await res.json();

    //check for truth 
    if(data.auth) dispatch({type: consts.AUTH_TRUE});
    else {
        //redirect to /login page
        history.push('/login');
        dispatch({type: consts.AUTH_FALSE});
    }
}