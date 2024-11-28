<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-12 full-height">
        <ListTinjauanUlangPage
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ListTinjauanUlangPage from './comp/ListTinjauanUlangPage.vue'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

</script>
