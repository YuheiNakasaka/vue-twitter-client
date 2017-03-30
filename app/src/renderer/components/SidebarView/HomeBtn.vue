<template>
  <div class="home-box">
    <div class="home-btns">
      <div class="inner">
        <span class="btn" @click="displayHomeTweets">
          <i class="fa fa-home" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'home-btn',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'sidebar'
    ])
  },
  methods: {
    displayHomeTweets (item) {
      this.$store.dispatch('closeAllBar')
      this.$store.dispatch('getHomeTweets')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-box {
  .home-btns {
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
}
</style>
