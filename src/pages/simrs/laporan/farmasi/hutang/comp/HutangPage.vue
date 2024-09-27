<template>
  <q-page>
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
          {{ store.judulreport }}
        </div>
        <div align="center">
          <q-select
            v-model="store.params.jenisreport"
            use-input
            fill-input
            hide-selected
            option-value="kodereport"
            option-label="namareport"
            :options="jenisreport"
            emit-value
            map-options
            dense
            outlined
            label="Pilih Jenis Laporan Hutang"
            transition-show="scale"
            transition-hide="scale"
            style="width: 350px"
            :loading="store.loading"
            @update:model-value="pilihjenislaporan"
          />
        </div>
        <!-- <div class="row fit justify-center items-center text-weight-bold f-14">
          periode
        </div> -->
      </q-card-section>
      <div v-if="store.params.jenisreport === '1'">
        <HutangpertanggalByPenerimaanVue />
      </div>
      <div v-else-if="store.params.jenisreport === '2'">
        <HutangpertanggalByBAST />
      </div>
      <div v-else-if="store.params.jenisreport === '3'">
        <MutasiHutangObat />
      </div>
      <div v-else-if="store.params.jenisreport === '4'">
        <HutangByTransaksi />
      </div>
      <div v-else-if="store.params.jenisreport === '5'">
        <HutangKonsinyasi />
      </div>
    </q-card>
  </q-page>
</template>
<script setup>
import { ref } from 'vue'
// import CustomTable from '../../../rekap/CustomTable.vue'
import { usehutangObatPerTanggalStore } from 'src/stores/simrs/laporan/farmasi/hutang/hutangobatpertanggal'
// import { usehutangObatPerTanggalBastStore } from 'src/stores/simrs/laporan/farmasi/hutang/hutangobatpertanggalBast'
// import TablePage from './TablePage.vue'
// import { formatDouble } from 'src/modules/formatter'
import HutangpertanggalByPenerimaanVue from './HutangpertanggalByPenerimaan.vue'
import HutangpertanggalByBAST from './HutangpertanggalByBAST.vue'
import MutasiHutangObat from './MutasiHutangObat.vue'
import HutangByTransaksi from './HutangByTransaksi.vue'
import HutangKonsinyasi from './HutangKonsinyasi.vue'

const store = usehutangObatPerTanggalStore()
// const storebast = usehutangObatPerTanggalBastStore()
const jenisreport = ref([
  {
    kodereport: '1',
    namareport: 'Laporan Hutang Pertanggal By Penerimaan'
  },
  {
    kodereport: '2',
    namareport: 'Laporan Hutang Pertanggal By BAST'
  },
  {
    kodereport: '3',
    namareport: 'Laporan Mutasi Hutang Obat'
  },
  {
    kodereport: '4',
    namareport: 'Laporan Hutang By Transaksi'
  },
  {
    kodereport: '5',
    namareport: 'Laporan Hutang Konsinyasi'
  }
])

function pilihjenislaporan (val) {
  if (val === '1') {
    store.params.jenisreport = '1'
    store.judulreport = 'Laporan Hutang Pertanggal By Penerimaan'
  }
  else if (val === '2') {
    store.params.jenisreport = '2'
    store.judulreport = 'Laporan Hutang Pertanggal By BAST'
  }
  else if (val === '3') {
    store.params.jenisreport = '3'
    store.judulreport = 'Laporan Mutasi Hutang Obat'
  }
  else if (val === '4') {
    store.params.jenisreport = '4'
    store.judulreport = 'Laporan Hutang By Transaksi'
  }
  else {
    store.params.jenisreport = '5'
    store.judulreport = 'Laporan Hutang Konsinyasi'
  }
}

// function setToDisp (vaal) {
//   store.tanggal.from = vaal
// }

</script>
