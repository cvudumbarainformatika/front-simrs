<template>
  <div>
    <q-btn-dropdown
      menu-anchor="bottom left"
      menu-self="top left"
      :menu-offset="[20, 0]"
      class="o-back-color-dropdown"
      content-class="o-back-color-menu"
      split
      flat
      size="xs"
      padding="xs"
    >
      <template #label>
        <div
          class="flex column flex-center"
          @click="clickedLabel"
        >
          <q-icon
            size="15px"
            :name="icon"
          />
          <div
            class="indicator"
            :style="`background: ${hex}`"
          />
        </div>
      </template>
      <!-- <o-color-board :active-color="activeColor" @select="onSelect" v-close-popup="closable" /> -->
      <q-color
        v-model="hex"
        class="my-picker"
        no-header
        no-footer
        default-view="palette"
        @update:model-value="clickedLabel"
      />
    </q-btn-dropdown>
    <!-- <q-tooltip :delay="500">{{$o.lang.editor.highlightColor}}</q-tooltip> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hex = ref('#ffec3d')

const emits = defineEmits(['setColor'])
defineProps({
  icon: {
    type: String,
    default: 'text_format'
  }
})

function clickedLabel() {
  emits('setColor', hex.value)
}
</script>

<style lang="scss" scoped>
.indicator {
  width: 100%;
  height: 5px;
  margin-top: -4px;
  z-index: 10;
}
</style>
