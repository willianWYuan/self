import React, { Component } from 'react';
import Test from './test'
import ShowVal from './showVal'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		Object.assign(Component.prototype, props)
	}

	componentDidMount() {

	}

    render() {
        // const { PayIncrease, PayDecrease, tiger } = this.props;
        return (
            <div className="App">
                <ShowVal></ShowVal>
	            <Test></Test>
            </div>
        );
    }
}


export default App