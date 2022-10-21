<template>
  <div>
    <div class="bg-white q-pa-lg">
      Submenu  {{ title }}
      <div class="submenus">
        {{ submenus }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  menu: {
    type: [String, Number],
    default: 1
  },
  items: {
    type: Array,
    default: () => []
  }
})

const submenus = computed(() => {
  let arr = []
  if (!props.menu) return arr
  if (props.items.length > 0) arr = props.items.filter(x => x.id === props.menu)[0].submenu
  return arr
})
const title = computed(() => {
  let txt = ''
  if (!props.menu) return txt
  if (props.items.length > 0) txt = props.items.filter(x => x.id === props.menu)[0].nama
  return txt
})
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
