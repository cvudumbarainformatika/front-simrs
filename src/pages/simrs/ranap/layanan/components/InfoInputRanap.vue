<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Sedang Memuat Data ...'
  },
  noContent: {
    type: String,
    default: 'Belum Ada Data Tersimpan'
  }
})
</script>

<template>
  <div class="">
    <div v-if="props.items.length">
      <slot />
    </div>
    <div v-else class="column full-height flex-center" style="min-height: 300px;">
      <div v-if="!props.loading">
        {{ props.noContent }}
      </div>
      <div v-else class="column full-height flex-center">
        <q-spinner color="primary" size="2em" />
        <div>{{ props.loadingText }}</div>
      </div>
    </div>
  </div>
</template>
