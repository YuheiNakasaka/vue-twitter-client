<template>
  <div class="tweet-box">
    <div class="tweet-btns">
      <div class="inner">
        <span class="btn" @click="toggleTweetForm" :class="{expand: open}">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tweet-btn',
  props: ['open'],
  data () {
    return {}
  },
  methods: {
    toggleTweetForm () {
      this.$emit('tweetToggle')
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet-box {
  .tweet-btns {
    .btn {
      display: inline-block;
      width: 45px;
      height: 45px;
      margin: 5px;
      text-align: center;
      border-radius: 4px;
      background-color: #4174C0;
      i {
        line-height: 50px;
        font-size: 32px;
        color: #fff;
      }
    }
    .btn.expand {
      width: 50px;
      margin: 5px 0 5px 5px;
      border-radius: 4px 0 0 4px;
    }
  }
}
</style>
