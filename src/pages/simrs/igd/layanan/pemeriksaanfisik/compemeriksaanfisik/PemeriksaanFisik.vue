<template>
  <div class="full-height full-width">
    <div class="row full-height ">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormPemeriksaanFisik
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
        <ListPemeriksaanFisik
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </q-card>
    </div>
    <!-- <app-drawer-right-new
      :key="props.pasien"
      :seamless="seamless"
      :pasien="props.pasien"
      @click-btn="clickslideRight"
    >
      <template #content>
        <HistoryKanan
          :key="pasien"
          :pasien="pasien"
          title="HISTORY ANAMNESSIS LALU"
        />
      </template>
    </app-drawer-right-new> -->
  </div>
</template>
<script setup>
import ListPemeriksaanFisik from './ListPemeriksaanFisik.vue'
import FormPemeriksaanFisik from './FormPemeriksaanFisikPage.vue'

import { onMounted, onUnmounted, ref } from 'vue'

const seamless = ref(false)
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

onMounted(() => {
  // console.log(text.value)
  document.addEventListener('keypress', handleKeypress, false)
})

onUnmounted(() => {
  document.removeEventListener('keypress', handleKeypress, true)
})

const handleKeypress = (evt) => {
  if (evt.key === 'H' && evt.shiftKey) {
    seamless.value = !seamless.value
  }
}

// const clickslideRight = () => {
//   // console.log('ok')
//   seamless.value = !seamless.value
// }
</script>
