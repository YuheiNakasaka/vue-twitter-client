<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'

  export default {
    store: store,
    mounted () {
      // Sample of axios
      // import axios from 'axios'
      // return new Promise((resolve, reject) => {
      //   axios.defaults.baseURL = 'http://localhost:3000'
      //   axios.get('PATH', {
      //     params: {}
      //   })
      //   .then((response) => {
      //     resolve(response.data.data)
      //   }).catch((e) => {
      //     reject()
      //   })
      // }).then((res) => {
      //   console.log(res)
      // })
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
  }
</style>
