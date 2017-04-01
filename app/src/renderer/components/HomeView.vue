<template>
  <div id="home">
    <div id="sidebar">
      <sidebar-view></sidebar-view>
    </div>
    <div id="tweetbar">
      <tweetbar-view></tweetbar-view>
    </div>
    <div id="mainarea" :class="{ open: !sidebar.isTweetbarOpen }">
      <timeline></timeline>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Timeline from './HomeView/Timeline.vue'
  import SidebarView from './SidebarView.vue'
  import TweetbarView from './TweetbarView.vue'

  export default {
    name: 'home-view',
    components: {
      Timeline,
      SidebarView,
      TweetbarView
    },
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'sidebar'
      ])
    }
  }
</script>

<style lang="scss" scoped>
#home {
  display: -webkit-flex;
  display: flex;
}
#sidebar { // width: 55px
  position: fixed;
  top: 0;
  height: 100%;
  min-height: 450px;
  z-index: 2000;
  background-color: #353535;
}
#tweetbar { // width: 260px
  position: fixed;
  top: 0;
  left: 55px;
  height: 100%;
  z-index: 1999;
  background-color: #4174C0;
}
#mainarea {
  width: 100%;
  margin-left: 315px;
}
#mainarea.open {
  margin-left: 55px;
}
</style>
