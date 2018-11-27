import React from 'react';

import classes from './index.css';

// This component renders inputs
const RenderInputs = props => {

    //make array from object
    const inputsArray = Object.keys(props.inputs).map(key => props.inputs[key]);
    
    // create inputs from this array
    return inputsArray.map((input, index) => (
        <div className={classes.InputGroup} key={index}>
            <input 
                required
                type={input.type} 
                value={input.value} 
                id={input.placeHolder}
                onChange={(e) => props.inputHandler(e, Object.keys(props.inputs)[index])}
            />
            <label htmlFor={input.placeHolder}>{input.placeHolder}</label>
        </div>
    ));
};

export default RenderInputs;