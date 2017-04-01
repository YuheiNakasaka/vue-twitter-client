<template>
  <div class="tweet-body">
    <span class="none">{{ i = 0 }}</span>
    <p v-for="entity in entities">
      <span>{{ getText().substring(i, entity.indices[0]) }}</span>
      <a class="tweet-link"
         v-if="entity.url && getImageUrls().indexOf(entity.url) === -1 && getVideoUrls().indexOf(entity.url) === -1"
         @click="openInOsBrowser(entity.url)">
         {{ entity.url }}
      </a>
      <a class="tweet-hashtag"
         v-if="entity.hashtag"
         @click="searchHashtag(entity.hashtag)">
         #{{ entity.hashtag }}
      </a>
      <a class="tweet-listslug"
         v-if="entity.listSlug"
         @click="openInOsBrowser('https://twitter.com/$' + entity.screenName + entity.listSlug)">
         {{ entity.listSlug }}
      </a>
      <a class="tweet-screenname"
         v-if="entity.screenName"
         @click="openInOsBrowser('https://twitter.com/' + entity.screenName)">
         @{{ entity.screenName }}
      </a>
      <a class="tweet-cashtag"
         v-if="entity.cashtag"
         @click="openInOsBrowser('https://twitter.com/#!/search?q=%24' + entity.cashtag)">
         ${{ entity.cashtag }}
      </a>
      <span class="none">{{ i = entity.indices[1] }}</span>
    </p>
    <p v-if="i !== getText().length">{{ getText().substring(i, getText().length) }}</p>
    <div class="tweet-imgs">
      <a v-for="imgEntity, i in getImageEntities()"
         :class="{multi: getImageEntities().length > 1}"
         @click="openInOsBrowser(imgEntity.url)">
         <img v-lazy="imgEntity.imgUrl"/>
      </a>
      <a v-for="videoEntity, i in getVideoEntities()"
         :class="{multi: getVideoEntities().length > 1}"
         @click="openInOsBrowser(videoEntity.url)">
        <lazy-component tag="div" >
          <video :src="videoEntity.imgUrl" type="video/mp4" source controls loop autoplay muted/></video>
        </lazy-component>
      </a>
    </div>
  </div>
</template>

<script>
import twitterText from 'twitter-text'
import { shell } from 'electron'

export default {
  name: 'tweet-body',
  props: ['tweet'],
  data () {
    return {}
  },
  computed: {
    entities () {
      let entities = twitterText.extractEntitiesWithIndices(this.getText(), { extractUrlsWithoutProtocol: false })
      return entities
    }
  },
  methods: {
    openInOsBrowser (url) {
      shell.openExternal(url)
    },
    getText () {
      return this.tweet.text
    },
    getImageEntities () {
      if (this.tweet.extended_entities && this.tweet.extended_entities.media) {
        return this.tweet.extended_entities.media.filter((media) => {
          return media.type === 'photo'
        }).map((media) => {
          return {imgUrl: media.media_url_https, url: media.url}
        })
      } else {
        return []
      }
    },
    getImageUrls () {
      if (this.tweet.extended_entities && this.tweet.extended_entities.media) {
        return this.tweet.extended_entities.media.filter((media) => {
          return media.type === 'photo'
        }).map((media) => {
          return media.url
        })
      } else {
        return []
      }
    },
    getVideoEntities () {
      if (this.tweet.extended_entities && this.tweet.extended_entities.media) {
        return this.tweet.extended_entities.media.filter((media) => {
          return media.type !== 'photo' && media.video_info
        }).map((media) => {
          return {imgUrl: media.video_info.variants[0].url, url: media.url}
        })
      } else {
        return []
      }
    },
    getVideoUrls () {
      if (this.tweet.extended_entities && this.tweet.extended_entities.media) {
        return this.tweet.extended_entities.media.filter((media) => {
          return media.type !== 'photo' && media.video_info
        }).map((media) => {
          return media.video_info.variants[0].url
        })
      } else {
        return []
      }
    },
    searchHashtag (hashtag) {
      this.$store.dispatch('getSearchTweets', {q: hashtag})
    }
  }
}
</script>

<style lang="scss"  scoped>
.tweet-body {
  line-height: 1.4;
  a {
    display: inline-block;
    cursor: pointer;
  }
  .tweet-link {
    color: #4174C0;
  }
  .tweet-hashtag {
    color: #4174C0;
  }
  .tweet-listslug {
    color: #4174C0;
  }
  .tweet-screenname {
    color: #4174C0;
  }
  .tweet-cashtag {
    color: #4174C0;
  }
  .tweet-imgs {
    width: 100%;
    overflow: hidden;
    display: flex;
    a {
      float: left;
      width: 100%;
      margin-top: 5px;
      img {
        width: 100%;
        max-width: 500px;
      }
    }
    a.multi {
      width: 50%;
    }
    video {
      width: 100%;
      max-width: 500px;
    }
  }
}
.none {
  display: none;
}
</style>
