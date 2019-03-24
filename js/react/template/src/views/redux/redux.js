import React, { Component, PropTypes } from 'react';

import { createStore } from 'redux';



class Redux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    componentDidMount() {
        // console.log(this)
        function counter(state = 0, action) {
            switch (action.type) {
                case 'INCREMENT':
                    return state + 1
                case 'DECREMENT':
                    return state - 1
                default:
                    return state
            }
        }
        let store = createStore(counter)
        store.subscribe(() => console.log(store.getState()))
        store.dispatch({ type: 'INCREMENT' })
        store.dispatch({ type: 'INCREMENT' })
        store.dispatch({ type: 'DECREMENT' })
    }




    render() {
        return (
            <div>11</div>
        );
    }
}

export default Redux;
