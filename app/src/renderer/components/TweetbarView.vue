<template>
  <div class="tweet-box" v-show="sidebar.isTweetbarOpen">
    <div class="tweet-forms">
      <div class="form">
        <div class="close">
          <span @click="closeBar"><i class="fa fa-times"></i></span>
        </div>
        <div class="title">
          <span class="label">New Tweet</span>
        </div>
        <div class="from">
          <span class="label">From</span>
        </div>
        <div class="current-user-img">
          <span><img :src="user.user.profile_image_url"/></span>
        </div>
        <div class="input-text">
          <textarea :value="sidebar.text" @input="updateFormText"></textarea>
        </div>
        <div class="images-preview" v-show="images.length > 0">
          <div class="inner">
            <div class="image">
              <span class="inner" v-for="image in images">
                <img :src="image"/>
                <div class="close">
                  <span @click="removeImage(image)"><i class="fa fa-times"></i></span>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="others">
          <div class="btns">
            <div class="media">
              <input type="file" v-on:change="selectImage" accept="image/jpg,image/png" multiple/>
              <i class="fa fa-picture-o" aria-hidden="true"></i>
              <span>add images</span>
            </div>
          </div>
        </div>
        <div class="btns">
          <div class="total-words">
            <span>{{ wordCount }}</span>
          </div>
          <div class="submit" :class="{ active: tweetable }" @click="postTweet">
            <span v-if="tweeting"><i class="fa fa-spinner fa-spin"></i></span>
            <span v-else>Tweet</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'tweetbar-view',
  data () {
    return {
      tweetable: false,
      tweeting: false,
      images: []
    }
  },
  watch: {
    'sidebar.text' () {
      let totalWord = 140 - this.sidebar.text.length
      if (totalWord < 140 && totalWord > 0) {
        this.tweetable = true
      } else {
        this.tweetable = false
      }
    }
  },
  computed: {
    wordCount () {
      return 140 - this.sidebar.text.length
    },
    ...mapState([
      'sidebar',
      'user'
    ])
  },
  methods: {
    closeBar () {
      this.$store.dispatch('toggleTweetBar')
    },
    removeImage (image) {
      this.images.splice(this.images.indexOf(image), 1)
    },
    postTweet () {
      if (this.tweetable === true) {
        this.tweeting = true
        this.$store.dispatch('postTweet', {tweet: this.sidebar.text, images: this.images}).then((res) => {
          this.tweeting = false
          this.images = []
          this.$store.dispatch('clearFormText')
          this.$store.dispatch('toggleTweetBar')
        }).catch((e) => {
          this.tweeting = false
        })
      }
    },
    updateFormText (e) {
      this.$store.dispatch('updateFormText', {text: e.target.value})
    },
    selectImage (e) {
      let vm = this
      if (e.target.files.length > 0 && e.target.files.length < 5) { // up画像
        for (let i = 0; i < e.target.files.length; i++) {
          let file = e.target.files[i]
          let reader = new FileReader()
          reader.onload = (resp) => {
            vm.images.push(resp.target.result)
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tweet-box {
  .tweet-forms {
    width: 260px;
    padding: 0 5px;
    .close {
      position: absolute;
      top: 15px;
      right: 13px;
      span {
        cursor: pointer;
        i {
          font-size: 24px;
          color: #fff;
        }
      }
    }
    .title {
      padding: 20px 10px;
      border-bottom: 1px solid #7094AE;
      color: #fff;
    }
    .from {
      padding: 20px 10px 10px 10px;
      color: #fff;
    }
    .current-user-img {
      padding: 0 10px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 4px;
      }
    }
    .input-text {
      padding: 20px 10px 10px 10px;
      textarea {
        width: 100%;
        height: 140px;
        padding: 5px;
        font-size: 14px;
      }
    }
    .images-preview {
      .inner {
        display: flex;
        padding: 0 10px 10px 10px;
        .image {
          .inner {
            position: relative;
            display: inline-block;
            img {
              max-height: 50px;
            }
            .close {
              span {
                position: absolute;
                top: 0;
                margin-top: -20px;
                margin-left: 0;
                padding: 0 3px;
                border-radius: 50%;
                background-color: #fff;
                cursor: pointer;
                i {
                  display: inline-block;
                  font-size: 12px;
                  color: #555;
                }
              }
            }
          }
        }
      }
    }
    .btns {
      text-align: right;
      padding: 0 10px;
      .total-words {
        display: inline-block;
        margin-right: 10px;
        font-size: 13px;
        color: #fff;
      }
      .submit {
        display: inline-block;
        width: 60px;
        padding: 10px;
        font-size: 13px;
        color: #fff;
        background-color: #7094AE;
        opacity: 0.8;
        text-align: center;
      }
      .submit.active {
        background-color: #569CFF;
        opacity: 1;
        cursor: pointer;
      }
    }
    .others {
      .btns {
        .media {
          position: relative;
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 4px;
          font-size: 13px;
          color: #fff;
          background-color: #569CFF;
          input {
            position: absolute;
            top: 0;
            left: 0;
            width: 230px;
            height: 32px;
            border: 0;
            border-radius: 4px;
            opacity: 0;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
