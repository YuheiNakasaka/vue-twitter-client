<template>
  <div class="tweet-box" v-show="sidebar.isTweetbarOpen">
    <div class="tweet-forms">
      <div class="form">
        <div class="title">
          <span class="label">New Tweet</span>
        </div>
        <div class="from">
          <span class="label">From</span>
        </div>
        <div class="input-text">
          <textarea :value="sidebar.text" @input="updateFormText"></textarea>
        </div>
        <div class="btns">
          <div class="total-words">
            <span>{{ wordCount }}</span>
          </div>
          <div class="submit" :class="{ active: tweetable }" @click="postTweet">
            <span v-if="tweeting"><i class="fa fa-spinner fa-spin"></i></span>
            <span v-else>Tweet</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'tweetbar-view',
  data () {
    return {
      tweetable: false,
      tweeting: false
    }
  },
  watch: {
    'sidebar.text' () {
      let totalWord = 140 - this.sidebar.text.length
      if (totalWord < 140 && totalWord > 0) {
        this.tweetable = true
      } else {
        this.tweetable = false
      }
    }
  },
  computed: {
    wordCount () {
      return 140 - this.sidebar.text.length
    },
    ...mapState([
      'sidebar'
    ])
  },
  methods: {
    postTweet () {
      if (this.tweetable === true) {
        this.tweeting = true
        this.$store.dispatch('postTweet', {tweet: this.sidebar.text}).then((res) => {
          this.tweeting = false
          this.$store.dispatch('clearFormText')
          this.$emit('tweetToggle')
        }).catch((e) => {
          this.tweeting = false
        })
      }
    },
    updateFormText (e) {
      this.$store.dispatch('updateFormText', {text: e.target.value})
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
        width: 60px;
        padding: 10px;
        font-size: 13px;
        color: #fff;
        background-color: #7094AE;
        opacity: 0.8;
        text-align: center;
      }
      .submit.active {
        background-color: #569CFF;
        opacity: 1;
      }
    }
  }
}
</style>
