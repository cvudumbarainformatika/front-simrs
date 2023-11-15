<template>
  <div>
    <div>
      <div class="row q-mb-sm">
        <app-input
          v-model="obat"
          class="full-width"
          label="Obat"
          outlined
        />
      </div>
      <div class="row q-mb-sm">
        <app-input-date
          v-model="tglKembali"
          class="full-width"
          label="Tanggal kembali"
          outlined
          @set-model="(val)=>tglKembali=val"
        />
      </div>
      <div class="row q-mb-sm">
        <app-input
          v-model="lain"
          class="full-width"
          label="Lain-lain"
          outlined
        />
      </div>
    </div>
    <q-bar
      dense
      class="bg-white q-mt-md"
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
            Surat Rujukan Balik
          </div>
        </div>
        <div class="row q-my-sm">
          Teman sejawat Yth.
        </div>
        <div class="row q-my-sm">
          Mohon Kontrol selanjutnya kepada:
        </div>
        <div class="row q-my-sm q-ml-md">
          <div class="col-4">
            Nama
          </div>
          <div class="col-8">
            {{ pasien?.nama }}
          </div>
        </div>
        <div class="row q-my-sm q-ml-md">
          <div class="col-4">
            Diagnosa
          </div>
          <div class="col-8">
            <div
              v-for="(diag,i) in pasien?.diagnosa"
              :key="i"
            >
              {{ diag?.masterdiagnosa.rs1 }} - {{ diag?.masterdiagnosa.rs4 }}
            </div>
          </div>
        </div>
        <div class="row q-my-sm q-ml-md">
          <div class="col-4">
            No. Kartu BPJS
          </div>
          <div class="col-8">
            {{ pasien?.noka }}
          </div>
        </div>
        <div class="row q-my-sm">
          Tindak Lanjut yang dianjurkan:
        </div>
        <div class="row q-my-sm items-center">
          <div class="col-1">
            <q-checkbox v-model="perluRanap" />
          </div>
          <div class="col-11">
            Perlu Rawat Inap
          </div>
        </div>
        <div class="row q-my-sm items-center">
          <div class="col-1">
            <q-checkbox v-model="noKonsul" />
          </div>
          <div class="col-11">
            Konsultasi Selesai
          </div>
        </div>
        <div class="row q-my-sm items-center">
          <div class="col-1">
            <q-checkbox v-model="adaObat" />
          </div>
          <div class="col-11">
            Pengobatan dengan obat-obatan : <span v-if="adaObat">{{ obat }}</span>
          </div>
        </div>
        <div class="row q-my-sm items-center">
          <div class="col-1">
            <q-checkbox v-model="kembali" />
          </div>
          <div class="col-11">
            Kontrol kembali ke RS tanggal : <span v-if="kembali"> <b>{{ date.formatDate(tglKembali,'DD MMMM YYYY') }}</b></span>
          </div>
        </div>
        <div class="row q-my-sm items-center">
          <div class="col-1">
            <q-checkbox v-model="adaLain" />
          </div>
          <div class="col-11">
            Lain-lain : <span v-if="adaLain"> {{ lain }}</span>
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
import { ref } from 'vue'
import KopSuratPage from '../../surat/compsurat/KopSuratPage.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const tglKembali = ref('')
const obat = ref('')
const lain = ref('')
const kembali = ref(false)
const adaObat = ref(false)
const adaLain = ref(false)
const perluRanap = ref(false)
const noKonsul = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Surat Pengantar Rujuk Balik'

}
</script>
<style lang="scss" scoped>
.endas{
  border-bottom: 1px black solid;
  font-size: 24px;
}

.indent{
  text-indent: 50px;
}
</style>
