import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            author: 'zwy',
            number: 1,
            list: ['one','two','three','four','five']
        }
        console.log(this)
    }
    componentDidMount() {
        // 挂载后
    }

    changeState(ev) {
        ev.preventDefault();
        this.setState(({number, isflog}, props) => ({number: number + 1, isflog: !isflog}));
    }


    


    render() {
        const RenderList = ({dataList}) => <div>{dataList.map((item, itemIndex) => <b key={itemIndex+1}>{item}</b>)}</div>;


        
        let { author, number, isflog, list } = this.state
        let { title, updateTitle } = this.props


        return (
            <div className="user">
                <h1 onClick={this.changeState.bind(this)}>{author}</h1>
                {number}、{title}<br />{ !isflog ? 'isflog true显示' : '' }
                <RenderList dataList={list} />

                <input type="text" value={title} onChange={ev => updateTitle(ev.target.value)} ref="myInput" />
                <button onClick={ev => alert(this.refs.myInput.value)}>button</button>
            </div>
        );

      
    }
}

export default User;
