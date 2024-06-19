<template>
  <div class="fit q-pa-sm scroll bg-grey-4">
    <q-card
      v-ripple
      flat borderred v-for="(item, n) in items" :key="n"
      :class="classHover === n ? 'bg-grey-3' : 'bg-white'"
      class="q-mb-sm cursor-pointer"
      @mouseover="onMouseOver(n)"
      @mouseleave="onMouseOver(-1)"
      @click="emits('select', item)"
    >
      <q-card-section class="row items-center q-px-md q-py-sm">
        <div>{{ item?.nama }}</div>
        <q-space />
        <q-btn flat icon="icon-mat-keyboard_arrow_right" color="primary" round size="sm" />
      </q-card-section>
    </q-card>

    <div style="margin-bottom: 100px;" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const classHover = ref(-1)

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['select'])

const onMouseOver = (val) => {
  classHover.value = val
}

</script>
