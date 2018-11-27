import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../store/actions/profile';

import classes from './index.css';
import FullLoader from '../../components/UI/FullLoader';
import Avatar from '../../components/UI/Avatar';

class Profile extends Component {
    componentDidMount() {
        const id = this.props.location.pathname.split('/')[2];
        
        if(this.props.profile === null) {
            if(id) this.props.getProfile(id);
            else this.props.getProfile();
        }
    }
    
    render () {
        return (
            <div className={classes.Container}>
                {
                    this.props.loading ? 
                    <FullLoader givenClassName={classes.Loader}/> :
                    <div className={classes.Profile}>
                        <form method="POST" encType="multipart/form-data">
                            <input type="file" id="avatar" accept="image/jpeg, images/jpg, image/png"/>
                        </form>
                        <header 
                            className={classes.Header}
                            style={{
                                background: `url('https://vignette.wikia.nocookie.net/moistmeme/images/b/b7/Void.jpg/revision/latest?cb=20150703045152')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundAttachment: 'scroll'
                            }}    
                        >
                            <label htmlFor="avatar">
                                <Avatar 
                                    link={this.props.profile.avatar} 
                                    size="100px"
                                    border={true} 
                                />
                            </label>
                            <div className={classes.UserName}>{this.props.profile.userName}</div>
                        </header>
                    </div>
                }
            </div>
        );
    }
}

export default connect(state => ({
    profile: state.profileState.profile,
    loading: state.profileState.loading
}), { getProfile })(Profile);