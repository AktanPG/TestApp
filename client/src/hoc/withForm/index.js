import React, { Component } from 'react';

const withForm = (WrappedComponent, inputs) => class withForm extends Component {
    state = {
        inputs: inputs,
        error: null,
        loading: false
    }

    inputHandler = (e, key) => {
        const inputs = {...this.state.inputs};
        inputs[key].value = e.target.value;
        this.setState({inputs});
    }

    onSubmit = async(type, src) => {
        this.setState({loading: true});

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
                
                if(type === 'login') {
                    this.props.auth(this.props.history);
                    this.props.history.push('/');
                }
                else this.props.history.push('/login');        
            
            } else {
                this.setState({error: resData.massage});
            }

            this.setState({loading: false});
        } catch (error) {
            console.log(error);
            this.setState({error: 'Error, Try again later', loading: false});
        }
    }

    render ()  {
        return <WrappedComponent 
            {...this.props}
            inputHandler={this.inputHandler}
            error={this.state.error}
            loading={this.state.loading}
            inputs={this.state.inputs}
            submitHandler={this.onSubmit}
        />
    }
}

export default withForm;