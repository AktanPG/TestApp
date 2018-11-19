import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../Icon';

const FullLoader = () => (
    <div className={classes.FullLoader}>
        <Icon icon={faSpinner}/>
    </div>
);

export default FullLoader;