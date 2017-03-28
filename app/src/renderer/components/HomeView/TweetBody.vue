<template>
  <div>
    <span class="none">{{ i = 0 }}</span>
    <p v-for="entity in entities">
      <span>{{ tweet.text.substring(i, entity.indices[0]) }}</span>
      <a :href="entity.url" v-if="entity.url" target="_blank">{{ entity.url }}</a>
      <a :href="entity.hashtag" v-if="entity.hashtag" target="_blank">#{{ entity.hashtag }}</a>
      <a :href="entity.listSlug" v-if="entity.listSlug" target="_blank">{{ entity.listSlug }}</a>
      <a :href="entity.screenName" v-if="entity.screenName" target="_blank">@{{ entity.screenName }}</a>
      <a :href="entity.cashtag" v-if="entity.cashtag" target="_blank">${{ entity.cashtag }}</a>
      <span class="none">{{ i = entity.indices[1] }}</span>
    </p>
    <p v-if="i !== tweet.text.length">{{ tweet.text.substring(i, tweet.text.length) }}</p>
  </div>
</template>

<script>
import twitterText from 'twitter-text'

export default {
  name: 'tweet-body',
  props: ['tweet'],
  data () {
    return {
      index: 0
    }
  },
  computed: {
    entities () {
      let entities = twitterText.extractEntitiesWithIndices(this.tweet.text, { extractUrlsWithoutProtocol: false })
      return entities
    }
  },
  methods: {
    updateIndex (nextIndex) {
      this.index = nextIndex
    }
  }
}
</script>

<style lang="scss"  scoped>
.none {
  display: none;
}
</style>
