import * as types from './mutation-types'
import Twitter from 'twitter'

function getClient () {
  let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
  })
  return client
}

export const toggleTweetBar = (context) => {
  context.commit(types.TOGGLE_TWEET_BAR)
}

export const addTextToForm = (context, payload) => {
  context.commit(types.ADD_TEXT_TO_FORM, payload.text)
}

export const clearTextFromForm = (context) => {
  context.commit(types.CLEAR_TEXT_FROM_FORM)
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
