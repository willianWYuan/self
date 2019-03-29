import React, { Component } from 'react';
// import AppUi from './AppUi/AppUi';
import WebUi from './WebUi/WebUi';

class App extends Component {
  render() {
    return (
      <div className="page">
        {/*<AppUi></AppUi>*/}
        <WebUi></WebUi>
      </div>
    );
  }
}

export default App;
