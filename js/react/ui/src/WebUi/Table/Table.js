import React, { Component } from 'react';
import { Table, Divider, Tag, Button } from 'antd';


const columns = [
	{ title: 'Name',     dataIndex: 'name',     width: 180, key: 'name',      render: text => <span>{text}</span>, fixed: 'left'},
	{ title: 'Age',      dataIndex: 'age',      width: 80,  key: 'age'},
	{ title: 'Address',  dataIndex: 'address',  width: 450, key: 'address'},
	{ title: 'Content1', dataIndex: 'content1', width: 150, key: 'content1'},
	{ title: 'Content2', dataIndex: 'content2', width: 150, key: 'content2'},
	{ title: 'Content3', dataIndex: 'content3', width: 150, key: 'content3'},
	{ title: 'Content4', dataIndex: 'content4', width: 250, key: 'content4'},
	{ title: 'Content5', dataIndex: 'content5', width: 250, key: 'content5'},
	{ title: 'Content6', dataIndex: 'content6', width: 150, key: 'content6'},
	{ title: 'Content7', dataIndex: 'content7', width: 150, key: 'content7'},
	{ title: 'Content8', dataIndex: 'content8', width: 150, key: 'content8'},
	{ title: 'Content9', dataIndex: 'content9', width: 150, key: 'content9'},
	{ title: 'Tags',    dataIndex: 'tags',    width: 250, key: 'tags',     render: tags => (
	    <span>
	    	{tags.map(tag => {
	    		let color = tag.length > 5 ? 'geekblue' : 'green';
	    		if (tag === 'loser') color = 'volcano';
	    		return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
	    	})}
	    </span>
	)},
	{ title: 'Action',   width: 250, key: 'action', render: (text, record) => (
	    <span>
	    	<span>Invite {record.name}</span>
	    	<Divider type="vertical" />
	    	<span>Delete</span>
	    </span>
    )},
    { title: 'Editt', width: 250, fixed: 'right', render: (text, record) => (
	    <div className="edit">
	    	<Button type="primary" size="small" className="bj">编辑</Button>
	    	<Button type="danger" size="small" onClick={ _ => console.log(record) }>删除</Button>
	    </div>
    ) },
];



class TableUi extends Component {
	state = {
		data: [],
		isShow: true
	}

	componentDidMount() {
		let list = [];
		for (let i = 0; i < 140; i++) {
			list.push({
				key: i,
				name: 'John Brown',
				age: 32 + i,
				address: `New York No. ${i} Lake Park`,
				tags: ['nice', 'developer'],
				content1: `的故事是结合的条件太久没翻译家门口的富豪时代天街打扰她金蝶软件杀毒软件${i}`,
				content2: `content${i}`,
				content3: `content${i}`,
				content4: `基督教啊虽然京东金融都没收content\ncontentcontent到让你说是让杀毒软件没地方煤矿非国有，关于十多个宾水西道你说的第九名色软件的人健康${i}`,
				content5: `datacontentheader${i}`,
				content6: `content${i}`,
				content7: `content${i}`,
				content8: `content${i}`,
				content9: `content${i}`,
			})
		}
		setTimeout(_ => {
			this.setState({
				isShow: false,
				data: list
			})
		}, 50)
	}

	render() {
		let {data, isShow} = this.state

		let scroll = {x: 0, y: 0}
		scroll.y = document.body.clientHeight - 120;
		columns.map(item => scroll.x += item.width);

		return (
			<Table 
				bordered 
				scroll={scroll}
				loading={isShow} 
				columns={columns} 
				pagination={{ pageSize: 30 }} 
				dataSource={data} 
				onRow={(record) => {
				    return {
				      // onClick: (event) => console.log(event.target.innerHTML),       // 点击行
				      onDoubleClick: (event) => {},
				      onContextMenu: (event) => {},
				      onMouseEnter: (event) => {},  // 鼠标移入行
				      onMouseLeave: (event) => {}
				    };
				}}
			/>
		);
	}
}

export default TableUi;
