<template>
  <q-page padding>
    <q-card :key="store.params.tgldari">
      <q-card-section>
        <div class="row garis-bawah">
          <div class="col-2">
            <q-img
              src="~assets/images/logo-kota-grey.png"
              spinner-color="white"
              style="height: 3.56cm; max-width: 2.86cm"
            />
          </div>
          <div class="col-10">
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
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-18">
          REKAP TAGIHAN PASIEN RAWAT JALAN
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-14">
          periode {{ store.tanggal.from }} - {{ store.tanggal.to }}
        </div>
      </q-card-section>
      <q-card-section>
        <app-table-extend
          id="printMe"
          :key="store.items"
          :columns="store.columns"
          :meta="store.meta"
          :column-hide="store.columnHide"
          :items="store.items"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :ada-cari="false"
          :default-btn="false"
          :ada-tambah="false"
          :enable-head="false"
          top-row
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
          <!-- header print -->
          <template #header-for-print>
            <div class="row garis-bawah">
              <div class="col-2">
                <q-img
                  src="~assets/images/logo-kota-grey.png"
                  spinner-color="white"
                  style="height: 3.56cm; max-width: 2.86cm"
                />
              </div>
              <div class="col-10">
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
            </div>
            <div class="row justify-center f-18 text-weight-bold q-my-sm">
              REKAP TAGIHAN PASIEN RAWAT JALAN
            </div>
            <div class="row justify-center f-14 text-weight-bold q-my-sm">
              periode {{ store.tanggal.from }} - {{ store.tanggal.to }}
            </div>
            <!-- <div class="row ">
              <div>  REKAP DATA PASIEN DI RR TAHUN {{ date.formatDate(store.params.to,'YYYY') }}</div>
            </div> -->
          </template>
          <!-- tombol print -->
          <template #header-right-before>
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
          </template>
          <!-- set periode -->
          <template #header-left-after-search>
            <div class="row q-col-gutter-sm">
              <div>
                <app-input-date-human
                  :model="store.tanggal.from"
                  label="dari tanggal"
                  outlined
                  :loading="store.loading"
                  @db-model="setFrom"
                  @set-display="setFromDisp"
                />
              </div>
              <div>
                <app-input-date-human
                  :model="store.tanggal.to"
                  label="sampai tanggal"
                  outlined
                  :loading="store.loading"
                  @db-model="setTo"
                  @set-display="setToDisp"
                />
              </div>
              <div>
                <app-btn
                  label="cari"
                  :loading="store.loading"
                  :disable="store.loading"
                  @click="ambilData"
                />
              </div>
              <div v-if="store.items.length">
                <download-excel
                  class="btn"
                  :data="store.items"
                  :fields="jsonFields"
                  :name="'tagihan periode '+ store.tanggal.from + '-' + store.tanggal.to+'.xls'"
                >
                  <app-btn
                    label="Download Excel"
                    icon="icon-mat-download"
                    push
                  />
                </download-excel>
              </div>
            </div>
          </template>
          <template #top-row>
            <!-- <th>
              <div class="row items-center text-weight-bold">
                No
              </div>
            </th> -->
            <th>
              <div class="row items-center text-weight-bold">
                Poli
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Dokter
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Jumlah Kunjungan
              </div>
            </th>
            <th>
              <div class="row justify-center text-weight-bold q-mb-sm">
                Jumlah Tagihan
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Jumlah Pendapatan
              </div>
            </th>
            <th colspan="3">
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Rincian
              </div>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                <div class="col-4">
                  Laborat
                </div>
                <div class="col-4">
                  Radiologi
                </div>
                <div class="col-4">
                  Obat
                </div>
              </div>
            </th>
          </template>
          <template #col-dokter>
            Dokter
          </template>
          <template #col-lab>
            Laborat
          </template>
          <template #col-rad>
            Radiologi
          </template>
          <template #col-obat>
            Obat
          </template>
          <template #col-poli>
            Poli
          </template>
          <template #col-kunjungan>
            Jumlah Kunjungan
          </template>
          <template #col-tagihan>
            Jumlah Tagihan
          </template>
          <template #cell-rad="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              {{ formatDouble(row.rad) }}
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ formatDouble(row.rad) }}
            </div>
          </template>
          <template #cell-obat="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              {{ formatDouble(row.obat) }}
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ formatDouble(row.obat) }}
            </div>
          </template>
          <template #cell-lab="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              {{ formatDouble(row.lab) }}
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ formatDouble(row.lab) }}
            </div>
          </template>
          <template #cell-poli="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              {{ row.poli }}
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ row.poli }}
            </div>
          </template>
          <template #cell-kunjungan="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              {{ row.kunjungan }}
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ row.kunjungan }}
            </div>
          </template>
          <template #cell-tagihan="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              {{ formatDouble(row.tagihan) }}
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ formatDouble(row.tagihan) }}
            </div>
          </template>
          <template #cell-pendapatan="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              {{ formatDouble(row.pendapatan) }}
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ formatDouble(row.pendapatan) }}
            </div>
          </template>
          <template #cell-dokter="{row}">
            <div
              v-if="row.dokter==='semua'"
              class="text-weight-bold"
            >
              <!-- {{ row.dokter }} -->
            </div>
            <div v-if="row.dokter!=='semua'">
              {{ row.dokter }}
            </div>
          </template>
          <template #col-pendapatan>
            Jumlah Pendapatan
          </template>
        </app-table-extend>
        <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { useSimrsLaporanKeuanganBillPoliStore } from 'src/stores/simrs/laporan/keuangan/billbypoli/billpoli'

