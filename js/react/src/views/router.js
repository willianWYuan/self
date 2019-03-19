import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import Loop from './Loop/Loop';
import Props from './props/props';
import Form from './form/form';

class Router extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }






    render() {
        function isLogin() {
            console.log('未登录')
        }

        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/loop" />} />
                <Route exact path='/props'         render={() => isLogin()} component={Props}/>
                <Route exact path='/loop'          render={() => isLogin()} component={Loop}/>
                <Route exact path='/form/:number?' render={() => isLogin()} component={Form}/>
            </Switch>
        );
    }
}

export default Router;
