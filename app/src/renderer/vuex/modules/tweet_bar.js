import * as types from '../mutation-types'

const state = {
  isTweetbarOpen: false,
  text: ''
}

const mutations = {
  [types.TOGGLE_TWEET_BAR] () {
    state.isTweetbarOpen = !state.isTweetbarOpen
  },
  [types.ADD_TEXT_TO_FORM] (state, text) {
    state.text = text
  },
  [types.CLEAR_TEXT_FROM_FORM] (state) {
    state.text = ''
  }
}

export default {
  state,
  mutations
}
