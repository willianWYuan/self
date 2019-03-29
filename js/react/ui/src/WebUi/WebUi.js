import React, { Component } from 'react';
import "antd/dist/antd.css";
// import TableUi from './Table/Table';
import TreeUi from './Tree/Tree';

class WebUi extends Component {
  render() {
    return (
      <div className="WebUi">
	      <TreeUi></TreeUi>
      </div>
    );
  }
}

export default WebUi;
