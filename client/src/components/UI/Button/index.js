import React from 'react';

import classes from './index.css';

const Button = props => (
    <div 
        className={classes.Button + " " + props.givenClassName} 
        style={{
            background: props.color,
            color: props.textColor
        }}
        onClick={props.clicked ? props.clicked : null}    
    >
        {props.value}
        {props.children}
    </div>
);

export default Button;