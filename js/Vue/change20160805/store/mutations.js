export default {
  add(state, i = 1) {
    state.count += i
  },
  reduce(state, i = 1) {
    state.count -= i
  },
  lognum(state) {
    console.log('actions可异步操作 ' + state.count)
  },
  updateList(state, list) {
    state.list = list
    console.log(state)
  },
  addArr(state) {
    state.list.pop()
    console.log(state)
  }
}