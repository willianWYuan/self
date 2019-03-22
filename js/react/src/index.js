import 'react-app-polyfill/ie9'
import 'core-js/es6/map';
import 'core-js/es6/set';
import '@assets/index.css';
import React    from 'react';
import ReactDOM from 'react-dom';
import App      from '@views/App/App';
import Plugin   from '@plugins/plugins';
import * as serviceWorker from './serviceWorker';

Object.assign(React.Component.prototype, Plugin)

// 修改端口 package.json
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
