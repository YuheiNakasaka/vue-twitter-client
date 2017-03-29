<template>
  <div class="sidebar-container">
    <div class="inner">
      <tweet-btn></tweet-btn>
      <list-btn></list-btn>
    </div>
  </div>
</template>

<script>
import TweetBtn from './SidebarView/TweetBtn'
import ListBtn from './SidebarView/ListBtn'

export default {
  name: 'sidebar-view',
  components: {
    TweetBtn,
    ListBtn
  }
}
</script>

<style lang="scss" scoped></style>
