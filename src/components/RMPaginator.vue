<template>
  <ul
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
      v-for="page in pages"
      :key="page"
      :class="{'active': currentPage === page}"
      @click="goTo(page)"
    >
      {{ page }}
    </li>
    <li
      v-if="currentPage < pages"
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

export default {
  props: {
    pages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ['go-next', 'go-prev', 'go-to'],
  setup(props, context) {
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
      goPrev,
      goNext,
      goTo
    }
  }
}
</script>
