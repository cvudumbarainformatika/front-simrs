<template>
  <div class="full-height full-width">
    <div class="row full-height">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormDiagnosaKeperawatan
          :key="props?.pasien"
          :pasien="props?.pasien"
        />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <ListDiagnosaKeperawatan
          :key="props?.pasien"
          :pasien="props.pasien"
        />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import ListDiagnosaKeperawatan from './ListDiagnosaKeperawatan.vue'
import FormDiagnosaKeperawatan from './FormDiagnosaKeperawatan.vue'
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

</script>
