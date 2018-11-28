import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, changeAvatar } from '../../store/actions/profile';
import { auth } from '../../store/actions/auth';
import axios from 'axios';

import classes from './index.css';
import FullLoader from '../../components/UI/FullLoader';
import Avatar from '../../components/UI/Avatar';

class Profile extends Component {

    constructor (props) {
        super(props);
        
        // create ref to get access for DOM element 
        this.form = React.createRef();
    }

    // get profile when component mounted
    componentDidMount() {
        this.props.getProfile();
    }
    
    // input[type=file] handler
    inputHandler = (e) => {
        if(e.target.files[0] && e.target.files[0].size < 20000) {

            const fd = new FormData(this.form.current); 
            
            this.props.changeAvatar(fd);
        }
    }

    logout = () => {
        axios.post('/api/auth/logout')
            .then(res => {
                if(res.data.logout) {
                    this.props.auth(this.props.history)
                }
            });
    }

    render () {
        return (
            <div className={classes.Container}>
                { !this.props.avatarLoading ? 
                    <form method="POST" encType="multipart/form-data" ref={this.form}>
                        <input 
                            onInput={this.inputHandler}
                            name="avatar"
                            type="file"
                            id="image"
                            accept="image/jpeg, image/png, image/jpg"
                        />
                    </form> : null      
                }   
                {
                    this.props.loading ?
                    <FullLoader /> :
                    <div className={classes.Profile}>
                        <label htmlFor="image">
                            <Avatar 
                                link={this.props.profile.avatar}
                                size="100px"
                                active={this.props.avatarLoading}
                            />
                        </label>
                        <div className={classes.About}>
                            <div className={classes.Name}>{this.props.profile.name}</div>
                            <div className={classes.Email}>{this.props.profile.email}</div>
                            <div className={classes.Logout} onClick={this.logout}>Logout</div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

// redux store
export default connect(state => ({
    profile: state.profileState.profile,
    loading: state.profileState.loading,
    avatarLoading: state.profileState.avatarLoading
}), { getProfile, changeAvatar, auth })(Profile);