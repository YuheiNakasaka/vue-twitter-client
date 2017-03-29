<template>
  <div class="sidebar-container">
    <div class="inner">
      <tweet-btn></tweet-btn>
      <search-btn></search-btn>
      <home-btn></home-btn>
      <list-btn></list-btn>
    </div>
  </div>
</template>

<script>
import TweetBtn from './SidebarView/TweetBtn'
import HomeBtn from './SidebarView/HomeBtn'
import SearchBtn from './SidebarView/SearchBtn'
import ListBtn from './SidebarView/ListBtn'

export default {
  name: 'sidebar-view',
  components: {
    TweetBtn,
    HomeBtn,
    SearchBtn,
    ListBtn
  }
}
</script>

<style lang="scss" scoped></style>
