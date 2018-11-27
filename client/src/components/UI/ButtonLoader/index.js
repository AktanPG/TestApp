import React from 'react';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../Icon';

//Loader for buttons and blocks

const ButtonLoader = () => {
    return (
        <div className={classes.ButtonLoader}>
            <Icon icon={faSpinner}/>
        </div>
    );
}

export default ButtonLoader;