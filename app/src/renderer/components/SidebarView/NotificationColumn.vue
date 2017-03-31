<template>
  <div class="notification-inner">
    <div class="notification-box" v-if="notification.notificationType === 'mention'" @click="mention(notification)">
      <div class="inner">
        <div class="left"></div>
        <div class="right">
          <div class="who">
            <span><i class="fa fa-retweet" aria-hidden="true"></i></span>
            <span class="retweeter-icons user-icons">
              <img :src="notification.user.profile_image_url_https"/>
              <span>mentioned your tweet</span>
            </span>
          </div>
          <div class="tweet">
            <div class="texts">
              <span>{{ notification.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notification-box" v-if="notification.notificationType === 'follow'">
      <div class="inner">
        <div class="left"></div>
        <div class="right">
          <div class="who">
            <span><i class="fa fa-user" aria-hidden="true"></i></span>
            <span class="follow-icons user-icons">
              <img :src="notification.profile_image_url_https"/>
              <span>followed you</span>
            </span>
          </div>
          <div class="tweet">
            <div class="texts">
              <span>{{ notification.name }}</span>
              <span>{{ notification.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notification-box mini" v-if="notification.notificationType === 'favorite'">
      <div class="inner">
        <div class="left"></div>
        <div class="right">
          <div class="who">
            <span><i class="fa fa-star" aria-hidden="true"></i></span>
            <span class="retweeter-icons user-icons">
              <img :src="notification.profile_image_url_https"/>
              <span>favorited your tweet</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="notification-box" v-if="notification.notificationType === 'retweet'">
      <div class="inner">
        <div class="left"></div>
        <div class="right">
          <div class="who">
            <span><i class="fa fa-retweet" aria-hidden="true"></i></span>
            <span class="retweeter-icons user-icons">
              <img v-for="url in retweeterIcons(notification.retweeters)" :src="url"/>
              <span>retweeted your tweet</span>
            </span>
          </div>
          <div class="tweet">
            <div class="names">
              <span class="icon"><img :src="notification.user.profile_image_url_https"/></span>
              <span class="name">{{ notification.user.name }}</span>
            </div>
            <div class="texts">
              <span>{{ notification.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'notification-column',
  props: ['notification'],
  computed: {
    ...mapState([
      'sidebar'
    ])
  },
  methods: {
    retweeterIcons (retweeters) {
      return retweeters.slice(0, 5).map((retweeter) => { return retweeter.user.profile_image_url_https })
    },
    mention (tweet) {
      this.$store.dispatch('closeAllBar')
      this.$store.dispatch('toggleTweetBar')
      this.$store.dispatch('updateFormText', {text: '@' + tweet.user.screen_name + ' '})
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-inner {
  .notification-box {
    padding: 5px 0 10px 0;
    border-bottom: 1px solid #eee;
    .user-icons {
      img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        vertical-align: middle;
        border-radius: 4px;
      }
    }
    .inner {
      padding: 5px;
      font-size: 14px;
      .right {
        .who {
          padding: 0 0 10px 0;
          .retweeter-icons {}
        }
        .tweet {
          color: #777;
          .names {
            padding: 0 0 5px 0;
            .name {
              font-size: 11px;
            }
            .icon {
              img {
                width: 18px;
                height: 18px;
                vertical-align: middle;
                border-radius: 4px;
              }
            }
          }
          .texts {
            span {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
  .notification-box.mini {
    padding: 0;
    .who {
      padding: 5px 0 !important;
    }
  }
}
</style>
