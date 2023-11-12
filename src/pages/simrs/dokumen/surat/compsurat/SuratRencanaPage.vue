<template>
  <div v-if="props?.pasien?.planning?.length">
    <div
      v-for="(toItem,i) in props?.pasien?.planning"
      :key="i"
      class="q-mb-lg"
    >
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
        <div>
          <div class="row items-center justify-between q-mb-sm">
            <div>
              <img
                v-if="pasien?.groups==='1'"
                src="~assets/logos/logobpjs.svg"
                spinner-color="white"
                class="q-mb-sm"
              >
              <img
                v-else
                src="~assets/logos/logo-rsud.png"
                spinner-color="white"
                style="height: 2cm; max-width: 2cm"
              >
              <!-- style="height: 3.56cm; max-width: 2.86cm" -->
            </div>
            <div>
              <div
                :key="toItem"
                class="row"
              >
                Surat Rencana {{ toItem?.rs4 }}
              </div>
              <div class="row">
                UOBK RSUD dr. MOH SALEH
              </div>
            </div>
            <div>No. {{ setNomor(toItem) }}</div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="col-3">
              Kepada Yth
            </div>
            <div class="col-9">
              : {{ setKepada(toItem) }}
            </div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div>
              Mohon Pemeriksaan dan Penanganan lebih lanjut :
            </div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="col-3">
              No Kartu
            </div>
            <div class="col-9">
              : {{ pasien?.noka }}
            </div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="col-3">
              No RM
            </div>
            <div class="col-9">
              : {{ pasien?.norm }}
            </div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="col-3">
              Nama Peserta
            </div>
            <div class="col-9">
              : {{ pasien?.nama }}
            </div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="col-3">
              Tgl Lahir
            </div>
            <div class="col-9">
              : {{ pasien?.tgllahir }}
            </div>
          </div>
          <div class="row items-center justify-between q-mb-sm">
            <div class="col-3">
              Diagnosa
            </div>
            <div class="col-9">
              : {{ pasien?.diagnosa.length?pasien?.diagnosa[0].masterdiagnosa?.rs1 + ' - ' + pasien?.diagnosa[0].masterdiagnosa?.rs4 :'-' }}
            </div>
          </div>
          <div class="row items-center justify-between q-mb-xl">
            <div class="col-7" />
            <div class="col-4 text-center">
              Mengetahui DPJP
            </div>
          </div>
          <div class="row items-center justify-between ">
            <div class="col-7 f-10">
              Tgl Entri {{ date.formatDate(pasien.tgl_kunjungan,'DD/MM/YYYY') }}  |  Tgl Cetak {{ date.formatDate(Date.now(),'DD/MM/YYYY') }} <span class="text-italic">dari RS</span>
            </div>
            <div class="col-4 text-center">
              {{ pasien?.dokter }}
            </div>
          </div>
        </div>
      </div>
      <q-separator class="q-my-md" />
    </div>
  </div>
  <div v-if="!props?.pasien?.planning?.length">
    <app-no-data />
  </div>
</template>
<script setup>
import { date } from 'quasar'
// import { ref } from 'vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

// const toItem = ref(null)

function setKepada(val) {
  if (val?.rs4 === 'Kontrol') {
    if (val?.kontrol) {
      return val?.kontrol?.namaDokter
    } else { return '-' }
  } else if (val?.rs4 === 'Konsultasi') {
    if (val?.masterpoli) {
      return val?.masterpoli?.rs2
    } else { return '-' }
  } else if (val?.rs4 === 'Rawat Inap') {
    if (props.pasien) {
      return props.pasien.dokter
    } else { return '-' }
  } else if (val?.rs4 === 'Rumah Sakit Lain') {
    if (val?.transrujukan) {
      return 'Poli ' + val?.transrujukan?.poli + ', ' + val?.transrujukan?.rs7
    } else { return '-' }
  }
}
function setNomor(val) {
  if (val?.rs4 === 'Kontrol') {
    if (val?.kontrol) {
      return val?.kontrol?.noSuratKontrol
    } else { return '-' }
  } else if (val?.rs4 === 'Konsultasi') {
    if (val?.masterpoli) {
      return val?.masterpoli?.rs2
    } else { return '-' }
  } else if (val?.rs4 === 'Rawat Inap') {
    if (val?.spri) {
      return val?.spri?.noSuratKontrol
    } else { return '-' }
  } else if (val?.rs4 === 'Rumah Sakit Lain') {
    if (val?.transrujukan) {
      return val?.transrujukan?.rs3
    } else { return '-' }
  }
}
const printObj = {
  id: 'printMe',
  popTitle: 'Surat Keterangan Sehat'

}
</script>
<style lang="scss" scoped>
.endas{
  border-bottom: 1px black solid;
  font-size: 24px;
}
</style>
