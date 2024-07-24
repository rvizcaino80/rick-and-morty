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
  <rm-paginator
    v-if="!showOnlyFavorites && data?.info?.pages > 1"
    :pages="data?.info?.pages"
    :current-page="currentPage"
    @go-prev="goPrev"
    @go-next="goNext"
    @go-to="goTo"
  />
</template>

<script>

/* Vue features */
import { reactive, toRefs, watch } from 'vue'

/* Custom components */
import RMCard from './RMCard.vue'
import RMPaginator from './RMPaginator.vue'

export default {
  components: {
    'rm-card': RMCard,
    'rm-paginator': RMPaginator
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
