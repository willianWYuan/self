import React, { Component } from 'react';

import { Route, Switch, NavLink, Redirect } from 'react-router-dom'
import ChildRouter1 from './childRouter1';
import ChildRouter2 from './childRouter2';
import ChildRouter3 from './childRouter3';


class SubRouter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        console.log(this)
    }
    

    render() {
        let url = this.props.match.url

        return (
            <div className="subrouter">
                <div className="subrouterList">父路由: 
                    <NavLink to={`${url}/c1/11`}>c1</NavLink>
                    <NavLink to={`${url}/c2`}>c2</NavLink>
                    <NavLink to={`${url}/c3`}>c3</NavLink>
                </div>
                <Switch>
                    <Route exact path={`${url}`} render={() => <Redirect to={`${url}/c1`} />} />
                    <Route path={`${url}/c1/:userId?`} component={ChildRouter1} />
                    <Route path={`${url}/c2`}          component={ChildRouter2} />
                    <Route path={`${url}/c3`}          component={ChildRouter3} />
                </Switch>
            </div>
        );
    }
}

export default SubRouter;
