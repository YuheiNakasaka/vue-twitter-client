<template>
  <div class="sidebar-container">
    <div class="inner">
      <tweet-btn></tweet-btn>
    </div>
  </div>
</template>

<script>
import TweetBtn from './SidebarView/TweetBtn'

export default {
  name: 'sidebar-view',
  components: {
    TweetBtn
  }
}
</script>

<style lang="scss" scoped></style>
