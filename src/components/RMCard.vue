<template>
  <div class="card relative">
    <img
      :src="character.image"
      :alt="character.name"
    >

    <div
      class="favorite-box"
      @click="toggleFavorite"
    >
      <img
        v-if="!isFavorite"
        src="/star.png"
        alt="Mark as favorite"
      >

      <img
        v-else
        src="/star-active.png"
        alt="Remove from favorites"
      >
    </div>

    <div class="info">
      <div class="status-specie">
        <rm-ball :status="character.status" />
        <div>
          {{ character.status }} - <span :title="character.species">{{ character.species }}</span>
        </div>
      </div>
      <div
        class="name"
        :title="character.location.name"
      >
        {{ character.name }}
      </div>

      <div class="last-known-location-title">
        Last known location:
      </div>
      <div
        class="last-known-location"
        :title="character.location.name"
      >
        {{ character.location.name }}
      </div>

      <div class="first-seen-title">
        First seen in:
      </div>
      <rm-episode :url="character.episode[0]" />
    </div>
  </div>
</template>

<script>

/* Custom components */
import RMEpisode from './RMEpisode.vue'
import RMBall from './RMBall.vue'

export default {
  components: {
    'rm-episode': RMEpisode,
    'rm-ball': RMBall
  },
  props: {
    character: {
      type: Object,
      required: true
    },
    isFavorite: {
      type: Boolean,
      required: true
    }
  },
  emits: ['marked-as-favorite', 'removed-from-favorites'],
  setup(props, context) {
    // Functions
    function toggleFavorite() {
      if (!props.isFavorite) {
        context.emit('marked-as-favorite', props.character)
      } else {
        context.emit('removed-from-favorites', props.character)
      }
    }

    return {

      // Functions
      toggleFavorite
    }
  }
}
</script>
