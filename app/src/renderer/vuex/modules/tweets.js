import * as types from '../mutation-types'

const state = {
  items: []
}

const mutations = {
  [types.ADD_TWEETS] (state, tweets) {
    tweets.forEach((tweet, i) => {
      if (state.items.length > 500) {
        console.log('over 500: ' + i)
        state.items.pop()
        state.items.unshift(tweet)
      } else {
        state.items.unshift(tweet)
      }
    })
  }
}

export default {
  state,
  mutations
}