// import { date } from 'quasar'
import { formatDouble } from 'src/modules/formatter'
import { ref } from 'vue'
const store = useSimrsLaporanKeuanganBillPoliStore()
store.getInitialData()

// data for print --start--
// const loading = ref(false)
// function startDownload() {
//   loading.value = true
// }
// function finishDownload() {
//   loading.value = false
// }
const jsonFields = {
  Poli: 'poli',
  Dokter: 'dokter',
  'Jumlah Kunjungan': 'kunjungan',
  'Jumlah Tagihan': 'tagihan',
  'Jumlah Pendapatan': 'pendapatan',
  Laborat: 'lab',
  Radiologi: 'rad',
  Obat: 'obat'
}
// function fetchData() {
//   loading.value = true
//   const data = []
//   store.items.forEach((item, i) => {
//     const temp = {}
//     temp.no = i + 1
//     temp.subtotal = item.subtotal
//     temp.tanggal = date.formatDate(item.rs3, 'DD MMMM YYYY')
//     temp.pasien = item.masterpasien ? item.rs1 + ', ' + item.masterpasien[0].rs1 + ', ' + item.masterpasien[0].rs2 : '-'
//     temp.poli = item.relmpoli ? item.relmpoli.rs2 : '-'
//     temp.racikan = item.rajalracik ? 'Nota : ' + item.rajalracik.map(a => a.nota) + ', Subtotal ' + item.rajalracik.map(a => a.subtotal) + ', rinci : ' + item.rajalracik.map(a => a.rinci.map(anu => { return ' ' + anu.racikanrinci.rs2 + ' [' + anu.subtotal + ']' })) : '-'
//     temp.nonracikan = item.rajalpoli ? 'Nota : ' + item.rajalpoli.map(a => a.nota) + ', Subtotal ' + item.rajalpoli.map(a => a.subtotal) + ', rinci : ' + item.rajalpoli.map(a => a.rinci.map(anu => { return ' ' + anu.mobat.rs2 + ' [' + anu.subtotal + ']' })) : '-'
//     temp.laborat = item.lab ? 'Nota : ' + item.lab.map(a => a.nota) + ', Subtotal ' + item.lab.map(a => a.subtotal) + ', rinci : ' + item.lab.map(a => a.rinci.map(anu => { return ' ' + (anu.pemeriksaanlab.rs21 !== '' ? anu.pemeriksaanlab.rs21 : anu.pemeriksaanlab.rs2) + ' [' + anu.subtotal + ']' })) : '-'
//     temp.radiologi = item.radiolog ? 'Nota : ' + item.radiolog.map(a => a.nota) + ', Subtotal ' + item.radiolog.map(a => a.subtotal) + ', rinci : ' + item.radiolog.map(a => a.rinci.map(anu => { return ' ' + (anu.relmasterpemeriksaan ? anu.relmasterpemeriksaan.rs2 : '-') + ' [' + anu.subtotal + ']' })) : '-'
//     temp.bayar = item.msistembayar ? item.msistembayar.rs2 : '-'
//     data.push(temp)

//     // console.log('in', i, 'item', item)
//   })
//   loading.value = false
//   return data
// }
// data for print --end--

function ambilData() {
  store.getDataTable()
}

function setFrom(val) {
  store.params.tgldari = val
}
function setFromDisp(val) {
  store.tanggal.from = val
  // console.log('params ', store.params)
  // console.log('tanggal', store.tanggal)
}
function setTo(val) {
  store.params.tglsampai = val
}
function setToDisp(val) {
  store.tanggal.to = val
  // console.log('params ', store.params)
  // console.log('tanggal', store.tanggal)
}

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Rekap',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback(vue) {
    printed.value = true
    console.log('wait...')
  },
  openCallback (vue) {
    console.log('opened')
  },
  closeCallback (vue) {
    printed.value = false
    console.log('closePrint')
  }
}

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
