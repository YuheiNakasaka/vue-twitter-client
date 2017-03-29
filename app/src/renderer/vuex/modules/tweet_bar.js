import * as types from '../mutation-types'

const state = {
  isTweetbarOpen: false,
  isListbarOpen: false,
  text: ''
}

const mutations = {
  [types.TOGGLE_TWEET_BAR] () {
    state.isTweetbarOpen = !state.isTweetbarOpen
  },
  [types.TOGGLE_LIST_BAR] () {
    state.isListbarOpen = !state.isListbarOpen
  },
  [types.UPDATE_FORM_TEXT] (state, text) {
    state.text = text
  },
  [types.CLEAR_FORM_TEXT] (state) {
    state.text = ''
  }
}

export default {
  state,
  mutations
}
