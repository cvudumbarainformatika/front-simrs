<template>
  <div>
    <div class="bg-white q-pa-lg">
      <div class="row items-center">
        <div class="text-h6 my-flex-1">
          Submenu  {{ title }}
        </div>
        <q-btn
          v-if="items.length > 0"
          round
          icon="icon-mat-add"
          size="sm"
          padding="sm"
          color="primary"
          @click="emits('addSubmenu', menuId)"
        />
      </div>
      <q-separator class="q-my-md" />
      <div class="submenus">
        <div
          v-if="submenus.length === 0"
          class="column flex-center"
        >
          SubMenu Belum Ada
        </div>
        <div v-else>
          {{ submenus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  menu: {
    type: [String, Number],
    default: 0
  },
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['addSubmenu'])

const submenus = computed(() => {
  let arr = []
  // const id = props.items[props.menu].id
  if (props.menu.length === 0) return arr
  if (props.items.length > 0) arr = props.items[props.menu].submenu
  return arr
})
const title = computed(() => {
  let txt = ''
  // const id = props.items[props.menu].id
  if (props.menu.length === 0) return txt
  if (props.items.length > 0) txt = props.items[props.menu].nama
  return txt
})
const menuId = computed(() => {
  let txt = 0
  // const id = props.items[props.menu].id
  if (props.menu.length === 0) return txt
  if (props.items.length > 0) txt = props.items[props.menu].id
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
