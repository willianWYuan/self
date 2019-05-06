import React, { Fragment } from 'react'
import Link from 'next/link'

const Child = (props) => {
	// console.log(props)

	function handleChange(index) {
		props.arr[index] += 100;
		console.log(props.arr, index)
	}

	return <Fragment>
		<ul className="list">
			{props.arr.map((item, itemIndex) => <li key={itemIndex} onClick={ev => handleChange(itemIndex)}>{item}</li>)}
			<Link prefetch href={"/about?name=join&userId=1"}><a>about</a></Link>
			{/*{props.arr.map((item, itemIndex) => <li key={itemIndex}><Link prefetch href={"/about?name=join&userId=" + item}><a>{item}</a></Link></li>)}*/}
		</ul>
		<pre>
		    hi there!
		</pre>
	</Fragment>
}

export default Child