import axios from 'axios'

export default {
  addAction(context, i) { //context相当于store，但并不是store
    context.commit('add', i)
    setTimeout(() => {
      context.commit('lognum', i)
    }, 15)
  },
  reduceAction({
    commit
  }, i) {
    commit('reduce', i)
    setTimeout(() => {
      commit('lognum', i)
    }, 15)
  },
  getList({
    commit
  }) {
    axios.get('../static/list.json')
      .then(res => {
        // console.log(res);
        commit('updateList', res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}