<template>
  <div
    class="row full-height full-width"
    style="overflow: hidden;"
  >
    <div
      class="col-6 full-height"
      style="border-right: 2px solid rgb(160, 160, 160);"
    >
      <FormDiagnosaKeperawatan
        :key="props?.pasien"
        :pasien="props?.pasien"
      />
    </div>
    <div
      class="col-6 full-height"
    >
      <ListDiagnosaKeperawatan
        :key="props?.pasien"
        :pasien="props.pasien"
      />
    </div>
    <!-- <div class="row">
      <div style="width:40%">
        <q-card
          flat
          bordered
          square
          class="full-height"
        >
          <FormDiagnosaKeperawatan
            :key="props?.pasien"
            :pasien="props?.pasien"
          />
        </q-card>
      </div>
      <div style="width:40%">
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
    </div> -->
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
