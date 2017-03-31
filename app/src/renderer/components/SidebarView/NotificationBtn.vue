<template>
  <div class="notification-box">
    <div class="notification-btns">
      <div class="inner">
        <span class="btn" @click="displayHomeTweets">
          <i class="fa fa-bell" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div class="notification-container">
      <div class="inner">
        {{ notifications.items }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'notification-btn',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'sidebar',
      'notifications'
    ])
  },
  methods: {
    displayHomeTweets (item) {
      this.$store.dispatch('closeAllBar')
      this.$store.dispatch('getNotifications')
    }
  }
}
</script>

<style lang="scss" scoped>
.notification-box {
  .notification-btns {
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
  .notification-container {
    position: absolute;
  }
}
</style>
