<template>
  <div class="profile">
    <!-- {{ tweet }} -->
    <div class="overlay"></div>
    <div class="profile-main">
      <div class="box">
        <div class="main">
          <div class="inner">
            <div class="icon">
              <span>
                <img :src="tweet.user.profile_image_url"/>
              </span>
            </div>
            <div class="name">
              <span>{{ tweet.user.name }}</span>
            </div>
            <div class="screen-name">
              <span>@{{ tweet.user.screen_name }}</span>
            </div>
            <div class="description">
              <span>{{ tweet.user.description }}</span>
            </div>
            <div class="meta">
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="inner">
            <div class="tweets">
            </div>
            <div class="followings">
            </div>
            <div class="followers">
            </div>
            <div class="listed">
            </div>
            <div class="btns">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'profile',
    props: ['tweet'],
    data () {
      return {}
    },
    computed: {
      ...mapState([
        'user'
      ])
    }
  }
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
  z-index: 2000;
}
.profile-main {
  position: fixed;
  top: 50%;
  left: 50%;
  display: block;
  width: 450px;
  height: 300px;
  margin: -150px 0 0 -200px;
  border-radius: 4px;
  z-index: 2001;
  background-color: #fff;
  .box {
    .main {
      width: 100%;
      .icon {
        width: 100%;
        padding: 40px 0;
        text-align: center;
        img {
          width: 44px;
          height: 44px;
          border-radius: 4px;
        }
      }
      .name {
        width: 100%;
        margin-bottom: 10px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
      }
      .screen-name {
        width: 100%;
        margin-bottom: 10px;
        text-align: center;
        font-size: 12px;
      }
      .description {
        width: 100%;
        text-align: center;
        font-size: 12px;
        span {
          text-align: left;
        }
      }
      .meta {
      }
    }
  }
}
</style>
