<template>
  <div id="home">
    <div id="sidebar">
      <sidebar-view v-on:tweetToggle="tweetToggle"></sidebar-view>
    </div>
    <div id="tweetbar">
      <tweetbar-view :open="isTweetbarOpen"></tweetbar-view>
    </div>
    <div id="mainarea">
      <timeline></timeline>
    </div>
  </div>
</template>

<script>
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
      return {
        isTweetbarOpen: false
      }
    },
    methods: {
      tweetToggle () {
        this.isTweetbarOpen = !this.isTweetbarOpen
      }
    }
  }
</script>

<style lang="scss" scoped>
#home {
  display: -webkit-flex;
  display: flex;
}
#sidebar {
  background-color: #353535;
}
#tweetbar {
  background-color: #4174C0;
}
#mainarea {
}
</style>
