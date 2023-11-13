<template>
  <div>
    <q-bar
      dense
      class="bg-white"
    >
      <q-space />
      <q-btn
        ref="refPrint"
        v-print="printObj"
        unelevated
        color="dark"
        round
        size="sm"
        icon="icon-mat-print"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Print
        </q-tooltip>
      </q-btn>
    </q-bar>
    <div
      id="printMe"
      class="full-width"
    >
      <KopSuratPage />
      <!-- isi -->
      <div>
        <div class="row justify-center ">
          <div class="endas">
            Surat Rujukan Peserta BPJS
          </div>
        </div>
      </div>
      <!-- bottom -->
      <div class="q-mt-lg">
        <div class="row">
          <div class="col-6" />
          <div class="col-6 text-center">
            Probolinggo, {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
          </div>
        </div>
        <div class="row">
          <div class="col-6" />
          <div class="col-6 text-center">
            Dokter yang memeriksa,
          </div>
        </div>
        <div class="row q-my-xl" />
        <div class="row q-mt-xl">
          <div class="col-6" />
          <div class="col-6 text-center">
            {{ props?.pasien?.dokter }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import KopSuratPage from '../../surat/compsurat/KopSuratPage.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const printObj = {
  id: 'printMe',
  popTitle: 'Surat Pengantar Peserta BPJS'

}
</script>
<style lang="scss" scoped>
.endas{
  border-bottom: 1px black solid;
  font-size: 24px;
}
</style>
