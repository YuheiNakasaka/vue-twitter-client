<template>
  <div class="setting-box">
    <div class="setting-btns">
      <div class="inner">
        <span class="btn" @click="toggleSettingBox">
          <i class="fa fa-cog" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <transition name="fade">
      <div class="setting-container" v-show="sidebar.isSettingbarOpen">
        <div class="arrow-left"></div>
        <div class="inner">
          <div class="settings">
            <div class="setting">
              <div class="setting-name">
                <span>
                  <a @click="openInOsBrowser('https://twitter.com/razokulover')">Feedback</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { shell } from 'electron'

export default {
  name: 'setting-btn',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'sidebar'
    ])
  },
  methods: {
    openInOsBrowser (url) {
      shell.openExternal(url)
    },
    toggleSettingBox (item) {
      if (this.sidebar.isSettingbarOpen === false) this.$store.dispatch('closeAllBar')
      this.$store.dispatch('toggleSettingBar')
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
.setting-box {
  .setting-btns {
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
  .setting-container {
    position: fixed;
    left: 60px;
    bottom: 18px;
    width: 250px;
    height: 40px;
    line-height: 10px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 10px 3px rgba(0,0,0,0.4);
    .arrow-left {
      position: absolute;
      width: 0;
      height: 0;
      margin-top: 0;
      margin-left: -20px;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid #fff;
    }
    .inner {
      .title {
        font-size: 16px;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        span {
          font-weight: bold;
        }
      }
      .settings {
        padding: 5px 0;
        .setting {
          .setting-name {
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 20px;
            color: #555;
          }
        }
      }
    }
  }
}
</style>
