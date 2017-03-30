import * as types from '../mutation-types'

const state = {
  tweetName: '',
  items: []
}

const mutations = {
  [types.UPDATE_TWEET_NAME] (state, name) {
    state.tweetName = name
  },
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
  [types.CLEAR_TWEETS] (state) {
    state.items = []
  },
  [types.INCREASE_RT_COUNT] (state, tweet) {
    if (tweet.retweeted === false) {
      state.items[state.items.indexOf(tweet)].retweet_count++
      tweet.retweeted = true
    }
  },
  [types.INCREASE_RT_COUNT_OF_RT] (state, tweet) {
    if (tweet.retweeted_status.retweeted === false) {
      state.items[state.items.indexOf(tweet)].retweeted_status.retweet_count++
      tweet.retweeted_status.retweeted = true
    }
  },
  [types.DECREASE_RT_COUNT] (state, tweet) {
    if (tweet.retweeted === true) {
      state.items[state.items.indexOf(tweet)].retweet_count--
      tweet.retweeted = false
    }
  },
  [types.DECREASE_RT_COUNT_OF_RT] (state, tweet) {
    if (tweet.retweeted_status.retweeted === true) {
      state.items[state.items.indexOf(tweet)].retweeted_status.retweet_count--
      tweet.retweeted_status.retweeted = false
    }
  },
  [types.INCREASE_FAV_COUNT] (state, tweet) {
    if (tweet.favorited === false) {
      state.items[state.items.indexOf(tweet)].favorite_count++
      tweet.favorited = true
    }
  },
  [types.INCREASE_FAV_COUNT_OF_RT] (state, tweet) {
    if (tweet.retweeted_status.favorited === false) {
      state.items[state.items.indexOf(tweet)].retweeted_status.favorite_count++
      tweet.retweeted_status.favorited = true
    }
  },
  [types.DECREASE_FAV_COUNT] (state, tweet) {
    if (tweet.favorited === true) {
      state.items[state.items.indexOf(tweet)].favorite_count--
      tweet.favorited = false
    }
  },
  [types.DECREASE_FAV_COUNT_OF_RT] (state, tweet) {
    if (tweet.retweeted_status.favorited === true) {
      state.items[state.items.indexOf(tweet)].retweeted_status.favorite_count--
      tweet.retweeted_status.favorited = false
    }
  }
}

export default {
  state,
  mutations
}
