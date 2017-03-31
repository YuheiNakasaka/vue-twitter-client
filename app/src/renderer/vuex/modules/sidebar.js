import * as types from '../mutation-types'

const state = {
  isTweetbarOpen: false,
  isSearchbarOpen: false,
  isNotificationbarOpen: false,
  isListbarOpen: false,
  text: ''
}

const mutations = {
  [types.TOGGLE_TWEET_BAR] () {
    state.isTweetbarOpen = !state.isTweetbarOpen
  },
  [types.TOGGLE_SEARCH_BAR] () {
    state.isSearchbarOpen = !state.isSearchbarOpen
  },
  [types.TOGGLE_NOTIFICATION_BAR] () {
    state.isNotificationbarOpen = !state.isNotificationbarOpen
  },
  [types.TOGGLE_LIST_BAR] () {
    state.isListbarOpen = !state.isListbarOpen
  },
  [types.CLOSE_ALL_BAR] () {
    state.isTweetbarOpen = false
    state.isSearchbarOpen = false
    state.isNotificationbarOpen = false
    state.isListbarOpen = false
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
