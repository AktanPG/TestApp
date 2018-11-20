import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import classes from '../index.css';
import withForm from '../../../hoc/withForm';
import Button from '../../../components/UI/Button';

class Login extends Component {
    render () {
        return (
            <div className={classes.Shell}>
                <div className={classes.Form}>
                    <h2>Sign In</h2>
                    {
                        Object.keys(this.props.state.inputs)
                        .map(key => this.props.state.inputs[key])
                        .map((input, index) => {
                            return <input 
                                type={input.type}
                                value={input.value}
                                onChange={(e) => 
                                    this.props.inputHandler(
                                        e, 
                                        Object.keys(this.props.state.inputs)[index]
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
                        clicked={() => this.props.submitHandler('login', '/api/auth/login')}
                    />
                    <div className={classes.Question}>
                        <NavLink to="/register">No account</NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

const inputs = {
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

export default withRouter(withForm(Login, inputs));