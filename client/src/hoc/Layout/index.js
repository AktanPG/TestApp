import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

import classes from './index.css';
import FullLoader from '../../components/UI/FullLoader';

//Layout for app

class Layout extends Component {

    // when component already mounted
    componentDidMount() {
        this.props.auth(this.props.history);
    }

    // simple redirect handler
    redirectToHandler = (path) => {
        this.props.history.push('/' + path);
    };

    render () {
        // loader
        let output = <FullLoader />; 

        if(!this.props.loading) {
            output = (
                <React.Fragment>
                    <main className={classes.Main}>
                        {this.props.children}   
                    </main>
                </React.Fragment>
            );
        }

        return output;
    }
}

// connect to the store and get state with dispatches
export default connect(state => ({
    isAuth: state.authState.auth,
    loading: state.authState.loading,
    profile: state.profileState.profile
}), { auth })(withRouter(Layout));