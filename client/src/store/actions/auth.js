import * as consts from '../consts';

export const auth = history => async dispatch => {
    if(window.sessionStorage.getItem('mplaceToken') === null) {
        history.push('/register');
        dispatch({type: consts.AUTH_FALSE});
    } else {
        const res = await fetch('/api/auth/check', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const data = await res.json();

        if(data.auth) dispatch({type: consts.AUTH_TRUE});
        else {
            history.push('/register');
            dispatch({type: consts.AUTH_FALSE});
        }
    }
}