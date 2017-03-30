import * as types from '../mutation-types'

const state = {
  user: null,
  profileOpen: ''
}

const mutations = {
  [types.INIT_USER] (state, user) {
    state.user = user
  },
  [types.TOGGLE_PROFILE] (state, tweet) {
    state.profileOpen = tweet.id
  }
}

export default {
  state,
  mutations
}
