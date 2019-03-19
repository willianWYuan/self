import React, { Component } from 'react';

import { HashRouter } from 'react-router-dom'  // BrowserRouter  HashRouter
import RouterFile from '../router';
import Header from '../../components/header';
import Footer from '../../components/footer';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    

    render() {
        return (
            <HashRouter basename="/">
                <Header></Header>
                <RouterFile></RouterFile>
                <Footer></Footer>
            </HashRouter>
        );
    }
}

export default App;
