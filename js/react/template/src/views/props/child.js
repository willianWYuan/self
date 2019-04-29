import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        let { color } = this.context;

        return (
            <div className="child">
                {children}  {/*相当于  <slot></slot>*/} 
                {childList.map((item, itemIndex) => <span className="child-item" key={itemIndex} onClick={ev => editClick(itemIndex)}>{item}</span>)}
                <br />
                <br />
                context传的值是color：{color}
                <br />
                <br />
            </div>
        );
    }
}


Child.contextTypes = {
    color: PropTypes.string,
    name: PropTypes.string
};


export default Child;
