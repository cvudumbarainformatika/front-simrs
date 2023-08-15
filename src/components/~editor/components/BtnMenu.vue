<template>
  <q-btn-dropdown
    color="dark"
    size="sm"
    elevated
    padding="xs"
    flat
    stretch
    :label="item?item.icon:'-'"
    no-caps
  >
    <q-list
      dense
      separator
    >
      <q-item
        v-for="(row,i) in items"
        :key="i"
        v-close-popup
        clickable
        active-class="bg-primary text-white"
        :active="item===row"
        @click="emits('setText',row)"
      >
        <q-item-section avatar>
          <q-avatar
            size="sm"
            :icon="row.icon"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ row.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script setup>
const emits = defineEmits(['setText'])
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  item: {
    type: Object,
    default: null
  }
})
</script>
