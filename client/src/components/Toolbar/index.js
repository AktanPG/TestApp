import React from 'react';
import { NavLink } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import classes from './index.css';
import Icon from '../UI/Icon';
import Button from '../UI/Button';
import Avatar from '../UI/Avatar';

const Toolbar = props => {
    return (
       <div className={classes.Toolbar} style={{padding: !props.isScrolled ? '1rem' : '0.1rem 1rem'}}>
            <div className={classes.Container}>
                <div className={classes.BrandName}>
                    <NavLink to="/">MPLace</NavLink> 
                </div>
                <div className={classes.Navigation}>
                    {
                        props.isAuth ?
                        <Avatar
                            clicked={() => props.redirectTo('profile')}
                            border={true}   
                            link="https://res.cloudinary.com/grami/image/upload/v1540820982/rgm4xppemxulnyvnsucm.webp"   
                        /> : 
                        null
                    }
                    <Button 
                        value="CREATE" 
                        color="var(--main-color)"
                        textColor="#fff"  
                        clicked={() => props.redirectTo('create')}
                    />
                </div>
                <div className={classes.BurgerButton}>
                    <Icon icon={faBars} clicked={props.openAdaptiveWindow}/>
                </div>
                <div 
                    onClick={props.closeAdaptiveWindow}
                    className={classes.AdaptiveToolbar}
                    style={{
                        transform: props.isOpenAdaptiveWindow ? 'translateX(0)' : 'translateX(-100%)' 
                    }}
                >
                    {
                        props.isAuth ?
                        <Avatar
                            clicked={() => props.redirectTo('profile')}
                            width="100px"
                            height="100px"
                            border={true}   
                            link="https://res.cloudinary.com/grami/image/upload/v1540820982/rgm4xppemxulnyvnsucm.webp"   
                        /> :
                        null
                    }
                    <Button 
                        value="CREATE" 
                        color="var(--main-color)"
                        textColor="#fff"  
                        clicked={() => props.redirectTo('create')}
                    />        
                </div>
            </div>
       </div>
    );
}

export default Toolbar;