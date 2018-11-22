import React from 'react';
import {faCheck} from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../Icon';

const CheckBox = props => {
    return (
        <div 
            className={classes.CheckBoxContainer}
        >
            <label htmlFor={props.id}>
                <div className={classes.CheckBoxPlaceholder}>{props.value}</div>
            </label>
            <label htmlFor={props.id}>
                <div className={[classes.CustomCheckBox, props.state ? classes.Active : classes.Unactive].join(' ') }>
                    <Icon 
                        icon={faCheck}
                        givenClassName={props.state ? classes.SvgActive : classes.SvgUnactive}    
                    />
                </div>
            </label>
            {props.children}
        </div>
    );
}

export default CheckBox;