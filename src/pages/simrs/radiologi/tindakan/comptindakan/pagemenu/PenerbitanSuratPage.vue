<template>
  <div
    class="q-pa-sm"
    style="overflow: scroll;"
  >
    <div class="row q-col-gutter-x-xs">
      <div class="col-12 full-height">
        <DocumentPage
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import DocumentPage from 'src/pages/simrs/dokumen/comppoli/DocumentPageNew.vue'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
</script>
