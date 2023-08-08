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
defineProps({
  menus: {
    type: Array,
    default: () => []
  }
})
</script>
