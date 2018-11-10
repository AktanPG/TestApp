import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

import classes from './index.css';

class Layout extends Component {

    componentDidMount() {
        this.props.auth(this.props.history); 
    }
    
    render () {
        return (
            <main className={classes.Main}>
                {this.props.children}
            </main>
        );
    }
}

export default connect(null, {auth})(withRouter(Layout));