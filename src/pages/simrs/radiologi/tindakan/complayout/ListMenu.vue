<template>
  <q-list
    bordered
    separator
  >
    <q-item
      v-for="(item, i) in menus"
      :key="i"
      v-ripple
      clickable
      :active="menu===item"
      active-class="bg-primary text-white"
      @click="emits('menuClick',item)"
    >
      <q-item-section avatar>
        <q-icon
          :name="item.icon"
          size="xs"
        />
      </q-item-section>
      <q-item-section>{{ item.label }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
const emits = defineEmits(['menuClick'])
defineProps({
  menus: {
    type: Array,
    default: () => []
  },
  menu: {
    type: Object,
    default: null
  }
})
</script>
