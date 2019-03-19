import React, { Component } from 'react';
import Child from './child';

class PropsParent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            childList: [1,2,3,4,5,6]
        }
    }

    

    editClick(index) {   // 生成原型方法     需要更改bind(this)
        let newList = this.state.childList
        newList[index] += 1;
        this.setState({childList: newList})
    }




    handleClick = () => {   // 生成对象方法   this指向实例
        console.log(this)
    }



    render() {
        let { childList } = this.state;
        let { editClick } = this;

        return (
            <div className="props">
                <Child childList={childList} editClick={editClick.bind(this)}>
                    {/*props/children <slot></slot> */}
                    <span className="child-title">数组传入子组件渲染：</span>
                </Child>
            </div>
        );
    }
}

export default PropsParent;
