<template>
  <div id="home">
    <div id="sidebar">
      <sidebar-view :open="isTweetbarOpen" v-on:tweetToggle="tweetToggle"></sidebar-view>
    </div>
    <div id="tweetbar">
      <tweetbar-view :open="isTweetbarOpen" v-on:tweetToggle="tweetToggle"></tweetbar-view>
    </div>
    <div id="mainarea" :class="{ open: !isTweetbarOpen }">
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
#sidebar { // width: 55px
  position: fixed;
  top: 0;
  height: 100%;
  background-color: #353535;
}
#tweetbar { // width: 260px
  position: fixed;
  top: 0;
  left: 55px;
  height: 100%;
  background-color: #4174C0;
}
#mainarea {
  margin-left: 315px;
}
#mainarea.open {
  margin-left: 55px;
}
</style>
