import * as types from './mutation-types'
import axios from 'axios'

export const getHomeTweets = (context) => {
  return new Promise((resolve, reject) => {
    axios.defaults.baseURL = 'http://localhost:3000'
    axios.get('PATH', {
      params: {}
    })
    .then((response) => {
      types.ADD_TWEETS
      context.commit(types.ADD_TWEETS, response.data.data)
      resolve()
    }).catch((e) => {
      console.log(e)
      reject()
    })
  })
}
