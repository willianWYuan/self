import React, { Component } from 'react';

class Test extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		console.log(this)
	}

    render() {

        return (
            <div className="Test">
	            <button onClick={() => this.PayIncrease(36)}>升职加薪</button>
	            <button onClick={() => this.PayDecrease(36)}>迟到罚款</button>
            </div>
        );
    }
}



export default Test;
