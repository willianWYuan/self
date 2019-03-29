import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import DatePacker from './DatePacker/DatePacker';

class AppUi extends Component {
  render() {
    return (
      <div className="AppUi">
	      <DatePacker></DatePacker>
      </div>
    );
  }
}

export default AppUi;
