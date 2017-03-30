import * as types from './mutation-types'
import Twitter from 'twit'
import Store from '../libraries/store'
import { eventEmitter } from '../libraries/event-emitter'

let client

function getStore () {
  return new Store({ configName: 'user-preferences' })
}

function getClient (accountType = 'defaultUser') {
  let store = getStore()
  let data = store.data.defaultUser

  if (client === undefined) {
    client = new Twitter({
      consumer_key: data.consumerKey,
      consumer_secret: data.consumerSecret,
      access_token: data.accessToken,
      access_token_secret: data.accessTokenSecret
    })
  }
  return client
}

function hasRetweetedStatus (payload) {
  return payload.tweet.retweeted_status !== undefined
}

function getIdStr (payload) {
  if (hasRetweetedStatus(payload)) {
    return payload.tweet.retweeted_status.id_str
  } else {
    return payload.tweet.id_str
  }
}

function resetStream () {
  eventEmitter.emit('resetStream')
  eventEmitter.removeAllListeners()
}

export const toggleTweetBar = (context) => {
  context.commit(types.TOGGLE_TWEET_BAR)
}

export const toggleSearchBar = (context) => {
  context.commit(types.TOGGLE_SEARCH_BAR)
}

export const toggleListBar = (context) => {
  context.commit(types.TOGGLE_LIST_BAR)
}

export const closeAllBar = (context) => {
  context.commit(types.CLOSE_ALL_BAR)
}

export const updateFormText = (context, payload) => {
  context.commit(types.UPDATE_FORM_TEXT, payload.text)
}

export const clearFormText = (context) => {
  context.commit(types.CLEAR_FORM_TEXT)
}

export const initUser = (context) => {
  let store = getStore()
  context.commit(types.INIT_USER, store.data.defaultUser.user)
}

export const toggleProfile = (context, payload) => {
  if (hasRetweetedStatus(payload)) {
    context.commit(types.TOGGLE_PROFILE, payload.tweet.retweeted_status)
  } else {
    context.commit(types.TOGGLE_PROFILE, payload.tweet)
  }
}

export const closeProfile = (context) => {
  context.commit(types.CLOSE_PROFILE)
}

