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
        v-model="searchStr"
        type="text"
        placeholder="Buscar personaje..."
        @keyup.enter="search"
      >
    </div>
  </div>
</template>

<script>

/* Vue features */
import { ref } from 'vue'

export default {
  emits: ['search'],
  setup(props, context) {
    const searchStr = ref()

    function search() {
      context.emit('search', searchStr.value)
    }

    function clearSearch() {
      searchStr.value = ''
    }

    context.expose({
      clearSearch
    })

    return {
      search,
      searchStr,
      clearSearch
    }
  }
}
</script>
