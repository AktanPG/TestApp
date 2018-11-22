import React from 'react';

import Example from './Example';
import CheckBox from '../../../components/UI/CheckBox';

const RenderInputs = props => {
    return (
        Object.keys(props.inputs)
        .map((key) => props.inputs[key])
        .map((input, index) => {
            const key = Object.keys(props.inputs)[index]

            if(input.type !== 'textarea' && input.type !== 'checkbox') {
                return (
                    <Example
                        key={key}
                        value={input.example}
                        display={input.display}
                    >
                        <input
                            onChange={(e) => props.inputHandler(e, Object.keys(props.inputs)[index]) }
                            type={input.type}
                            value={input.value}
                            placeholder={input.placeHolder}
                            key={index + "-" + input.type + "-" + input.placeHolder}
                            onFocus={() => props.displayExample(key)}
                        />
                    </Example>
                );
            } else if(input.type === 'checkbox') {
                return (
                    <CheckBox
                        id={key}
                        value={input.placeHolder}
                        state={input.value}
                        key={key}
                    >
                        <input
                            id={key}
                            onChange={(e) => props.inputHandler(e, key)}
                            type={input.type}
                            value={input.value}
                        />
                    </CheckBox>
                );
            } else {
                return (
                    <Example
                        value={input.example}
                        display={input.display}
                        key={key}
                    >
                        <textarea 
                            key={index} 
                            placeholder={input.placeHolder}
                            value={input.value}
                            onChange={(e) => props.inputHandler(e, key) }
                            onFocus={() => props.displayExample(key)}
                        >
                        </textarea>
                    </Example>
                );
            }
        })
    );
};

export default RenderInputs;