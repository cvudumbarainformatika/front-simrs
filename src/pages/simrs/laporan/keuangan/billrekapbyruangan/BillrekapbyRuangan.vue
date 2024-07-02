<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row items-center garis-bawah">
          <div class="col-2">
            <q-img
              src="~assets/images/logo-kota-grey.png"
              spinner-color="white"
              style="height: 3.56cm; max-width: 2.86cm"
            />
          </div>
          <div class="col-8">
            <div class="row justify-center f-18">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center f-28 text-weight-bold">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div class="row justify-center f-14">
              Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
            </div>
            <div class="row justify-center f-14">
              E-mail : rsudprob@probolinggokota.go.id
            </div>
            <div class="row justify-center f-14 text-weight-bold">
              PROBOLINGGO  67219
            </div>
          </div>
          <div class="col-2">
            <q-img
              src="~assets/logos/logo-rsud.png"
              spinner-color="white"
              style="height: 4cm; max-width: 4cm"
            />
          </div>
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-18">
          REKAP TAGIHAN PASIEN RAWAT JALAN
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-14">
          periode
        </div>
      </q-card-section>
      <q-card-section>
        <Customtable
          :ada-cari="false"
        >
          <!-- tombol print -->
          <template #header-right-before>
            <!-- <q-btn
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
            </q-btn> -->
          </template>
          <template #header-left-after-search>
            <div class="row q-col-gutter-sm">
              <div>
                <app-input-date-human
                  :model="store.tanggal.from"
                  label="dari tanggal"
                  outlined
                  @db-model="setTo"
                  @set-display="setToDisp"
                />
              </div>
              <div>
                <app-input-date-human
                  :model="store.tanggal.to"
                  label="sampai tanggal"
                  outlined
                  @db-model="setTox"
                  @set-display="setToFromDisp"
                />
              </div>
              <div>
                <q-select
                  v-model="store.params.layanan"
                  use-input
                  fill-input
                  hide-selected
                  option-value="kodelayanan"
                  option-label="namalayanan"
                  :options="layanan"
                  dense
                  outlined
                  label="Pilih Layanan"
                  transition-show="scale"
                  transition-hide="scale"
                  :rules="[
                    val => !!val || 'Harus diisi'
                  ]"
                  @update:model-value="(val) => isiLayananx(val)"
                />
              </div>
              <div>
                <q-select
                  v-model="store.params.ruangan"
                  use-input
                  fill-input
                  hide-selected
                  option-value="koderuangan"
                  option-label="namaruangan"
                  :options="ruangan"
                  emit-value
                  map-options
                  dense
                  outlined
                  label="Pilih Ruangan"
                  transition-show="scale"
                  transition-hide="scale"
                  :rules="[
                    val => !!val && !!store.params.layanan || 'Harus diisi'
                  ]"
                />
              </div>
              <div>
                <app-btn
                  label="cari"
                  :loading="store.loading"
                  :disable="store.loading"
                  @click="store.initAmbilData"
                />
              </div>
            </div>
          </template>
        </Customtable>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
import Customtable from '../../rekap/CustomTable.vue'
import { useLaporanRekapBillByRuanganStore } from 'src/stores/simrs/laporan/keuangan/billbyruangan/billrekapbyruangan'

const store = useLaporanRekapBillByRuanganStore()
// const to = date.formatDate(Date.now(), 'DD MMMM YYYY')
// const from = date.formatDate(Date.now(), 'DD MMMM YYYY')
const layanan = ref([
  {
    kodelayanan: '1',
    namalayanan: 'IGD'
  },
  {
    kodelayanan: '2',
    namalayanan: 'RAWAT JALAN'
  },
  {
    kodelayanan: '3',
    namalayanan: 'RAWAT INAP'
  }
])
const ruangan = ref(null)
// const koderuangan = ref(null)

function isiLayananx (val) {
  store.params.ruangan = ''
  console.log('sasa', val)
  if (val.kodelayanan === '1') {
    this.ruangan = [
      {
        koderuangan: 'POL014',
        namaruangan: 'IGD'
      }
    ]
  }
  else if (val.kodelayanan === '2') {
    this.ruangan = store.rajal.map(x => {
      return {
        koderuangan: x.kodepoli,
        namaruangan: x.polirs
      }
    })
    this.ruangan.unshift(
      {
        koderuangan: '1',
        namaruangan: 'Semua Ruangan'
      }
    )
  }
  else if (val.kodelayanan === '3') {
    this.ruangan = store.ranap.map(x => {
      return {
        koderuangan: x.rs4,
        namaruangan: x.rs5
      }
    })
    this.ruangan.unshift(
      {
        koderuangan: '1',
        namaruangan: 'Semua Ruangan'
      }
    )
  }
}

function setToDisp (vaal) {
  store.tanggal.from = vaal
}

function setToFromDisp (vaal) {
  store.tanggal.to = vaal
}

function setTo (val) {
  store.params.tgldari = val
}

function setTox (val) {
  store.params.tglsampai = val
}

store.getRuanganPoli()
store.getRuanganRanap()
</script>

<style lang="scss" scoped>
.garis-bawah{
  border-bottom: 6px solid black;
  border-bottom-style: double;
}
.anu{
  max-width: 150px;
  min-width: 50px;
}
.wrap_it{
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  white-space: normal !important;
  word-break: break-word;
}
.kecilin{
  min-width: 10px;
  max-width: 100px;
  white-space: normal !important;
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  word-break: break-word;
}

</style>
