import * as types from './mutation-types'
import Twitter from 'twitter'
import Store from '../libraries/store'

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
      access_token_key: data.accessToken,
      access_token_secret: data.accessTokenSecret
    })
  }
  return client
}

export const toggleTweetBar = (context) => {
  context.commit(types.TOGGLE_TWEET_BAR)
}

export const toggleListBar = (context) => {
  context.commit(types.TOGGLE_LIST_BAR)
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
    client.post('statuses/retweet/' + payload.tweet.id_str, (error, tweet, response) => {
      if (!error) {
        context.commit(types.INCREASE_RT_COUNT, payload.tweet)
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
    client.post('statuses/unretweet/' + payload.tweet.id_str, (error, tweet, response) => {
      if (!error) {
        context.commit(types.DECREASE_RT_COUNT, payload.tweet)
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
    client.post('favorites/create', {id: payload.tweet.id_str}, (error, tweet, response) => {
      if (!error) {
        context.commit(types.INCREASE_FAV_COUNT, payload.tweet)
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
    client.post('favorites/destroy', {id: payload.tweet.id_str}, (error, tweet, response) => {
      if (!error) {
        context.commit(types.DECREASE_FAV_COUNT, payload.tweet)
        resolve()
      } else {
        reject()
      }
    })
  })
}

export const getHomeTweets = (context) => {
  let client = getClient()

  let params = {screen_name: 'razokulover'}
  client.get('statuses/user_timeline', params, (error, tweets, response) => {
    if (!error) {
      context.commit(types.ADD_TWEETS, tweets)
    }
  })
  context.commit(types.UPDATE_TWEET_NAME, 'HOME')
  // client.stream('user', (stream) => {
  //   stream.on('data', (tweet) => {
  //     context.commit(types.ADD_TWEETS, [tweet])
  //   })
  //
  //   stream.on('error', (e) => {
  //     console.log(e)
  //   })
  // })
}

export const getListTweets = (context, payload) => {
  let client = getClient()
  client.get('lists/statuses', {list_id: payload.list.id, count: 500}, (error, data, response) => {
    if (!error) {
      context.commit(types.CLEAR_TWEETS)
      context.commit(types.ADD_TWEETS, data.reverse())
      context.commit(types.UPDATE_TWEET_NAME, payload.list.full_name)
    }
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
