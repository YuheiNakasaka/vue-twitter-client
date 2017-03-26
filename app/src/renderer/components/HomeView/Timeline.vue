<template>
  <div>
    <button @click="updateHomeTweets">update</button>
    <div class="tweets">
      <div class="tweet" v-for="tweet in tweets.items" :tweet="tweet">
        <p>
          {{ tweet.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'timeline',
    props: ['tweet'],
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
  color: #ff0000;
}
</style>
