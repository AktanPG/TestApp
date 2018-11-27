import React from 'react';
import ButtonLoader from '../ButtonLoader';


//Component to render circle avatar
const Avatar = props => (
    <div 
        style={{
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: `url(${props.link}) center center / cover`,
            width: props.size ? props.size : '35px',
            height: props.size ? props.size : '35px',
            cursor: 'pointer',
            borderRadius: '50%',
            border: props.border ? "1px solid #ccc" : null
        }}
        onClick={props.clicked ? props.clicked : null}
    >
        {props.active ? <ButtonLoader /> : null}
    </div>
)

export default Avatar;