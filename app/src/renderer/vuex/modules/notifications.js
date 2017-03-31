import * as types from '../mutation-types'

const state = {
  items: [],
  visibleNotificationCount: 0
}

const mutations = {
  [types.SET_FAVORITE_FOR_NOTIFICATION] (_state, tweet) {
    console.log('favorite')
    tweet.notificationType = 'favorite'
    state.items.push(tweet)
    state.visibleNotificationCount++
  },
  [types.SET_FOLLOW_FOR_NOTIFICATION] (_state, tweet) {
    console.log('follow')
    tweet.notificationType = 'follow'
    state.items.push(tweet)
    state.visibleNotificationCount++
  },
  [types.SET_MENTION_FOR_NOTIFICATION] (_state, tweet) {
    console.log('mention')
    tweet.notificationType = 'mention'
    state.items.push(tweet)
    state.visibleNotificationCount++
  },
  [types.SET_RT_FOR_NOTIFICATION] (_state, payload) {
    console.log('retweet')
    payload.retweet.notificationType = 'retweet'
    payload.retweet.retweeters = payload.retweeters
    state.items.push(payload.retweet)
    state.visibleNotificationCount++
  },
  [types.CLEAR_NOTIFICATION_COUNT] (_state) {
    state.visibleNotificationCount = 0
  }
}

export default {
  state,
  mutations
}
