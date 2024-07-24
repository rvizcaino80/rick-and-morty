<template>
  <div id="content">
    <!-- Favorites -->
    <div
      class="favorites"
      @click="toggleFavorites"
    >
      <p>{{ showOnlyFavorites ? 'Ocultar' : 'Mostrar' }} favoritos</p>

      <div>
        <img
          src="/star-active.png"
          alt="Remove from favorites"
        >
      </div>
    </div>

    <div
      class="cards"
    >
      <div
        v-if="showOnlyFavorites && favorites.length <= 0"
        class="col-span-3"
      >
        <img
          class="mx-auto block mb-2 max-w-[300px]"
          src="/no-favorites.png"
          alt="Nada que ver aquí!"
        >

        <div class="font-semibold font-lg text-center">
          ¡Nada que ver aquí!
        </div>
      </div>

      <rm-card
        v-for="item in localData"
        :key="item.id"
        :character="item"
        :is-favorite="favorites.some(character => character.id === item.id)"
        @marked-as-favorite="markAsFavorite"
        @removed-from-favorites="markAsNonFavorite"
      />

      <div
        v-if="!showOnlyFavorites && data?.info?.next"
        class="paginator-card next-card"
        @click="goNext"
      >
        Next &raquo;
      </div>
    </div>
  </div>

  <!-- Paginator -->
  <ul
    v-if="!showOnlyFavorites && data?.info?.pages > 1"
    id="paginator"
  >
    <li
      v-if="currentPage > 1"
      @click="goPrev"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </li>
    <li
      v-for="page in data?.info?.pages"
      :key="page"
      :class="{'active': currentPage === page}"
      @click="goTo(page)"
    >
      {{ page }}
    </li>
    <li
      v-if="currentPage < data?.info?.pages"
      @click="goNext"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-4 h-4"
      >
        <path
          fill-rule="evenodd"
          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </li>
  </ul>
</template>

<script>

/* Vue features */
import { reactive, toRefs, watch } from 'vue'

/* Custom components */
import RMCard from './RMCard.vue'

export default {
  components: {
    'rm-card': RMCard
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1
    }
  },
  emits: ['go-prev', 'go-next', 'go-to'],
  setup(props, context) {
    // Local state management
    const state = reactive({
      localData: [],
      showOnlyFavorites: false,
      favorites: []
    })

    watch(() => props.data, (val) => {
      state.localData = val.results
    })

    // Functions
    function toggleFavorites() {
      state.showOnlyFavorites = !state.showOnlyFavorites

      if (state.showOnlyFavorites) {
        state.localData = state.favorites
      } else {
        state.localData = props.data.results
      }
    }

    function markAsFavorite(character) {
      state.favorites.push(character)
    }

    function markAsNonFavorite(character) {
      state.favorites = state.favorites.filter((item) => item.id !== character.id)
    }

    function goPrev() {
      context.emit('go-prev')
    }

    function goNext() {
      context.emit('go-next')
    }

    function goTo(page) {
      context.emit('go-to', page)
    }

    return {
      ...toRefs(state),

      // Functions
      toggleFavorites,
      markAsFavorite,
      markAsNonFavorite,
      goPrev,
      goNext,
      goTo
    }
  }
}
</script>
