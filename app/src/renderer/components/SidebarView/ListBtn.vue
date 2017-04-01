<template>
  <div class="list-box">
    <div class="list-btns">
      <div class="inner">
        <span class="btn" @click="toggleLists">
          <i class="fa fa-list" aria-hidden="true"></i>
        </span>
        <transition name="fade">
          <div class="list-container" v-show="sidebar.isListbarOpen">
            <div class="arrow-left"></div>
            <div class="inner">
              <div class="title">
                <span>Lists</span>
              </div>
              <div class="lists">
                <div class="list">
                  <div class="list-name" v-for="item in lists.items">
                    <span @click="displayList(item)">{{ item.full_name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'list-btn',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'sidebar',
      'lists'
    ])
  },
  methods: {
    toggleLists () {
      if (this.sidebar.isListbarOpen === false) this.$store.dispatch('closeAllBar')
      this.$store.dispatch('toggleListBar')
    },
    displayList (item) {
      this.$store.dispatch('toggleListBar')
      this.$store.dispatch('getListTweets', {list: item})
    }
  },
  mounted () {
    this.$store.dispatch('getMyList')
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
.list-box {
  .list-btns {
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
    .list-container {
      position: fixed;
      top: 216px;
      left: 60px;
      width: 250px;
      min-height: 250px;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 4px;
      background-color: #fff;
      box-shadow: 0 0 10px 3px rgba(0,0,0,0.4);
      .arrow-left {
        position: absolute;
        width: 0;
        height: 0;
        margin-top: 65px;
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
        .lists {
          padding: 5px 0;
          .list {
            .list-name {
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
}
</style>
