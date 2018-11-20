import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

import classes from './index.css';
import Toolbar  from '../../components/Toolbar';
import FullLoader from '../../components/UI/FullLoader';

class Layout extends Component {

    state = {
        isOpenAdaptiveWindow: false,
        isScrolled: false
    }

    componentDidMount() {
        this.props.auth(this.props.history);

        document.addEventListener('scroll', (e) => {
            if(window.scrollY > 100) {
                this.setState({isScrolled: true})
            } else {
                this.setState({isScrolled: false})
            }
        });
    }

    openAdaptiveWindowHandler = () => {
        this.setState({isOpenAdaptiveWindow: true});
    }

    closeAdaptiveWindowHandler = () => {
        this.setState({isOpenAdaptiveWindow: false});
    }

    render () {
        let output = <FullLoader />; 

        if(!this.props.loading) {
            output = (
                <React.Fragment>
                    <Toolbar 
                        isScrolled={this.state.isScrolled}
                        isAuth={this.props.isAuth}
                        openAdaptiveWindow={this.openAdaptiveWindowHandler}
                        closeAdaptiveWindow={this.closeAdaptiveWindowHandler}
                        isOpenAdaptiveWindow={this.state.isOpenAdaptiveWindow}
                    />
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
    loading: state.authState.loading
}), {auth})(withRouter(Layout));