export default {
  count: state => { 
    console.log(state)
    state.a.count + 1
  }
}