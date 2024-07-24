<template>
  <div id="header">
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
  emits: ['search', 'clear-search'],
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

    context.expose({
      clearSearch
    })

    return {
      search,
      searchStr,
      searchBox,
      clearSearch
    }
  }
}
</script>
