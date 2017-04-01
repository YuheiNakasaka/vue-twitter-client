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

// To switch contents by only one feed,
// need to reset stream of twitter, pooling timer and eventEmitters
function resetFeedFetcher () {
  eventEmitter.emit('resetStream')
  eventEmitter.emit('stopTimerOfList')
  eventEmitter.removeAllListeners()
}

export const toggleTweetBar = (context) => {
  context.commit(types.TOGGLE_TWEET_BAR)
}

export const toggleSearchBar = (context) => {
  context.commit(types.TOGGLE_SEARCH_BAR)
}

export const toggleNotificationBar = (context) => {
  context.commit(types.TOGGLE_NOTIFICATION_BAR)
  context.commit(types.CLEAR_NOTIFICATION_COUNT)
}

export const toggleListBar = (context) => {
  context.commit(types.TOGGLE_LIST_BAR)
}

export const toggleSettingBar = (context) => {
  context.commit(types.TOGGLE_SETTING_BAR)
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

export const follow = (context, payload) => {
  let client = getClient()
  return new Promise((resolve, reject) => {
    client.post('friendships/create', {user_id: payload.tweet.user.id_str}, (error, tweet, response) => {
      if (!error) {
        context.commit(types.FOLLOW, payload.tweet)
        resolve()
      } else {
        console.log(error)
        reject()
      }
    })
  })
}

export const unfollow = (context, payload) => {
  let client = getClient()
  return new Promise((resolve, reject) => {
    client.post('friendships/destroy', {user_id: payload.tweet.user.id_str}, (error, tweet, response) => {
      if (!error) {
        context.commit(types.UNFOLLOW, payload.tweet)
        resolve()
      } else {
        reject()
      }
    })
  })
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

  eventEmitter.on('postTextTweet', (textTweet, mediaIds = []) => {
    return new Promise((resolve, reject) => {
      client.post('statuses/update', {status: textTweet, media_ids: mediaIds}, (error, tweet, response) => {
        if (!error) {
          resolve()
        } else {
          reject()
        }
      })
    })
  })

  eventEmitter.on('uploadImage', (images) => {
    return new Promise((resolve, reject) => {
      let outResolve = resolve
      let mediaIdStrings = []
      _loop()
      function _loop () {
        return new Promise((resolve, reject) => {
          let b64Image = images[mediaIdStrings.length]
          b64Image = b64Image.replace(/^data:image\/.+;base64,/, '')
          client.post('media/upload', {media_data: b64Image}, (error, data, response) => {
            if (!error) {
              mediaIdStrings.push(data.media_id_string)
              resolve()
            } else {
              mediaIdStrings.push(null)
              reject()
            }
          })
        }).then(() => {
          if (images.length === mediaIdStrings.length) {
            console.log('finish', mediaIdStrings.length)
            outResolve(mediaIdStrings.filter((id) => { return id !== null }))
          } else {
            console.log('yet', mediaIdStrings.length)
            _loop()
          }
        })
      }
    }).then((mediaIdStrings) => {
      console.log(mediaIdStrings)
      eventEmitter.emit('postTextTweet', payload.tweet, mediaIdStrings)
    }).catch((e) => {
      console.log('error: ', e)
    })
  })

  if (payload.images.length > 0) {
    eventEmitter.emit('uploadImage', payload.images)
  } else {
    eventEmitter.emit('postTextTweet', payload.tweet)
  }
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
  resetFeedFetcher()
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
  resetFeedFetcher()
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
  resetFeedFetcher()
  context.commit(types.UPDATE_TWEET_NAME, payload.list.full_name)
  context.commit(types.CLEAR_TWEETS)

  client.get('lists/statuses', {list_id: payload.list.id, count: 500}, (error, data, response) => {
    if (!error) {
      let tweets = data.reverse()
      context.commit(types.ADD_TWEETS, tweets)
      eventEmitter.emit('finishFetchListTweetsFirst', tweets[tweets.length - 1])
    }
  })

  let timerOfList
  eventEmitter.on('finishFetchListTweetsFirst', (tweet) => {
    let latestTweet = tweet
    timerOfList = setInterval(() => {
      client.get('lists/statuses', {list_id: payload.list.id, since_id: latestTweet.id_str, count: 10}, (error, data, response) => {
        if (!error) {
          if (data.length > 0) {
            let tweets = data.reverse()
            context.commit(types.ADD_TWEETS, tweets)
            latestTweet = tweets[tweets.length - 1]
          }
        }
      })
    }, 10000)
  })

  eventEmitter.on('stopTimerOfList', () => {
    clearTimeout(timerOfList)
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

export const getNotifications = (context) => {
  let client = getClient()

  // start streaming
  // notification is not stopped
  let stream = client.stream('user', {replies: 'all'})
  stream.on('favorite', (data) => {
    if (data.source.id_str !== context.state.user.user.id_str) {
      context.commit(types.SET_FAVORITE_FOR_NOTIFICATION, data.source)
    }
  })
  stream.on('follow', (data) => {
    if (data.source.id_str !== context.state.user.user.id_str) {
      context.commit(types.SET_FOLLOW_FOR_NOTIFICATION, data.source)
    }
  })
  stream.on('tweet', (data) => {
    let screenName = context.state.user.user.screen_name
    let rexp = new RegExp('@' + screenName)
    if (data.text.match(rexp) && !data.retweeted_status && data.user.id_str !== context.state.user.user.id_str) {
      context.commit(types.SET_MENTION_FOR_NOTIFICATION, data)
    }
  })

  // start timer for retweet
  _startTimerForRT()

  // retweet is monitored with timer
  function _startTimerForRT () {
    // get retweets of my tweets per 30 seconds(api limit)
    let sinceId
    setInterval(() => {
      client.get('statuses/retweets_of_me', {count: 2, since_id: sinceId}, (error, data, response) => {
        if (error) return false
        data.map((dt) => {
          sinceId = data[0].id_str
          eventEmitter.emit('finishGetRetweetOfMe', {retweets: data})
        })
      })
    }, 30000)

    // get users of retweets
    eventEmitter.on('finishGetRetweetOfMe', ({ retweets }) => {
      retweets.forEach((retweet, i) => {
        client.get('statuses/retweets/' + retweet.id_str, {count: 100}, (error, data, response) => {
          if (error) return false
          if (data.length === 0) return false
          eventEmitter.emit('finishGetRetweeters', {retweet: retweet, retweeters: data})
        })
      })
    })

    // publish retweets notification
    eventEmitter.on('finishGetRetweeters', ({ retweet, retweeters }) => {
      context.commit(types.SET_RT_FOR_NOTIFICATION, {retweet: retweet, retweeters: retweeters})
    })
  }
}

export const getMentions = (context) => {
  let client = getClient()
  resetFeedFetcher()
  context.commit(types.UPDATE_TWEET_NAME, 'Mention')
  context.commit(types.CLEAR_TWEETS)

  client.get('statuses/mentions_timeline', {count: 100}, (error, data, response) => {
    if (!error) {
      let tweets = data.reverse()
      context.commit(types.ADD_TWEETS, tweets)
      eventEmitter.emit('finishFetchMentionTweetsFirst', tweets[tweets.length - 1])
    }
  })

  let timerOfMention
  eventEmitter.on('finishFetchMentionTweetsFirst', (tweet) => {
    let latestTweet = tweet
    timerOfMention = setInterval(() => {
      client.get('statuses/mentions_timeline', {since_id: latestTweet.id_str, count: 10}, (error, data, response) => {
        if (!error) {
          if (data.length > 0) {
            let tweets = data.reverse()
            context.commit(types.ADD_TWEETS, tweets)
            latestTweet = tweets[tweets.length - 1]
          }
        }
      })
    }, 30000)
  })

  eventEmitter.on('stopTimerOfList', () => {
    clearTimeout(timerOfMention)
  })
}
