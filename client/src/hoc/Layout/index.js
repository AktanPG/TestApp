import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

import classes from './index.css';
import FullLoader from '../../components/UI/FullLoader';

class Layout extends Component {

    componentDidMount() {
        this.props.auth(this.props.history);
    }

    redirectToHandler = (path) => {
        this.props.history.push('/' + path);
    };

    render () {
        let output = <FullLoader />; 

        if(!this.props.loading) {
            output = (
                <React.Fragment>
        
                    <div className={classes.Container}>
                        <main className={classes.Main}>
                            {this.props.children}   
                        </main>
                    </div>
                </React.Fragment>
            );
        }

        return output;
    }
}

export default connect(state => ({
    isAuth: state.authState.auth,
    loading: state.authState.loading,
    profile: state.profileState.profile
}), { auth })(withRouter(Layout));