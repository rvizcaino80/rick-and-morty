<template>
  <div id="menu">
    <ul>
      <li
        v-for="(menuOption, key) in menuOptions"
        :key="menuOption"
        :class="{ 'active': selectedOption === key }"
        @click="setOption(key)"
      >
        {{ menuOption }}
      </li>
    </ul>
  </div>
</template>

<script>

/* Vue features */
import { shallowReactive, toRefs } from 'vue'

export default {
  emits: ['option-changed'],
  setup(props, context) {
    // Menu options ENUM
    const menuOptions = Object.freeze({
      all: 'All',
      unknown: 'Unknown',
      male: 'Male',
      female: 'Female',
      genderless: 'Genderless'
    })

    // Local state management
    const state = shallowReactive({
      selectedOption: Object.keys(menuOptions)[0]
    })

    // Functions
    function setOption(key) {
      // Update menu option and emit an event for updating the data in parent
      state.selectedOption = key
      context.emit('option-changed', state.selectedOption)
    }

    return {
      ...toRefs(state),
      menuOptions,

      // Functions
      setOption
    }
  }
}
</script>
