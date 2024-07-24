<template>
  <div
    class="loading-animation-wrapper"
  >
    <img
      class="loading-animation"
      src="/portal-loading.gif"
      alt="Loading..."
    >
    <p>{{ currentPhrase }}</p>
  </div>
</template>

<script>

/* Vue features */
import { shallowReactive, toRefs } from 'vue'

/* Custom code */
import { phrases } from '../data/phrases'
import { randomIntBetween } from '../utils/numbers'

export default {
  setup() {
    // Local state management
    const state = shallowReactive({
      currentPhrase: ''
    })

    function getRandomPhrase() {
      const rnd = randomIntBetween(0, phrases.length - 1)
      state.currentPhrase = phrases[rnd]
    }

    // Get random phrase for loading animation
    getRandomPhrase()

    return {
      ...toRefs(state)
    }
  }
}
</script>
