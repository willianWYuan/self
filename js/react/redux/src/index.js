import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import App from './redux/App';


const init = 10000

//这是action
const increase = { type: '涨工资' }
const decrease = { type: '扣工资' }

//这是reducer
const reducer = (state = init, action) => {
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
 	Object.assign(Component.prototype, {init: newVal})
});

//需要渲染什么数据
function mapStateToProps(state) {
    return {
        init: state,
        defaultName: 'zhangweiyuan'
    }
}
//需要触发什么行为
function mapDispatchToProps(dispatch) {
    return {
        PayIncrease: num => dispatch({ type: '涨工资', num }),
        PayDecrease: num => dispatch({ type: '扣工资', num })
    }
}

//连接组件
const SubComponent = connect(mapStateToProps, mapDispatchToProps)(App)

ReactDOM.render(
    <Provider store={store}>
        <SubComponent />
    </Provider>,
    document.getElementById('root')
)