<template>
  <div class="search-box">
    <div class="search-btns">
      <div class="inner">
        <span class="btn" @click="toggleSearchBar">
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <transition name="fade">
      <div class="search-container" v-show="sidebar.isSearchbarOpen">
        <div class="arrow-left"></div>
        <div class="inner">
          <input v-model="query" @keydown.enter="displaySearchTweets"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'search-btn',
  data () {
    return {
      query: ''
    }
  },
  computed: {
    ...mapState([
      'sidebar'
    ])
  },
  methods: {
    toggleSearchBar () {
      if (this.sidebar.isSearchbarOpen === false) this.$store.dispatch('closeAllBar')
      this.$store.dispatch('toggleSearchBar')
    },
    displaySearchTweets (item) {
      this.$store.dispatch('getSearchTweets', {q: this.query}).then(() => {
        this.query = ''
        this.$store.dispatch('toggleSearchBar')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.search-box {
  .search-btns {
    .btn {
      display: inline-block;
      width: 45px;
      height: 45px;
      margin: 5px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      i {
        line-height: 50px;
        font-size: 32px;
        color: #fff;
      }
    }
  }
  .search-container {
    position: fixed;
    top: 65px;
    left: 58px;
    padding: 5px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.4);
    .arrow-left {
      position: absolute;
      width: 0;
      height: 0;
      margin-top: 5px;
      margin-left: -15px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #fff;
    }
    .inner {
      input {
        width: 300px;
        height: 30px;
        padding: 0 10px;
        font-size: 14px;
        border: 1px solid #eee;
      }
    }
  }
}
</style>
