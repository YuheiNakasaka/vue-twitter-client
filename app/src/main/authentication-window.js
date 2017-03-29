import { BrowserWindow } from 'electron'
import { EventEmitter } from 'events'
import Twitter from 'node-twitter-api'

// Referenced from https://github.com/r7kamura/retro-twitter-client/blob/master/src/browser/authentication-window.js
// and fixed some depricated api
export default class AuthenticationWindow extends EventEmitter {
  constructor (callback) {
    super()
    const twitter = new Twitter({
      callback: 'http://example.com',
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET
    })

    twitter.getRequestToken((error, requestToken, requestTokenSecret) => {
      const url = twitter.getAuthUrl(requestToken)
      this.window = new BrowserWindow({ width: 800, height: 600, 'node-integration': false})
      this.getAccessToken(twitter, requestToken, requestTokenSecret, url)
    })
  }

  getAccessToken(twitter, requestToken, requestTokenSecret, url) {
    let that = this
    this.window.webContents.on('will-navigate', (event, url) => {
      let matched
      if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
        twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
          twitter.verifyCredentials(accessToken, accessTokenSecret, {}, function(error, data, response) {
            if (!error) {
              that.emit(
                'authentication-succeeded',
                {
                  accessToken: accessToken,
                  accessTokenSecret: accessTokenSecret,
                  user: data
                }
              )
            }
          })
        })
        event.preventDefault()
        setImmediate(() => {
          this.window.close()
        })
      } else if (matched = url.match(/&redirect_after_login_verification=([^&]*)/)) {
        this.window.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl, isMainFrame) => {
          this.getAccessToken(twitter, requestToken, requestTokenSecret, newUrl)
        })
      }
    })
    this.window.loadURL(url)
  }
}
