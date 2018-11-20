import React, { Component } from 'react';

const withForm = (WrappedComponent, inputs) => class withForm extends Component {
    state = {
        inputs: inputs,
        error: null
    }

    inputHandler = (e, key) => {
        const inputs = {...this.state.inputs};
        inputs[key].value = e.target.value;
        this.setState({inputs});
    }

    onSubmit = async(type, src) => {
        const data = {}
        
        Object.keys(this.state.inputs)
        .map((key) => data[key] = this.state.inputs[key].value);

        try {
            const header = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }
            const response = await fetch(src, header);
            const resData = await response.json();

            if(resData[type]) {
                if(type === 'login') this.props.history.push('/');
                else this.props.history.push('/login');        
            } else {
                this.setState({error: resData.massage});
            }

        } catch (error) {
            console.log(error);
            this.setState({error: 'Error, Try again later'})
        }
    }

    render ()  {
        return <WrappedComponent 
            {...this.props}
            state={this.state}
            inputHandler={this.inputHandler}
            error={this.state.error}
            submitHandler={this.onSubmit}
        />
    }
}

export default withForm;