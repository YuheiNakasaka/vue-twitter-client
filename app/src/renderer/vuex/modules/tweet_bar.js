import * as types from '../mutation-types'

const state = {
  isTweetbarOpen: false
}

const mutations = {
  [types.TOGGLE_TWEET_BAR] () {
    state.isTweetbarOpen = !state.isTweetbarOpen
  }
}

export default {
  state,
  mutations
}