export const postTweet = (context, payload) => {
  let client = getClient()
  return new Promise((resolve, reject) => {
    client.post('statuses/update', {status: payload.tweet}, (error, tweet, response) => {
      if (!error) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

export const postRT = (context, payload) => {
  let client = getClient()
  return new Promise((resolve, reject) => {
    client.post('statuses/retweet/' + getIdStr(payload), (error, tweet, response) => {
      if (!error) {
        if (hasRetweetedStatus(payload)) {
          context.commit(types.INCREASE_RT_COUNT_OF_RT, payload.tweet)
        } else {
          context.commit(types.INCREASE_RT_COUNT, payload.tweet)
        }
        resolve()
      } else {
        reject()
      }
    })
  })
}

export const deleteRT = (context, payload) => {
  let client = getClient()
  return new Promise((resolve, reject) => {
    client.post('statuses/unretweet/' + getIdStr(payload), (error, tweet, response) => {
      if (!error) {
        if (hasRetweetedStatus(payload)) {
          context.commit(types.DECREASE_RT_COUNT_OF_RT, payload.tweet)
        } else {
          context.commit(types.DECREASE_RT_COUNT, payload.tweet)
        }
        resolve()
      } else {
        reject()
      }
    })
  })
}

export const postFav = (context, payload) => {
  let client = getClient()
  return new Promise((resolve, reject) => {
    client.post('favorites/create', {id: getIdStr(payload)}, (error, tweet, response) => {
      if (!error) {
        if (hasRetweetedStatus(payload)) {
          context.commit(types.INCREASE_FAV_COUNT_OF_RT, payload.tweet)
        } else {
          context.commit(types.INCREASE_FAV_COUNT, payload.tweet)
        }
        resolve()
      } else {
        reject()
      }
    })
  })
}

export const deleteFav = (context, payload) => {
  let client = getClient()
  return new Promise((resolve, reject) => {
    client.post('favorites/destroy', {id: getIdStr(payload)}, (error, tweet, response) => {
      if (!error) {
        if (hasRetweetedStatus(payload)) {
          context.commit(types.DECREASE_FAV_COUNT_OF_RT, payload.tweet)
        } else {
          context.commit(types.DECREASE_FAV_COUNT, payload.tweet)
        }
        resolve()
      } else {
        reject()
      }
    })
  })
}

export const getHomeTweets = (context) => {
  let client = getClient()
  resetStream()
  context.commit(types.UPDATE_TWEET_NAME, 'HOME')
  context.commit(types.CLEAR_TWEETS)
  // first, get tweets with rest api
  client.get('statuses/home_timeline', {count: 20}, (error, data, response) => {
    if (!error) {
      context.commit(types.ADD_TWEETS, data.reverse())
      eventEmitter.emit('finishFetchHomeTimeline')
    }
  })

  // second, start streaming
  let stream
  eventEmitter.on('finishFetchHomeTimeline', () => {
    stream = client.stream('user')
    stream.on('tweet', (tweet) => {
      context.commit(types.ADD_TWEETS, [tweet])
    })
    stream.on('error', (e) => {
      console.log(e)
    })
  })

  eventEmitter.on('resetStream', () => {
    stream.stop()
  })
}

export const getSearchTweets = (context, payload) => {
  let client = getClient()
  resetStream()
  context.commit(types.UPDATE_TWEET_NAME, 'Search: ' + payload.q)
  context.commit(types.CLEAR_TWEETS)
  client.get('search/tweets', {q: payload.q, count: 100}, (error, data, response) => {
    if (!error) {
      context.commit(types.ADD_TWEETS, data.statuses.reverse())
      eventEmitter.emit('finishFetchSearchTweets')
    }
  })

  let stream
  eventEmitter.on('finishFetchSearchTweets', () => {
    stream = client.stream('statuses/filter', {track: payload.q})
    stream.on('tweet', (tweet) => {
      context.commit(types.ADD_TWEETS, [tweet])
    })
    stream.on('error', (e) => {
      console.log(e)
    })
  })

  eventEmitter.on('resetStream', () => {
    stream.stop()
  })
}

export const getListTweets = (context, payload) => {
  let client = getClient()
  resetStream()
  context.commit(types.UPDATE_TWEET_NAME, payload.list.full_name)
  context.commit(types.CLEAR_TWEETS)
  client.get('lists/statuses', {list_id: payload.list.id, count: 500}, (error, data, response) => {
    if (!error) {
      context.commit(types.ADD_TWEETS, data.reverse())
      eventEmitter.emit('finishFetchListTweets')
    }
  })

  let userIds
  eventEmitter.on('finishFetchListTweets', () => {
    client.get('lists/members', {list_id: payload.list.id, count: 5000}, (error, data, response) => {
      if (!error) {
        userIds = data.users.map((user) => user.id).join(',')
        console.log(userIds)
        eventEmitter.emit('finishFetchListMembers')
      }
    })
  })

  let stream
  eventEmitter.on('finishFetchListMembers', () => {
    stream = client.stream('statuses/filter', {follow: userIds})
    stream.on('tweet', (tweet) => {
      context.commit(types.ADD_TWEETS, [tweet])
    })
    stream.on('error', (e) => {
      console.log(e)
    })
    stream.on('message', (msg) => {
      console.log(msg)
    })
  })

  eventEmitter.on('resetStream', () => {
    stream.stop()
  })
}

export const getMyList = (context) => {
  let client = getClient()
  client.get('lists/list', {user_id: context.state.user.user.id, screen_name: context.state.user.user.screen_name}, (error, data, response) => {
    if (!error) {
      context.commit(types.SET_LISTS, data)
    }
  })
}
