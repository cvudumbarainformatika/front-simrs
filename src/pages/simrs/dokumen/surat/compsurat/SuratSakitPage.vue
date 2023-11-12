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
    <div id="printMe">
      <KopSuratPage />
      <!-- isi -->
      <div>
        <div class="row justify-center q-mb-lg">
          <div class="endas">
            Surat Keterangan Sakit
          </div>
        </div>
        <div>
          <div class="indent">
            Yang bertanda tangan dibawah ini <b>Dokter RSUD. dr. MOHAMAD SALEH KOTA PROBOLINGGO</b> dengan ini menyatakn bahwa :
          </div>

          <div
            class="row q-my-sm"
          >
            <div
              class="col-4"
              style="text-indent:50px;"
            >
              Nama
            </div>
            <div class="col-8">
              {{ pasien?.nama }}
            </div>
          </div>
          <div
            class="row q-my-sm"
          >
            <div
              class="col-4"
              style="text-indent:50px;"
            >
              Umur
            </div>
            <div class="col-8">
              {{ pasien?.usia }}
            </div>
          </div>
          <div
            class="row q-my-sm items-center"
          >
            <div
              class="col-4"
              style="text-indent:50px;"
            >
              Pekerjaan / Sekolah
            </div>
            <div class="col-8">
              <div class="print-hide">
                <app-input
                  v-model="pekerjaan"
                  label="Tulis pekerjaan"
                  outlined
                />
              </div>
              <div class="print-only">
                {{ pekerjaan }}
              </div>
            </div>
          </div>
          <div
            class="row q-my-sm"
          >
            <div
              class="col-4"
              style="text-indent:50px;"
            >
              Alamat
            </div>
            <div class="col-8">
              {{ pasien?.alamat }}
            </div>
          </div>

          <div class="indent">
            Dari hasil pemerikasaan, kami dapatkan yang bersangkutan dalam keadaan sakit sehingga tidak dapat
            <q-option-group
              v-model="doc"
              class="print-hide"
              :options="documents"
              inline
            />
            <span class="print-only text-weight-bold">
              {{ doc }}.
            </span>
            Karena itu memerlukan waktu beristirahat mulai tanggal
            <app-input-date
              :model="mulai"
              class="small print-hide"
              label="Dari"
              outlined
              @set-model="setMulai"
            />
            <span class="print-only text-weight-bold">
              {{ date.formatDate(mulai,'DD MMMM YYYY') }}
            </span>
            s/d
            <app-input-date
              :model="selesai"
              class="small  print-hide"
              label="Sampai"
              outlined
              @set-model="setSelesai"
            />
            <span class="print-only text-weight-bold">
              {{ date.formatDate(selesai,'DD MMMM YYYY') }}
            </span>
          </div>
          <div class="indent">
            Demikian Surat Keterangan ini kami berikan dengan sebenar-benarnya, dan agar yang berkepentingan menjadi maklum.
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
import KopSuratPage from './KopSuratPage.vue'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const mulai = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'))
const selesai = ref(date.formatDate(Date.now(), 'YYYY-MM-DD'))
const pekerjaan = ref('')
const doc = ref('Dinas')
const documents = ref([
  {
    label: 'Dinas',
    value: 'Dinas'
  },
  {
    label: 'Kerja',
    value: 'Kerja'
  },
  {
    label: 'Kuliah',
    value: 'Kuliah'
  },
  {
    label: 'Sekolah',
    value: 'Sekolah'
  }
])
function setSelesai(val) {
  selesai.value = val
}
function setMulai(val) {
  mulai.value = val
}
const printObj = {
  id: 'printMe',
  popTitle: 'Surat Keterangan Sakit'

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
.small{
  max-width:250px;
}
</style>
