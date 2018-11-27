import React, { Component } from 'react';

//High order component to dont repeat form logic

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

    submit = (type, path) => {

        this.setState({loading: true}, () => {
            
            const data = {}
        
            Object.keys(this.state.inputs).map(key => data[key] = this.state.inputs[key].value);

            fetch(type === 'signup' ? '/api/auth/signup' : '/api/auth/login', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            })
                .then(res => {
                    return res.json();
                })
                .then(resData => {

                    if(resData[type]) { 
                        this.setState({loading: false}, () => {
                            this.props.history.push(path);
                        });
                    } else {
                        this.setState({loading: false, error: resData.massage});
                    }

                })
                .catch(error => {
                    console.log(error);
                    this.setState({error, loading: false});
                });

        });

    }

    render ()  {
        return <WrappedComponent 
            {...this.props}
            submit={this.submit}
            inputs={this.state.inputs}
            inputHandler={this.inputHandler}
            error={this.state.error}
            loading={this.state.loading}
        />
    }
}

export default withForm;