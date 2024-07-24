<template>
  <div
    class="episode"
    :title="data.name"
  >
    {{ data.name }}
  </div>
</template>

<script>

/* Vue features */
import { reactive, toRefs } from 'vue'

/* Custom code */
import { FetchWrapper } from '../classes/fetchWrapper'

export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    // Local state management
    const state = reactive({
      data: {}
    })

    // Initialize the custom fetch wrapper
    const fetchWrapper = new FetchWrapper('')

    // Get the episode
    async function getEpisode() {
      state.data = await fetchWrapper.get(props.url)
    }

    getEpisode()

    return {
      ...toRefs(state)
    }
  }
}
</script>
