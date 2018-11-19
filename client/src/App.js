import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Register from './containers/Forms/Register';

class App extends Component {  
    render() {
        return (
            <Layout>
                <Switch>
                  <Route exact path="/" render={() => <h1>Aktan</h1>} />
                  <Route path="/register" component={Register} />
                </Switch>
            </Layout>  
        );      
    }
}

export default App;
