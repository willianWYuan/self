import React, { Component } from 'react';

class Loop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        // console.log('componentDidMount', React, this);

        let params = {carouselStatus: 1, pageNo: 1, pageSize: 10}
        this.$ajax('/api/carousel/searchList.json', params, ({data}) => this.setState({ list: data.list }))
    }


    editClick(index) {
    	let newList = this.state.list
    	newList[index].carouselTitle += '1';
    	this.setState({list: newList})
    }


    deleteClick(index) {
    	let newList = this.state.list
    	newList.splice(index, 1)
    	this.setState({list: newList})
    }


    render() {
        return (
            <ul className="list">
                {this.state.list.map((item, itemIndex) => itemIndex > 0 ? <li className="flex" key={item.carouselId}><span className="f1">{item.carouselTitle}</span><span onClick={this.editClick.bind(this, itemIndex)}>修改+1</span> <span onClick={this.deleteClick.bind(this, itemIndex)}>删除</span></li> : null)}
            </ul>
        );
    }
}

export default Loop;