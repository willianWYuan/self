import React, { Component } from 'react';

class ShowVal extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		console.log(this)
	}

    render() {

        return (
            <div className="ShowVal">
	            {this.account}
            </div>
        );
    }
}



export default ShowVal;