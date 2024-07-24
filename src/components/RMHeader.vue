<template>
  <div id="header">
    <div
      class="absolute right-10 top-10 text-white flex items-center space-x-2 cursor-pointer"
      @click="toggleDarkMode"
    >
      <svg
        v-if="!isDarkMode"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5"
      >
        <path
          fill-rule="evenodd"
          d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
          clip-rule="evenodd"
        />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5"
      >
        <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
      </svg>


      <p>Switch to <span>{{ isDarkMode ? 'Light' : 'Dark' }}</span> mode</p>
    </div>

    <img
      class="logo"
      src="/logo.svg"
      alt="Rick and Morty Logo"
    >

    <div class="search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="text-white w-[28px] h-[28px]"
      >
        <path
          fill-rule="evenodd"
          d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
          clip-rule="evenodd"
        />
      </svg>

      <input
        ref="searchBox"
        v-model="searchStr"
        type="text"
        placeholder="Buscar personaje..."
        @keyup.enter="search"
      >

      <svg
        v-if="searchStr.length > 0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-8 h-8 text-gray-300"
        @click="clearSearch"
      >
        <path
          fill-rule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>
</template>

<script>

/* Vue features */
import { ref } from 'vue'

export default {
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  emits: ['search', 'clear-search', 'toggle-dark-mode'],
  setup(props, context) {
    const searchStr = ref('')
    const searchBox = ref(null)

    function search() {
      context.emit('search', searchStr.value)
    }

    function clearSearch() {
      searchStr.value = ''
      searchBox.value.focus()
      context.emit('clear-search')
    }

    function toggleDarkMode() {
      context.emit('toggle-dark-mode')
    }

    context.expose({
      clearSearch
    })

    return {
      search,
      searchStr,
      searchBox,

      // Functions
      clearSearch,
      toggleDarkMode
    }
  }
}
</script>
