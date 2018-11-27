import React, { Component } from 'react';

import classes from '../index.css';
import withForm from '../../../hoc/withForm';
import RenderInptus from '../../../components/RenderInputs/index';
import { NavLink } from 'react-router-dom';
import ButtonLoader from '../../../components/UI/ButtonLoader';

class Registration extends Component {
    // html markup with some javascript logic. Mostly logic about loaders and errors
    render () {
        return (
            <form className={classes.Form}>
                <h2>Registration</h2>
                <RenderInptus {...this.props}/>  
                {
                    this.props.error ?
                    <div className={classes.ErrorArea}>{this.props.error}</div> :
                    null
                }
                <div className={classes.BtnContainer}>
                    <div 
                        className={classes.Button} 
                        onClick={
                            this.props.loading ? null : () => this.props.submit('signup', '/login')
                        }
                    >
                        {this.props.loading ? <ButtonLoader /> : null}
                        Submit
                    </div>    
                </div>     
                <div className={classes.Links}>
                    <NavLink to="/login">Already have an account</NavLink>
                </div>
            </form>
        );
    }
}

// Initialize inputs
const inputs = {
    name: {
        type: 'text',
        value: '',
        placeHolder: 'name'
    },
    email: {
        type: 'text',
        value: '',
        placeHolder: "email"
    },
    password: {
        type: 'password',
        value: '',
        placeHolder: 'password'
    }
}

//Used HOC component to provid funtionality
export default withForm(Registration, inputs);