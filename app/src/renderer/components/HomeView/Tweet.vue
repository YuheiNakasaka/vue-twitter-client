<template>
  <div class="container">
    <div class="tweet" v-if="tweet.retweeted_status">
      <!-- retweeted component -->
      <profile :tweet="tweet.retweeted_status" v-show="user.profileOpen === tweet.retweeted_status.id"></profile>
      <div class="left">
        <img class="user-image" :src="tweet.retweeted_status.user.profile_image_url" @click="toggleProfile(tweet)"/>
      </div>
      <div class="right">
        <div class="retweet-label">
          <span><i class="fa fa-retweet" aria-hidden="true"></i>{{ tweet.user.name }} retweeted</span>
        </div>
        <div class="screen-names">
          <span class="name" @click="toggleProfile(tweet)">{{ tweet.retweeted_status.user.name }}</span>
          <span class="screen-name">@{{ tweet.retweeted_status.user.screen_name }}</span>
          <span class="time">{{ relativeTime(tweet.retweeted_status.created_at) }}</span>
        </div>
        <div class="texts">
          <tweet-body :tweet="tweet.retweeted_status"></tweet-body>
        </div>
        <div class="meta">
          <div class="replies btn">
            <span @click="toggleReplyForm"><i class="fa fa-reply" aria-hidden="true"></i></span>
          </div>
          <div class="retweets btn">
            <span @click="updateRT(tweet)" :class="{retweeted: tweet.retweeted_status.retweeted}"><i class="fa fa-retweet" aria-hidden="true"></i></span>
            <span :class="{retweeted: tweet.retweeted_status.retweeted}">{{ tweet.retweeted_status.retweet_count }}</span>
          </div>
          <div class="favorites btn">
            <span @click="updateFav(tweet)" :class="{favorited: tweet.retweeted_status.favorited}"><i class="fa fa-heart" aria-hidden="true"></i></span>
            <span :class="{favorited: tweet.retweeted_status.favorited}">{{ tweet.retweeted_status.favorite_count }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tweet" v-else>
      <!-- normal tweet component -->
      <profile :tweet="tweet" v-show="user.profileOpen === tweet.id"></profile>
      <div class="left">
        <img class="user-image" :src="tweet.user.profile_image_url" @click="toggleProfile(tweet)"/>
      </div>
      <div class="right">
        <div class="screen-names">
          <span class="name" @click="toggleProfile(tweet)">{{ tweet.user.name }}</span>
          <span class="screen-name">@{{ tweet.user.screen_name }}</span>
          <span class="time">{{ relativeTime(tweet.created_at) }}</span>
        </div>
        <div class="texts">
          <tweet-body :tweet="tweet"></tweet-body>
        </div>
        <div class="meta">
          <div class="replies btn">
            <span @click="toggleReplyForm"><i class="fa fa-reply" aria-hidden="true"></i></span>
          </div>
          <div class="retweets btn" @click="updateRT(tweet)">
            <span :class="{retweeted: tweet.retweeted}"><i class="fa fa-retweet" aria-hidden="true"></i></span>
            <span :class="{retweeted: tweet.retweeted}">{{ tweet.retweet_count }}</span>
          </div>
          <div class="favorites btn" @click="updateFav(tweet)">
            <span :class="{favorited: tweet.favorited}"><i class="fa fa-heart" aria-hidden="true"></i></span>
            <span :class="{favorited: tweet.favorited}">{{ tweet.favorite_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'
  import TweetBody from './TweetBody'
  import Profile from './Profile'

  export default {
    name: 'tweet',
    props: ['tweet'],
    components: {
      TweetBody,
      Profile
    },
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'user',
        'sidebar'
      ])
    },
    methods: {
      relativeTime (createdAt) {
        moment.locale(
          'en-short',
          {
            relativeTime: {
              d: '1d',
              dd: '%dd',
              future: '%s',
              h: '1h',
              hh: '%dh',
              m: '1m',
              M: '1M',
              mm: '%dm',
              MM: '%dM',
              past: '%s',
              s: 'now',
              y: '1y',
              yy: '%dy'
            }
          }
        )
        return moment(new Date(createdAt)).locale('en-short').fromNow()
      },
      updateRT (tweet) {
        let isRetweeted = tweet.retweeted_status !== undefined ? tweet.retweeted_status.retweeted : tweet.retweeted
        if (isRetweeted === false) {
          this.$store.dispatch('postRT', {tweet: tweet})
        } else if (isRetweeted === true) {
          this.$store.dispatch('deleteRT', {tweet: tweet})
        }
      },
      updateFav (tweet) {
        let isFavorited = tweet.retweeted_status !== undefined ? tweet.retweeted_status.favorited : tweet.favorited
        if (isFavorited === false) {
          this.$store.dispatch('postFav', {tweet: tweet})
        } else if (isFavorited === true) {
          this.$store.dispatch('deleteFav', {tweet: tweet})
        }
      },
      toggleReplyForm () {
        this.$store.dispatch('toggleTweetBar')
        this.$store.dispatch('updateFormText', {text: '@' + this.tweet.user.screen_name + ' '})
      },
      toggleProfile (tweet) {
        this.$store.dispatch('toggleProfile', {tweet: tweet})
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
   border-right: 1px solid #eee;
  .tweet {
    overflow: hidden;
    position: relative;
    // max-width: 500px;
    height: 100%;
    padding: 10px;
    border-bottom: 1px solid #eee;
    .left {
      float: left;
      width: 10%;
      height: 100%;
      text-align: center;
      .user-image {
        width: 36px;
        height: 36px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .right {
      float: left;
      width: 90%;
      height: 100%;
      padding-left: 10px;
      .retweet-label {
        font-size: 10px;
        margin-bottom: 5px;
        color: #999;
        i {
          margin-right: 5px;
          color: #17bf63;
        }
      }
      .screen-names {
        font-size: 12px;
        .name {
          font-weight: bold;
          cursor: pointer;
        }
        .screen-name {
          margin-right: 10px;
          font-size: 10px;
          color: #999;
        }
        .time {
          font-size: 10px;
          color: #999;
        }
      }
      .texts {
        padding-top: 10px;
        font-size: 12px;
        color: #333;
      }
      .meta {
        text-align: right;
        color: #999;
        .btn {
          display: inline-block;
          min-width: 44px;
          text-align: center;
          font-size: 12px;
          cursor: pointer;
        }
        .retweets {
          .retweeted {
            color: #17bf63;
          }
        }
        .favorites {
          .favorited {
            color: #e0245e;
          }
        }
      }
    }
  }
}
</style>
