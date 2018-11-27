import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Registration from './containers/Forms/Registration';
import Login from './containers/Forms/Login';
import Profile from './containers/Profile';

class App extends Component {  
    render() {
        return (
            <Layout>
                <Switch>
                  <Route exact path="/" component={Profile} />
                  <Route path="/register" component={Registration} />
                  <Route path="/login" component={Login} />
                </Switch>
            </Layout>  
        );      
    }
}

export default App;
