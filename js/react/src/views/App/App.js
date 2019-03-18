import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {


  componentDidMount() {
    console.log('componentDidMount', React, this);

    React.$ajax('/api/carousel/searchList.json', {
      carouselStatus: 1,
      pageNo: 1,
      pageSize: 10
    }, data => console.log(data))
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
