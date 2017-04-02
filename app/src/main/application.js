import { app, BrowserWindow } from 'electron'
import AuthenticationWindow from './authentication-window'
import Store from '../renderer/libraries/store'

export default class Application {
  constructor () {
    this.store = new Store({ configName: 'user-preferences', defaults: {} })
    this.winURL = process.env.NODE_ENV === 'development'
      ? `http://localhost:${require('../../../config').port}`
      : `file://${__dirname}/index.html`
    this.accessToken = null
    this.accessTokenSecret = null
    this.mainWindow = undefined
  }

  createWindow () {
    this.mainWindow = new BrowserWindow({
      height: 600,
      width: 570
    })

    this.mainWindow.loadURL(this.winURL)

    this.mainWindow.on('closed', () => {
      this.mainWindow = null
    })
  }

  openAuthenticationWindow () {
    let that = this
    let defaultUser = this.store.get('defaultUser')
    if (defaultUser && defaultUser.accessToken && defaultUser.accessTokenSecret && defaultUser.consumerKey && defaultUser.consumerSecret) {
      this.createWindow()
    } else {
      new AuthenticationWindow().on('authentication-succeeded', (res) => {
        this.store.set('defaultUser', {
          user: res.user,
          accessToken: res.accessToken,
          accessTokenSecret: res.accessTokenSecret,
          consumerKey: res.consumerKey,
          consumerSecret: res.consumerSecret
        })
        this.createWindow()
      })
    }
  }

  onReady () {
    this.openAuthenticationWindow()
  }

  registerApplicationCallback () {
    app.on('ready', this.onReady.bind(this))

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })

    app.on('activate', () => {
      if (this.mainWindow === null) {
        this.createWindow()
      }
    })
  }

  run () {
    this.registerApplicationCallback()
  }
}
