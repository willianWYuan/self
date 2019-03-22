import React, { Component } from 'react';


class usePlugin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    componentDidMount() {
        console.log('self', this.__proto__.__proto__)
        this.$cookie.add({userId: 1, userName: 13928367790});
    }

    gorender() {
        console.log('gorender')
    }



    render() {
        return (
            <div></div>
        );
    }
}

export default usePlugin;
