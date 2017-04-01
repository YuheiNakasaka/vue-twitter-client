<template>
  <div class="mention-box">
    <div class="mention-btns">
      <div class="inner">
        <span class="btn" @click="displayMentionTweets">
          <i class="fa fa-at" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'mention-btn',
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'sidebar'
    ])
  },
  methods: {
    displayMentionTweets (item) {
      this.$store.dispatch('closeAllBar')
      this.$store.dispatch('getMentions')
    }
  }
}
</script>

<style lang="scss" scoped>
.mention-box {
  .mention-btns {
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
