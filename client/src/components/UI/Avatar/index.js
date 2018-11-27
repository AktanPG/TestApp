import React from 'react';

const Avatar = props => (
    <div 
        style={{
            background: `url(${props.link})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            width: props.size ? props.size : '35px',
            height: props.size ? props.size : '35px',
            cursor: 'pointer',
            borderRadius: '50%',
            border: props.border ? "1px solid #ccc" : null
        }}
        onClick={props.clicked ? props.clicked : null}
    >
    </div>
)

export default Avatar;