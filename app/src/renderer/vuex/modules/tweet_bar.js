import * as types from '../mutation-types'

const state = {
  isTweetbarOpen: false,
  text: ''
}

const mutations = {
  [types.TOGGLE_TWEET_BAR] () {
    state.isTweetbarOpen = !state.isTweetbarOpen
  },
  [types.UPDATE_FORM_TEXT] (state, text) {
    state.text = text
  }
}

export default {
  state,
  mutations
}
