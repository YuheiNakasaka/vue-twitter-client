import * as types from '../mutation-types'

const state = {
  items: []
}

const mutations = {
  [types.SET_FAVORITE_FOR_NOTIFICATION] (state, tweet) {
    console.log('favorite')
    tweet.notificationType = 'favorite'
    state.items.push(tweet)
  },
  [types.SET_FOLLOW_FOR_NOTIFICATION] (state, tweet) {
    console.log('follow')
    tweet.notificationType = 'follow'
    state.items.push(tweet)
  },
  [types.SET_MENTION_FOR_NOTIFICATION] (state, tweet) {
    console.log('mention')
    tweet.notificationType = 'mention'
    state.items.push(tweet)
  },
  [types.SET_RT_FOR_NOTIFICATION] (state, tweet, retweeters) {
    console.log('retweet')
    tweet.notificationType = 'retweet'
    tweet.retweeters = retweeters
    state.items.push(tweet)
  }
}

export default {
  state,
  mutations
}
