<template>
  <div class="profile">
    {{ tweet }}
    <div class="overlay"></div>
    <div class="profile-main">
      <div class="box">
        <div class="main">
          <div class="inner">
            <div class="overlay"></div>
            <div class="bk-img" :style="bkImgStyle(tweet)"></div>
            <div class="icon">
              <span>
                <img :src="tweet.user.profile_image_url"/>
              </span>
            </div>
            <div class="name">
              <span>{{ tweet.user.name }}</span>
            </div>
            <div class="screen-name">
              <span>@{{ tweet.user.screen_name }}</span>
            </div>
            <div class="description">
              <span>{{ tweet.user.description }}</span>
            </div>
            <div class="meta">
              <span class="location">{{ tweet.user.location }}</span>
              <span class="url">
                <a @click="openInOsBrowser(tweet.user.url)">{{ tweet.user.url }}</a>
              </span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="inner">
            <div class="tweets column">
              <span class="label">TWEETS</span>
              <span class="value">{{ tweet.user.statuses_count }}</span>
            </div>
            <div class="followings column">
              <span class="label">FOLLOWING</span>
              <span class="value">{{ tweet.user.friends_count }}</span>
            </div>
            <div class="followers column">
              <span class="label">FOLLOWERS</span>
              <span class="value">{{ tweet.user.followers_count }}</span>
            </div>
            <div class="listed column">
              <span class="label">LISTED</span>
              <span class="value">{{ tweet.user.listed_count }}</span>
            </div>
            <div class="btns column">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { shell } from 'electron'

  export default {
    name: 'profile',
    props: ['tweet'],
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    methods: {
      openInOsBrowser (url) {
        shell.openExternal(url)
      },
      bkImgUrl (tweet) {
        if (tweet.user.profile_banner_url) {
          return tweet.user.profile_banner_url
        } else if (tweet.user.profile_background_image_url) {
          return tweet.user.profile_background_image_url
        }
      },
      bkImgStyle (tweet) {
        return 'background-image: url("' + this.bkImgUrl(tweet) + '"); background-color: #' + tweet.user.profile_background_color + ';background-size: cover; background-position: center; height: 230px; width: 100%;'
      }
    }
  }
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
  z-index: 2000;
}
.profile-main {
  position: fixed;
  top: 50%;
  left: 50%;
  display: block;
  width: 450px;
  height: 280px;
  margin: -150px 0 0 -200px;
  border-radius: 4px;
  z-index: 2001;
  background-color: #fff;
  .box {
    .main {
      width: 100%;
      height: 230px;
      padding: 0 10px;
      position: relative;
      z-index: 1;
      span {
        position: relative;
        z-index: 2;
        width: 100%;
        color: #fff;
      }
      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: #353535;
        opacity: 0.2;
        z-index: 1;
      }
      .bk-img {
        position: absolute;
        width: 100%;
        height: 230px;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 0;
        text-align: center;
        border-radius: 4px 4px 0 0;
      }
      .icon {
        padding: 15px 0;
        text-align: center;
        img {
          width: 55px;
          height: 55px;
          padding: 1px;
          border-radius: 4px;
          background-color: #353535;
        }
      }
      .name {
        margin-bottom: 10px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      }
      .screen-name {
        margin-bottom: 10px;
        text-align: center;
        font-size: 12px;
      }
      .description {
        line-height: 1.4;
        margin-bottom: 10px;
        text-align: center;
        font-size: 11px;
        span {
          text-align: left;
        }
      }
      .meta {
        text-align: center;
        font-size: 12px;
        .url {
          margin-left: 10px;
          a {
            color: #fff;
          }
        }
      }
    }
    .bottom {
      .inner {
        display: flex;
        .column {
          display: inline-block;
          width: 20%;
          height: 50px;
          padding: 8px 10px 10px 10px;
          border-right: 1px solid #eee;
          text-align: center;
          span {
            display: inline-block;
          }
          .label {
            width: 100%;
            text-align: left;
            font-size: 8px;
            color: #999;
          }
          .value {
            width: 100%;
            text-align: left;
            font-weight: bold;
            font-size: 12px;
            color: #333;
          }
        }
      }
    }
  }
}
</style>
