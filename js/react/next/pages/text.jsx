import React, {Component, Fragment} from 'react';

class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'red',
            arr: props.arr
        };
    }

    static async getInitialProps(params) {
        console.log(this, 2)
        return {name: 'MyApp', arr: [6, 235, 64, 83, 93] }
    }

    componentDidMount() {
        // console.log(this)
    }

    handle(index) {
        this.setState(({arr, color}) => ({
            arr: arr.map((item, itemIndex) => itemIndex == index ? item += 100 : item),
            color: color == 'red' ? 'blue' : 'red'
        }))
    }
  
  render () {
    let {handle} = this
    let {color, arr} = this.state

    return (
      <Fragment>
          <span style={{color}} onClick={handle.bind(this)}>color</span>
          <div>
            {arr.map((item, itemIndex) => <p key={itemIndex}  onClick={handle.bind(this, itemIndex)}>{item}</p>)}
          </div>
      </Fragment>
    );
  }
}




export default MyApp