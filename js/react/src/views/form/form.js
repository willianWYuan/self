import React, { Component } from 'react';

class form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            numList: []
        }
    }
    componentDidMount() {
        console.log(this)
        let newList = [], number = this.props.match.params.number
        for (let i = 0; i < 200; i++) newList.push(i);
        this.setState({
            numList: newList,
            number: number ? number : 0,
        })
    }
    

    handledChange(ev) {
        // this.setState({ number: ev.target.value })
        ev.preventDefault();
        let val = ev.target.value
        this.setState(prev => ({ number: val }))
    }


    render() {
        let  {number, numList} = this.state;
        let  {handledChange} = this

        return (
            <ul className="form">
                <li><input type="text" value={number} onChange={ev => handledChange.call(this, ev)} /><label>同步数据：{number}</label></li>
                <li><select value={number} onChange={ev => handledChange.call(this, ev)} >  {numList.map(item => <option value={item} key={item}>{item}</option>)}</select></li>
            </ul>
        );
    }
}

export default form;
