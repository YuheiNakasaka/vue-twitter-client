<template>
  <div>
    <button @click="updateHomeTweets">update</button>
    <div class="tweets">
      <div class="tweet" v-for="tweet in tweets.items">
        <p>
          {{ tweet.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'timeline',
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'tweets'
      ])
    },
    methods: {
      updateHomeTweets () {
        this.$store.dispatch('getHomeTweets')
      }
    }
  }
</script>

<style lang="scss" scoped>
p {
  color: #333;
}
</style>
