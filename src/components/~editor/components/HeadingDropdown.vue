<template>
  <div>
    <q-btn-dropdown
      :icon="item?item.icon:'icon-mat-menu'"
      size="sm"
      elevated
      padding="xs"
      color="primary"
      flat
      stretch
    >
      <template #label>
        <q-tooltip>
          {{ tooltip }}
        </q-tooltip>
      </template>
      <q-list>
        <section>
          <common-item
            v-for="(list , i) in headings"
            :key="i"
            v-close-popup
            :avatar="avatar"
            :icon="list.icon"
            :label="list.label"
            @click="hanleHeading(list)"
          />
        </section>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>
<script setup>
// import MenuBarBtn from './MenuBarBtn.vue'
// import { computed } from 'vue'
import CommonItem from './CommonItem.vue'

const emits = defineEmits(['paragraph', 'heading'])

defineProps({
  headings: {
    type: Array,
    default: () => []
  },
  tooltip: {
    type: String,
    default: 'Heading / Paragraph'
  },
  icon: {
    type: String,
    default: 'icon-mat-format_size'
  },
  item: {
    type: Object,
    default: null
  },
  avatar: {
    type: Boolean,
    default: false
  }

})

function hanleHeading(item) {
  emits('heading', item)
}
</script>
