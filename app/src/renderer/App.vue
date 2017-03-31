<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'

  export default {
    store: store,
    created () {
      this.$store.dispatch('initUser')
      this.$store.dispatch('getNotifications')
    }
  }
</script>

<style>
/* reset css */
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html, body, h1, h2, h3, h4, ul, ol, dl, li, dt, dd, p, div, span, img, a, table, tr, th, td {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: normal;
  font-size: 100%;
  text-align: left;
  vertical-align: baseline;
}
article, header, footer, aside, figure, figcaption, nav, section {
  display:block;
}
body {
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}
ol, ul {
  list-style: none;
  list-style-type: none;
}

/* global css */
html, body
{
  background-color: #fff;
  color: #2e2f30;
  letter-spacing: 0.5px;
  font-family: "Source Sans Pro", Arial, sans-serif;
  margin: 0;
  height: 100%;
}

a, a:hover, a:focus, a:visited
{
  color: #333;
  text-decoration: none;
}
</style>
