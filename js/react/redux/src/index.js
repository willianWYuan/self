import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import App from './redux/App';




const account = 10000

//这是action
// const increase = { field: '涨工资' }
// const decrease = { field: '扣工资' }

//这是reducer
const reducer = (state = account, action) => {
    console.log(state, action)
	let {type, num} = action
    switch (type) {
        case '涨工资':
            return state += num;
        case '扣工资':
            return state -= num;
        default:
            return state;
    }
}


//创建store
const store = createStore(reducer);
store.subscribe(() =>{
 	let newVal = store.getState()
 	Object.assign(Component.prototype, {account: newVal})
});



//连接组件
const SubComponent = connect(state => ({
    account: state
}), dispatch => ({
    PayIncrease: num => dispatch({ type: '涨工资', num }),
    PayDecrease: num => dispatch({ type: '扣工资', num })
}))(App)

ReactDOM.render(
    <Provider store={store}>
        <SubComponent />
    </Provider>,
    document.getElementById('root')
)