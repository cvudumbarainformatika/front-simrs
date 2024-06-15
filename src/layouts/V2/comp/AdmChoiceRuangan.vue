<template>
  <q-menu
    transition-show="flip-left"
    transition-hide="flip-right"
    :offset="[0,10]"
  >
    <q-list style="min-width: 131px">
      <q-item
        v-for="(opt, i) in option"
        :key="i"
        v-close-popup
        clickable
        @click="emit('setGudang',opt?.kode)"
      >
        <q-item-section>
          {{ opt?.nama ?? opt?.uraian }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script setup>
defineProps({
  option: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['setGudang'])
</script>
