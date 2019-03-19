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
                <li className="f1"><NavLink tag="div" activeClassName="selected" to="/loop" >loop</NavLink></li>
                <li className="f1"><NavLink tag="div" activeClassName="selected" to="/props">props</NavLink></li>
                <li className="f1"><NavLink tag="div" activeClassName="selected" to="/form">form</NavLink></li>
            </ul>
        );
    }
}

export default footer;
