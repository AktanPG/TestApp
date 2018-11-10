const logger = store => next => action => {
    if(typeof action === 'function') {
        console.log('--[ THUNK ]--');
        next(action);
    } else {
        console.log('--[ DISPATCH ]--');
        console.log(next(action));
    }
}

export default logger;