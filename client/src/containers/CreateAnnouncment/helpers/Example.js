import React from 'react';

import classes from '../index.css';

const Example = props => (
    <div className={classes.ExampleContainer}>
        {props.children}
        <div 
            className={classes.Example}
            style={{
                display: props.display ?  'block' : 'none'  
            }}
        >
            Example : {props.value}
        </div>
    </div>
);

export default Example;