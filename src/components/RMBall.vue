<template>
  <div
    class="ball"
    :class="status === 'Alive' ? 'bg-green-500': (status === 'Dead') ? 'bg-red-600' : 'bg-orange-400'"
  />
</template>

<script>

export default {
  props: {
    status: {
      type: String,
      required: true
    }
  }
}
</script>
