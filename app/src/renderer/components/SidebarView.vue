<template>
  <div class="sidebar-container">
    <div class="inner">
      <tweet-btn></tweet-btn>
      <search-btn></search-btn>
      <home-btn></home-btn>
      <mention-btn></mention-btn>
      <notification-btn></notification-btn>
      <list-btn></list-btn>
      <setting-btn class="setting-btn"></setting-btn>
    </div>
  </div>
</template>

<script>
import TweetBtn from './SidebarView/TweetBtn'
import SearchBtn from './SidebarView/SearchBtn'
import HomeBtn from './SidebarView/HomeBtn'
import NotificationBtn from './SidebarView/NotificationBtn'
import MentionBtn from './SidebarView/MentionBtn'
import ListBtn from './SidebarView/ListBtn'
import SettingBtn from './SidebarView/SettingBtn'

export default {
  name: 'sidebar-view',
  components: {
    TweetBtn,
    SearchBtn,
    HomeBtn,
    NotificationBtn,
    MentionBtn,
    ListBtn,
    SettingBtn
  }
}
</script>

<style lang="scss" scoped>
.setting-btn {
  position: fixed;
  bottom: 10px;
}
</style>
