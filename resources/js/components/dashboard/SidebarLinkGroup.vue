<template>
  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">
    <slot :handleClick="handleClick" :expanded="expanded" />
  </li>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'SidebarLinkGroup',
  setup() {
    const expanded = ref(false)

    const handleClick = () => {
      expanded.value = !expanded.value
    }

    return {
      expanded,
      handleClick,
    }
  },
}
</script>
