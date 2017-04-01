<template>
  <div class="notification-box">
    <div class="notification-btns">
      <div class="inner">
        <span class="btn" @click="toggleNotifications">
          <i class="fa fa-bell" aria-hidden="true"></i>
        </span>
        <span class="count" v-show="notifications.visibleNotificationCount > 0">{{ notifications.visibleNotificationCount }}</span>
      </div>
    </div>
    <transition name="fade">
      <div class="notification-container" v-show="sidebar.isNotificationbarOpen">
        <div class="arrow-left"></div>
        <notification-column v-for="notification in notifications.items" :notification="notification"></notification-column>
        <div class="nothing" v-if="notifications.items.length === 0">
          <p>nothing</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationColumn from './NotificationColumn'

export default {
  name: 'notification-btn',
  components: {
    NotificationColumn
  },
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
    toggleNotifications () {
      if (this.sidebar.isNotificationbarOpen === false) this.$store.dispatch('closeAllBar')
      this.$store.dispatch('toggleNotificationBar')
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
    .count {
      display: block;
      position: absolute;
      right: 8px;
      width: 13px;
      height: 13px;
      margin-top: -20px;
      padding-top: 2px;
      text-align: center;
      border-radius: 50%;
      font-size: 10px;
      color: #fff;
      background-color: #ff0000;
    }
  }
  .notification-container {
    position: absolute;
    overflow-y: scroll;
    top: 50px;
    left: 60px;
    width: 260px;
    height: 90%;
    border-radius: 4px;
    border: 1px solid #eee;
    background-color: #fff;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.4);
    word-wrap: break-word;
    .arrow-left {
      position: fixed;
      width: 0;
      height: 0;
      margin-top: 190px;
      margin-left: -10px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #fff;
    }
    .nothing {
      padding: 10px;
      color: #999;
      p {
        text-align: center;
      }
    }
  }
}
</style>
