import Link from 'next/link'

const Child = (props) => {
	// console.log(props)
	return <div>
		<ul className="list">
			{props.list.map((item, itemIndex) => <li key={itemIndex}><Link prefetch href={"/about?name=join&userId=" + item}><a>{item}</a></Link></li>)}
		</ul>
	</div>
}

export default Child