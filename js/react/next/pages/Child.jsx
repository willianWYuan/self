import { Fragment, Link } from '@component/plugin'
import { Button, DatePicker } from 'antd';

const Child = (props) => {
	// console.log(props)

	function handleChange(index) {
		props.arr[index] += 100;
		console.log(props.arr, index)
	}
	function onChange(date, dateString) {
		console.log(date, dateString);
	}

	return <Fragment>
		<ul className="list">
			{props.arr.map((item, itemIndex) => <li key={itemIndex} onClick={ev => handleChange(itemIndex)}>{item}</li>)}
			<Link prefetch href={"/about?name=join&userId=1"}><Button type="primary">about</Button></Link>
			{/*{props.arr.map((item, itemIndex) => <li key={itemIndex}><Link prefetch href={"/about?name=join&userId=" + item}><a>{item}</a></Link></li>)}*/}
		</ul>
		<DatePicker onChange={onChange} />
		<pre>
		    hi there!
		</pre>
	</Fragment>
}

export default Child