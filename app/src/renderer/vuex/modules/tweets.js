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
  },
  [types.INCREASE_RT_COUNT] (state, tweet) {
    if (tweet.retweeted === false) {
      state.items[state.items.indexOf(tweet)].retweet_count++
      tweet.retweeted = true
    }
  },
  [types.DECREASE_RT_COUNT] (state, tweet) {
    if (tweet.retweeted === true) {
      state.items[state.items.indexOf(tweet)].retweet_count--
      tweet.retweeted = false
    }
  },
  [types.INCREASE_FAV_COUNT] (state, tweet) {
    if (tweet.favorited === false) {
      state.items[state.items.indexOf(tweet)].favorite_count++
      tweet.favorited = true
    }
  },
  [types.DECREASE_FAV_COUNT] (state, tweet) {
    if (tweet.favorited === true) {
      state.items[state.items.indexOf(tweet)].favorite_count--
      tweet.favorited = false
    }
  }
}

export default {
  state,
  mutations
}
