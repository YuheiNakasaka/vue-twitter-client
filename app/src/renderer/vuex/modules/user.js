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
  },
  [types.CLOSE_PROFILE] (state) {
    state.profileOpen = ''
  }
}

export default {
  state,
  mutations
}
