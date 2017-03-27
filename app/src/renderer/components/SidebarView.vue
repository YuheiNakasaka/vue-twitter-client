<template>
  <div class="sidebar-container">
    <div class="inner">
      <tweet-btn :open="open" v-on:tweetToggle="tweetToggle"></tweet-btn>
    </div>
  </div>
</template>

<script>
import TweetBtn from './SidebarView/TweetBtn'

export default {
  name: 'sidebar-view',
  props: ['open'],
  components: {
    TweetBtn
  },
  methods: {
    tweetToggle () {
      this.$emit('tweetToggle')
    }
  }
}
</script>

<style lang="scss" scoped></style>
