<template>
  <menu-bar-btn
    icon="add"
    tooltip="Tambahkan Fitur"
  >
    <q-menu
      ref="addPopover"
      anchor="bottom left"
      self="top left"
      content-class="o-menu"
    >
      <section>
        <common-item
          v-close-popup
          icon="data_object"
          label="Codeblock"
          @click="emits('codeBlock')"
        />
      </section>
    </q-menu>
  </menu-bar-btn>
</template>
<script setup>
import MenuBarBtn from './MenuBarBtn.vue'
import CommonItem from './CommonItem.vue'

const emits = defineEmits(['codeBlock'])

defineProps({
  commands: {
    type: Object,
    default: () => {}
  },
  isActive: {
    type: Object,
    default: () => {}
  },
  opt: {
    type: Object,
    default: () => {}
  }
})
</script>
