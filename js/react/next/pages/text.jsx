import { React, Component, axios, withRouter, domain, Layout, _isPhone } from '@component/plugin'

class MyApp extends Component {
    state = {
        color: 'red',
        arr: [],
        isloading: true
    }

    constructor(props) {
        super(props);
    }

    static async getInitialProps(params) {
        // console.log(this, 2)
        return {name: 'MyApp'}
    }

    componentWillMount() {
        // console.log(this)
        this.setState(({arr}) => ({
            arr: [6, 235, 64, 83, 93],
            isloading: false
        }));


    }

    handle(index) {
        this.setState(({arr, color}) => ({
            arr: arr.map((item, itemIndex) => itemIndex == index ? item += 100 : item),
            color: color == 'red' ? 'blue' : 'red',
            isloading: true
        }));
        setTimeout(() => {
            this.setState({isloading: false})
        }, 2000);
    }
  
  render () {
    let {handle} = this
    let {color, arr, isloading} = this.state

    return (
        <Layout isloading={isloading}>
            <span style={{color}} onClick={handle.bind(this)}>color</span>
            <div>
                {arr.map((item, itemIndex) => <p key={itemIndex}  onClick={handle.bind(this, itemIndex)}>{item}</p>)}
            </div>
        </Layout>
    );
  }
}




export default withRouter(MyApp)