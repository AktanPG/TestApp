import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';

class App extends Component {  
    render() {
        return (
            <Layout>
                <Switch>
                  <Route path="/" render={() => <h1>Aktan</h1>}/>
                </Switch>
            </Layout>  
        );
    }
}

export default App;
