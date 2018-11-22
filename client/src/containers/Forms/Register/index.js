import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from '../index.css';
import withForm from '../../../hoc/withForm';
import Button from '../../../components/UI/Button';
import ButtonLoader from '../../../components/UI/ButtonLoader';

class Register extends Component {
    render () {
        return (
            <div className={classes.Shell}>
                <div className={classes.Form}>
                    <h2>Sign Up</h2>
                    {
                        Object.keys(this.props.inputs)
                        .map(key => this.props.inputs[key])
                        .map((input, index) => {
                            return <input 
                                type={input.type}
                                value={input.value}
                                onChange={(e) => 
                                    this.props.inputHandler(
                                        e, 
                                        Object.keys(this.props.inputs)[index]
                                    )
                                }
                                placeholder={input.placeHolder}    
                                key={index + "-" + input.type}   
                            />
                        })
                    }
                    <div className={classes.ErrorArae}>
                        {this.props.error}
                    </div>
                    <Button 
                        value="submit"
                        color="var(--comain-color)"
                        textColor="#fff"
                        givenClassName={classes.SubmitButton}
                        clicked={!this.props.loading ? () => this.props.submitHandler('register', '/api/auth/register') : null}
                    >
                        {this.props.loading ? <ButtonLoader /> : null}
                    </Button>
                    <div className={classes.Question}>
                        <NavLink to="/login">already have an account</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

const inputs = {
    userName: {
        type: 'text',
        value: '',
        placeHolder: 'Name'
    },
    email: {
        type: 'email',
        value: '',
        placeHolder: 'Email'
    },
    password: {
        type: 'password',
        value: '',
        placeHolder: 'Password'
    }
}

export default withRouter(withForm(Register, inputs));