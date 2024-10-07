<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormPenilaian
          :key="props.pasien"
          :pasien="props.pasien"
          tooltip="History Pasien (Shift + H)"
          @open-history="seamless = !seamless"
        />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <!-- <ListAnamnesis
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        /> -->
      </q-card>
    </div>
  </div>
</template>
<script setup>
import FormPenilaian from './comanamnesis/FormPenilaian.vue'
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
