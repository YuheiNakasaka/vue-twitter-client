import * as types from '../mutation-types'

const state = {
  items: []
}

const mutations = {
  [types.ADD_TWEETS] (state, tweets) {
    tweets.map((tweet) => {
      state.items.push(tweet)
    })
  }
}

export default {
  state,
  mutations
}
