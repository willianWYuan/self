import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import Loop from './Loop/Loop';
import Props from './props/props';
import Form from './form/form';
import SubRouter from './SubRouter/subRouter';




class Router extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    isLogin(flog){
        // console.log('isLogin', this)
        return flog
    }



    render() {
        let  { isLogin } = this

        return (
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/loop" />} />
                <Route path='/props'         render={props => isLogin.call(this, true)  ? <Props     {...props} /> : <Redirect to="/login" />} />
                <Route path='/loop'          render={props => isLogin.call(this, true)  ? <Loop      {...props} /> : <Redirect to="/login" />} />
                <Route path='/form/:number?' render={props => isLogin.call(this, true)  ? <Form      {...props} /> : <Redirect to="/login" />} />
                <Route path='/subrouter'     render={props => isLogin.call(this, true)  ? <SubRouter {...props} /> : <Redirect to="/login" />} />
                <Route path='/noLogin'       render={props => isLogin.call(this, false) ? <Loop      {...props} /> : <Redirect to="/login" />} />

                {/*<Route path='/props' component={Props} />*/}
            </Switch>
        );
    }
}

export default Router;
