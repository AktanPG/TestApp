import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../Icon';

const FullLoader = (props) => (
    <div className={[classes.FullLoader, props.givenClassName ? props.givenClassName : ''].join(' ')}>
        <Icon icon={faSpinner}/>
    </div>
);

export default FullLoader;