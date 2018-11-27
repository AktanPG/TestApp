import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


// component to render Font awesome icons
const Icon = props => (
    <span
        onClick={props.clicked ? props.clicked : null}
        className={props.givenClassName ? props.givenClassName :null}
    >   
        <FontAwesomeIcon 
            icon={props.icon}
        />
    </span>
);

export default Icon;