import * as types from '../mutation-types'

const state = {
  items: []
}

const mutations = {
  [types.SET_LISTS] (state, lists) {
    lists.forEach((list) => {
      state.items.push(list)
    })
  }
}

export default {
  state,
  mutations
}
