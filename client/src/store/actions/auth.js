import * as consts from '../consts';

export const auth = history => async dispatch => {
    const token = window.localStorage.getItem('mplace-token');

    if(token === null) {
        history.push('/form/login');
    } else {
        const res = await fetch('/api/auth/check', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({token: token})
        });
        const data = await res.json();

        if(data.auth) dispatch({type: consts.AUTH_TRUE});
        else dispatch({type: consts.AUTH_FALSE});
    }
}