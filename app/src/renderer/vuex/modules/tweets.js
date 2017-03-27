import * as types from '../mutation-types'

const state = {
  items: []
}

const mutations = {
  [types.ADD_TWEETS] (state, tweets) {
    tweets.map((tweet) => {
      state.items.unshift(tweet)
    })
  }
}

export default {
  state,
  mutations
}
