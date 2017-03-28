<template>
  <div class="tweets">
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
    created () {
      this.$store.dispatch('getHomeTweets')
    }
  }
</script>

<style lang="scss" scoped>
.tweets {
  min-width: 310px;
}
</style>
