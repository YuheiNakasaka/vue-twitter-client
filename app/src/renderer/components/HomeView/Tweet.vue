<template>
  <div class="container">
    <div class="tweet">
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
            <span @click="toggleReplyForm"><i class="fa fa-reply" aria-hidden="true"></i></span>
          </div>
          <div class="retweets btn">
            <span @click="updateRT(tweet)" :class="{retweeted: tweet.retweeted}"><i class="fa fa-retweet" aria-hidden="true"></i></span>
            <span :class="{retweeted: tweet.retweeted}">{{ tweet.retweet_count }}</span>
          </div>
          <div class="favorites btn">
            <span @click="updateFav(tweet)" :class="{favorited: tweet.favorited}"><i class="fa fa-heart" aria-hidden="true"></i></span>
            <span :class="{favorited: tweet.favorited}">{{ tweet.favorite_count }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'tweet',
    props: ['tweet'],
    data () {
      return {
        tweetable: false,
        retweeted: false,
        favorited: false,
        tweeting: false
      }
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
        if (this.retweeted === false) {
          this.$store.dispatch('postRT', {tweet: tweet})
          this.retweeted = true
        } else {
          this.$store.dispatch('deleteRT', {tweet: tweet})
          this.retweeted = false
        }
      },
      updateFav (tweet) {
        if (this.favorited === false) {
          this.$store.dispatch('postFav', {tweet: tweet})
          this.favorited = true
        } else {
          this.$store.dispatch('deleteFav', {tweet: tweet})
          this.favorited = false
        }
      },
      toggleReplyForm () {
        this.$store.dispatch('toggleTweetBar')
        this.$store.dispatch('addTextToForm', {text: '@' + this.tweet.user.screen_name + ' '})
      }
    }
  }
</script>

<style lang="scss" scoped>
.container {
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
  .reply-form {
    width: 100%;
    clear: both;
    padding: 5px;
    background-color: #4174C0;
    .input-text {
      textarea {
        width: 100%;
        height: 100px;
        padding: 5px;
        font-size: 14px;
        outline: none;
      }
    }
    .btns {
      text-align: right;
      .total-words {
        display: inline-block;
        margin-right: 10px;
        font-size: 13px;
        color: #fff;
      }
      .submit {
        display: inline-block;
        width: 60px;
        padding: 10px;
        font-size: 13px;
        color: #fff;
        background-color: #7094AE;
        opacity: 0.8;
        text-align: center;
      }
    }
  }
}
</style>
