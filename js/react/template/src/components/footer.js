import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

// console.log(BrowserRouter, Route, Switch)

class footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    



    render() {
        return (
            <ul className="footer flex">
                <li className="f1"><NavLink to="/loop" >loop</NavLink></li>
                <li className="f1"><NavLink to="/props">props</NavLink></li>
                <li className="f1"><NavLink to="/form">form</NavLink></li>
                <li className="f1"><NavLink to="/subrouter">router</NavLink></li>
                <li className="f1"><NavLink to="/useplugin">plugin</NavLink></li>
                <li className="f1"><NavLink to="/noLogin">noLogin</NavLink></li>
            </ul>
        );
    }
}

export default footer;
