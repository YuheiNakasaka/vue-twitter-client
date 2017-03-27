<template>
  <div class="sidebar-container">
    <div class="inner">
      <tweet-btn v-on:tweetToggle="tweetToggle"></tweet-btn>
    </div>
  </div>
</template>

<script>
import TweetBtn from './SidebarView/TweetBtn'

export default {
  name: 'sidebar-view',
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
