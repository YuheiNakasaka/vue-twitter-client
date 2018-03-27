# vue-twitter-client

Twitter client built with Vue.js 2.x + Electron

<img src="https://i.gyazo.com/efa829295518aa44e73e277ce3e7ecf9.png" width="400">

# Install

To try this app, you need to set your consumer key and consumer secret.
[https://github.com/YuheiNakasaka/vue-twitter-client/blob/master/app/src/main/authentication-window.js#L10](https://github.com/YuheiNakasaka/vue-twitter-client/blob/master/app/src/main/authentication-window.js#L10)

And install a repo & build & package it in your local machine like this.

```[example]
$ electron-packager . vue-twitter-client --platform=darwin --arch=x64 --version=0.0.1
```

# Features

- display hometime line
- display image, animated gif and video
- display lists
- display mentions
- show profile
- show some notifications
- search tweet
- tweet text
- tweet text with images
- retweet
- favorite
- reply
- follow/unfollow
- open media with link clicked
- streaming timeline(home, search)
- real time update with pooling(list, mention)

# Development

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
More information can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/docs/npm_scripts.html).

---

This project was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

# License

[MIT](https://opensource.org/licenses/MIT)
