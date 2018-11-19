import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Icon = props => (
    <span
        onClick={props.clicked ? props.clicked : null}
        className={props.classTo ? props.classTo :null}
    >   
        <FontAwesomeIcon 
            icon={props.icon}
        />
    </span>
);

export default Icon;