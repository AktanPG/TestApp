import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Register from './containers/Forms/Register';
import Login from './containers/Forms/Login';
import Profile from './containers/Profile';

class App extends Component {  
    render() {
        return (
            <Layout>
                <Switch>
                  <Route exact path="/" render={() => <h1>MainPage</h1>} />
                  <Route path="/register" component={Register} />
                  <Route path="/login" component={Login} />
                  <Route path="/profile" component={Profile} />
                </Switch>
            </Layout>  
        );      
    }
}

export default App;
