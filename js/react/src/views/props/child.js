import React, { Component } from 'react';

class Child extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        console.log(this)
    }


    render() {
        let { childList, editClick, children } = this.props;

        return (
            <div className="child">
                {children}  {/*相当于  <slot></slot>*/} 
                {childList.map((item, itemIndex) => <span className="child-item" key={itemIndex} onClick={ev => editClick(itemIndex)}>{item}</span>)}
            </div>
        );
    }
}

export default Child;
