<template>
  <rm-loader
    v-if="isLoading"
  />
  <rm-header
    ref="header"
    @search="search"
    @clear-search="search"
  />
  <rm-menu @option-changed="menuOptionChanged" />
  <rm-content
    :data="pageData"
    :current-page="currentPage"
    @go-prev="goPrev"
    @go-next="goNext"
    @go-to="goTo"
  />
  <rm-footer />
</template>

<script>

/* Vue features */
import { shallowReactive, ref, toRefs } from 'vue'

/* Custom code */
import { FetchWrapper } from './classes/fetchWrapper'

/* Custom components */
import RMLoader from './components/RMLoader.vue'
import RMHeader from './components/RMHeader.vue'
import RMFooter from './components/RMFooter.vue'
import RMMenu from './components/RMMenu.vue'
import RMContent from './components/RMContent.vue'


export default {
  components: {
    'rm-loader': RMLoader,
    'rm-header': RMHeader,
    'rm-footer': RMFooter,
    'rm-menu': RMMenu,
    'rm-content': RMContent
  },
  setup() {
    // Get ref to header
    const header = ref(null)

    // Local state management - Prefer shallow reactive if there is no deep reactivity
    const state = shallowReactive({
      isLoading: true,
      currentPage: 1,
      currentGender: '',
      currentName: '',
      currentPhrase: '',
      pageData: []
    })

    initData()

    // Functions
    function menuOptionChanged(newOption) {
      header.value.clearSearch()
      load(newOption === 'all' ? null : newOption, null, 1)
    }

    function goPrev() {
      load(state.currentGender, state.currentName, state.currentPage - 1)
    }

    function goNext() {
      load(state.currentGender, state.currentName, state.currentPage + 1)
    }

    function goTo(page) {
      load(state.currentGender, state.currentName, page)
    }

    async function load(gender = null, name = null, page = 1) {
      // Set current values for using in the custom paginator
      state.currentPage = page
      state.currentName = name
      state.currentGender = gender

      state.isLoading = true

      // Initialize the custom fetch wrapper
      const fetchWrapper = new FetchWrapper(import.meta.env.VITE_API_BASE_URL)

      try {
      } catch (err) {
        // TODO: Implement better error handling here
        console.log(err)
      }

      // Build the url
      let url = `character?page=${state.currentPage}`
      url += gender ? `&gender=${gender}` : ''
      url += name ? `&name=${name}` : ''

      // Get current page from API
      state.pageData = await fetchWrapper.get(url)

      // Fake loading time (Just for showing the loading animation)
      setTimeout(() => {
        state.isLoading = false
      }, 3000)
    }

    // Get initial data from API
    async function initData() {
      load(null, null, 1)
    }

    function search(searchStr) {
      load(null, searchStr, 1)
    }

    return {
      ...toRefs(state),
      header,

      // Functions
      menuOptionChanged,
      search,
      goPrev,
      goNext,
      goTo
    }
  }
}

</script>
