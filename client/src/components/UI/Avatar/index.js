import React from 'react';

const Avatar = props => (
    <div 
        style={{
            background: `url(${props.link})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            width: props.width ? props.width : '35px',
            height: props.height ? props.height : '35px',
            cursor: 'pointer',
            borderRadius: '50%',
            border: props.border ? "1px solid #ccc" : null
        }}
        onClick={props.clicked ? props.clicked : null}
    >
    </div>
)

export default Avatar;