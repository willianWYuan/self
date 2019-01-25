import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import '../assets/App.css';
import User from './user/user';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = { title: 'App pages' };
  }

  componentDidMount() {
  }



  updateTitle(str) {   // 子组件调用这个方法
    // console.log(this)
    this.setState({title: str});
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <p>{this.state.title}</p>
          <User title={this.state.title} updateTitle={this.updateTitle.bind(this)} />
        </header>
      </div>
    );
  }
}

export default App;
