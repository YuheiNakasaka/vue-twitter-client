<template>
  <div class="sidebar-container">
    <div class="inner">
      <tweet-btn></tweet-btn>
      <search-btn></search-btn>
      <home-btn></home-btn>
      <notification-btn></notification-btn>
      <list-btn></list-btn>
    </div>
  </div>
</template>

<script>
import TweetBtn from './SidebarView/TweetBtn'
import SearchBtn from './SidebarView/SearchBtn'
import HomeBtn from './SidebarView/HomeBtn'
import NotificationBtn from './SidebarView/NotificationBtn'
import ListBtn from './SidebarView/ListBtn'

export default {
  name: 'sidebar-view',
  components: {
    TweetBtn,
    SearchBtn,
    HomeBtn,
    NotificationBtn,
    ListBtn
  }
}
</script>

<style lang="scss" scoped></style>
