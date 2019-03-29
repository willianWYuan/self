import React, { Component } from 'react';

import { Route, Switch, Redirect } from 'react-router-dom'
import Loop      from '@views/Loop/Loop';
import Props     from '@views/props/props';
import Form      from '@views/form/form';
import SubRouter from '@views/SubRouter/subRouter';
import UsePlugin from '@views/usePlugin/usePlugin';




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
                <Route path='/useplugin'     render={props => isLogin.call(this, true)  ? <UsePlugin {...props} /> : <Redirect to="/login" />} />
                <Route path='/noLogin'       render={props => isLogin.call(this, false) ? <Loop      {...props} /> : <Redirect to="/login" />} />

                {/*<Route path='/props' component={Props} />*/}
            </Switch>
        );
    }
}

export default Router;
