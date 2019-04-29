import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Child from './child';



class PropsParent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childList: [1,2,3,4,5,6],
            color: "purple"
        }

    }

    getChildContext() {
        return {color: this.state.color, name: 'zwy'};
    }


    componentDidMount() {
        console.log(this)
    }
    componentWillMount() {
        console.log('componentWillMount', this.state.color)
    }

    editClick(index) {   // 生成原型方法     需要更改bind(this)
        let newList = this.state.childList
        newList[index] += 1;
        this.setState({childList: newList})

        // this.refs  直接获取当前dom元素    如果是组件 则 获取该组件所有信息（dom、state和方法）
        console.log(this.refs.t2.innerHTML)   
    }




    handleClick = () => {   // 生成对象方法   this指向实例
        console.log(this)
    }



    render() {
        let { childList, color } = this.state;
        let { editClick } = this;

        return (
            <div className="props">
                <Child childList={childList} editClick={editClick.bind(this)} {...this.props} ref="t1">
                    {/*props/children <slot></slot> */}
                    <span className="child-title">数组传入子组件渲染：</span>
                </Child>
                <div className="text"  ref="t2" onClick={ev => this.setState({color: ev.target.innerHTML})}>text</div>
            </div>
        );
    }
}

PropsParent.childContextTypes = {
    color: PropTypes.string,
    name: PropTypes.string
};
// getChildContext() {
//     return {color: "purple"};
// }


export default PropsParent;
