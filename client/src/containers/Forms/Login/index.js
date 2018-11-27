import React, { Component } from 'react';

import classes from '../index.css';
import withForm from '../../../hoc/withForm';
import RenderInptus from '../../../components/RenderInputs/index';
import { NavLink } from 'react-router-dom';
import ButtonLoader from '../../../components/UI/ButtonLoader';

class Login extends Component {
    // html markup with some javascript logic. Mostly logic about loaders and errors
    render () {
        return (
            <form className={classes.Form}>
                <h2>Login</h2>
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
                            this.props.loading ? null : () => this.props.submit('login', '/')
                        }
                    >
                        {this.props.loading ? <ButtonLoader /> : null}
                        Submit
                    </div>    
                </div>           
                <div className={classes.Links}>
                    <NavLink to="/register">No account</NavLink>
                </div>
            </form>
        );
    }
}

// init inputs
const inputs = {
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

// hoc to provide logic
export default withForm(Login, inputs);