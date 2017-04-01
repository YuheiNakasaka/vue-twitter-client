<template>
  <div class="tweets">
    <div class="tweets-header">
      <div class="inner">
        <h1>{{ tweets.tweetName }}</h1>
      </div>
    </div>
    <tweet v-for="tweet in tweets.items" :tweet="tweet" :key="tweet.str_id"></tweet>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Tweet from './Tweet'

  export default {
    name: 'timeline',
    components: {
      Tweet
    },
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'tweets'
      ])
    },
    methods: {
    },
    created () {
      this.$store.dispatch('getHomeTweets')
    }
  }
</script>

<style lang="scss" scoped>
.tweets {
  width: 100%;
  min-width: 300px;
  .tweets-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background-color: #f6f6f6;
    h1 {
      font-size: 18px;
      font-weight: bold;
      color: #353535;
    }
  }
}
</style>
