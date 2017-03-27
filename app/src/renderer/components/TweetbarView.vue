<template>
  <div class="tweet-box" v-show="open">
    <div class="tweet-forms">
      <div class="form">
        <div class="title">
          <span class="label">New Tweet</span>
        </div>
        <div class="from">
          <span class="label">From</span>
        </div>
        <div class="input-text">
          <textarea v-model="tweet"></textarea>
        </div>
        <div class="btns">
          <div class="total-words">
            <span>{{ wordCount }}</span>
          </div>
          <div class="submit" :class="{ active: tweetable }" @click="postTweet">
            <span>Tweet</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tweetbar-view',
  props: ['open'],
  data () {
    return {
      tweet: '',
      tweetable: false
    }
  },
  watch: {
    tweet () {
      let totalWord = 140 - this.tweet.length
      if (totalWord < 140 && totalWord > 0) {
        this.tweetable = true
      } else {
        this.tweetable = false
      }
    }
  },
  computed: {
    wordCount () {
      return 140 - this.tweet.length
    }
  },
  methods: {
    postTweet () {
      this.$store.dispatch('postTweet', {tweet: this.tweet}).then((res) => {
        this.$emit('tweetToggle')
        this.tweet = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet-box {
  .tweet-forms {
    width: 260px;
    padding: 0 5px;
    .title {
      padding: 20px 10px;
      border-bottom: 1px solid #7094AE;
      color: #fff;
    }
    .from {
      padding: 20px 10px;
      color: #fff;
      .label {
      }
    }
    .input-text {
      padding: 20px 10px;
      textarea {
        width: 100%;
        height: 140px;
        padding: 5px;
        font-size: 14px;
      }
    }
    .btns {
      text-align: right;
      padding: 0 10px;
      .total-words {
        display: inline-block;
        margin-right: 10px;
        font-size: 13px;
        color: #fff;
      }
      .submit {
        display: inline-block;
        padding: 10px;
        font-size: 13px;
        color: #fff;
        background-color: #7094AE;
        opacity: 0.8;
      }
      .submit.active {
        background-color: #569CFF;
        opacity: 1;
      }
    }
  }
}
</style>
