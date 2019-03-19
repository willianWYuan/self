import React, { Component } from 'react';
// import * as module from 'react-router-dom'

// console.log(module)

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    componentDidMount() {
        // console.log(this.$ajax)
    }




    render() {
        return (
            <header className="header flex">
                <div className="header-lr"></div>
                <div className="header-title f1">Router</div>
                <div className="header-lr"></div>
            </header>
        );
    }
}

export default App;
