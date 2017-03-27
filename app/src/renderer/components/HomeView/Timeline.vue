<template>
  <div class="tweets">
    <div class="tweet" v-for="tweet in latestTweets">
      <!-- {{ tweet }} -->
      <div class="left">
        <img class="user-image" :src="tweet.user.profile_image_url"/>
      </div>
      <div class="right">
        <div class="screen-names">
          <span class="name">{{ tweet.user.name }}</span>
          <span class="screen-name">@{{ tweet.user.screen_name }}</span>
          <span class="time">{{ relativeTime(tweet.created_at) }}</span>
        </div>
        <div class="texts">
          <span>{{ tweet.text }}</span>
        </div>
        <div class="meta">
          <div class="replies btn">
            <span><i class="fa fa-reply" aria-hidden="true"></i></span>
          </div>
          <div class="retweets btn">
            <span><i class="fa fa-retweet" aria-hidden="true"></i></span>
            <span>{{ tweet.retweet_count }}</span>
          </div>
          <div class="favarites btn">
            <span><i class="fa fa-heart-o" aria-hidden="true"></i></span>
            <span>{{ tweet.favorite_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import moment from 'moment'

  export default {
    name: 'timeline',
    data () {
      return {}
    },
    computed: {
      latestTweets () {
        return this.tweets.items.reverse()
      },
      ...mapState([
        'tweets'
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
      }
    },
    created () {
      this.$store.dispatch('getHomeTweets')
    }
  }
</script>

<style lang="scss" scoped>
.tweets {
  min-width: 310px;
  .tweet {
    overflow: hidden;
    position: relative;
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
      }
    }
    .right {
      float: left;
      width: 90%;
      height: 100%;
      padding-left: 10px;
      .screen-names {
        font-size: 12px;
        .name {
          font-weight: bold;
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
          width: 44px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
