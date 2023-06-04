<template>
  <q-page padding>
    <q-card :key="store.items">
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
          DATA TAGIHAN PASIEN
        </div>
        <div class="row fit justify-center items-center text-weight-bold f-14">
          periode {{ store.tanggal.from }} - {{ store.tanggal.to }}
        </div>
      </q-card-section>
      <q-card-section>
        <CustomTable
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
          row-no
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
              DATA TAGIHAN PASIEN
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
                  :fetch="fetchData"
                  :fields="jsonFields"
                  :before-generate="startDownload"
                  :before-finish="finishDownload"
                  name="tagihan.xls"
                >
                  <app-btn
                    label="Download Excel"
                    icon="icon-mat-download"
                    push
                    :loading="loading"
                  />
                </download-excel>
              </div>
            </div>
          </template>
          <!-- pengganti header karena header di disable -->
          <template #top-row>
            <th>
              <div class="row items-center text-weight-bold">
                No
              </div>
            </th>
            <th>
              <div class="row items-center text-weight-bold">
                Tanggal
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Pasien
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Poli
              </div>
            </th>
            <th colspan="2">
              <div class="row justify-center text-weight-bold">
                Apotik
              </div>
              <div class="row justify-start text-weight-bold">
                <div class="col-6">
                  Racikan
                </div>
                <div class="col-6">
                  Non Racikan
                </div>
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Laborat
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Radiologi
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Sistem Bayar
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                Sub Total
              </div>
            </th>
          </template>
          <!-- Row paling bawah -->
          <template #bottom-row>
            <td colspan="9">
              <div class="text-weight-bold">
                Total Tagihan periode {{ store.tanggal.from }} - {{ store.tanggal.to }}
              </div>
            </td>
            <td>
              <div class="text-weight-bold">
                Rp. {{ formatDouble(store.items.map(it=>it.subtotal).reduce((a,b)=>a+b,0)) }}
              </div>
            </td>
          </template>
          <template #col-tanggal>
            Tanggal
          </template>
          <template #col-pasien>
            Pasien
          </template>
          <template #col-poli>
            Poli
          </template>
          <template #col-apotikrajal>
            Apotek Racikan
          </template>
          <template #col-apotikpoli>
            Apotek Non racikan
          </template>
          <template #col-laborat>
            Laborat
          </template>
          <template #col-radiologi>
            Radiologi
          </template>
          <template #col-msistembayar>
            Sitem Bayar
          </template>
          <template #col-subtotal>
            Sub Total
          </template>
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.rs3) }}
          </template>
          <template #cell-pasien="{row}">
            <div v-if="row.masterpasien">
              <div class="row no-wrap">
                {{ row.rs1 }}
              </div>
              <div class="row no-wrap">
                {{ row.masterpasien[0].rs1 }}
              </div>
              <div class="kecilin">
                {{ row.masterpasien[0].rs2 }}
              </div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-poli="{row}">
            <div class="kecilin">
              {{ row.relmpoli?row.relmpoli.rs2:'-' }}
            </div>
          </template>
          <template #cell-apotikrajal="{row}">
            <div v-if="row.rajalracik">
              <div
                v-for="(nota,a) in row.rajalracik"
                :key="a"
              >
                <div class="row items-center q-col-gutter-sm text-weight-bold mb-xs q-mt-sm">
                  <div class="col-12">
                    {{ nota.nota }}
                  </div>
                </div>

                <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                  <div class="col-7">
                    Nama
                  </div>
                  <div class="col-4">
                    Jumlah
                  </div>
                </div>
                <div
                  v-for="(item,i) in nota.rinci"
                  :key="i"
                  class="anu row items-center q-mb-xs q-col-gutter-sm"
                >
                  <div class="col-8 wrap_it">
                    {{ item.racikanrinci.rs2 }}
                  </div>
                  <div class="col-4 text-right">
                    {{ formatDouble(item.subtotal) }}
                  </div>
                </div>
                <div class="row items-center q-col-gutter-sm text-weight-bold">
                  <div class="col-8">
                    subtotal
                  </div>
                  <div class="col-4">
                    {{ formatDouble(nota.subtotal) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-apotikpoli="{row}">
            <div v-if="row.rajalpoli">
              <div
                v-for="(nota,a) in row.rajalpoli"
                :key="a"
              >
                <div class="row items-center q-col-gutter-sm mb-xs q-mt-sm text-weight-bold">
                  <div class="col-12">
                    {{ nota.nota }}
                  </div>
                </div>

                <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                  <div class="col-7">
                    Nama
                  </div>
                  <div class="col-4 ">
                    Jumlah
                  </div>
                </div>
                <div
                  v-for="(item,i) in nota.rinci"
                  :key="i"
                  class="anu row items-center q-mb-xs q-col-gutter-sm"
                >
                  <div class="col-8 wrap_it">
                    {{ item.mobat.rs2 }}
                  </div>
                  <div class="col-4 text-right">
                    {{ formatDouble(item.subtotal) }}
                  </div>
                </div>
                <div class="row items-center q-col-gutter-sm text-weight-bold">
                  <div class="col-8">
                    subtotal
                  </div>
                  <div class="col-4">
                    {{ formatDouble(nota.subtotal) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-laborat="{row}">
            <div v-if="row.lab">
              <div
                v-for="(nota,a) in row.lab"
                :key="a"
              >
                <div class="row items-center q-col-gutter-sm text-weight-bold mb-xs q-mt-sm">
                  <div class="col-12">
                    {{ nota.nota }}
                  </div>
                </div>

                <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                  <div class="col-7">
                    Nama
                  </div>
                  <div class="col-4">
                    Jumlah
                  </div>
                </div>
                <div
                  v-for="(item,i) in nota.rinci"
                  :key="i"
                  class="anu row items-center q-mb-xs q-col-gutter-sm"
                >
                  <div class="col-8 wrap_it">
                    {{ item.pemeriksaanlab.rs21!==''?item.pemeriksaanlab.rs21:item.pemeriksaanlab.rs2 }}
                  </div>
                  <div class="col-4 text-right">
                    {{ formatDouble(item.subtotal) }}
                  </div>
                </div>
                <div class="row items-center q-col-gutter-sm text-weight-bold">
                  <div class="col-8">
                    subtotal
                  </div>
                  <div class="col-4">
                    {{ formatDouble(nota.subtotal) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-radiologi="{row}">
            <div v-if="row.radiolog">
              <div
                v-for="(nota,a) in row.radiolog"
                :key="a"
              >
                <div class="row items-center q-col-gutter-sm text-weight-bold q-mb-xs q-mt-sm">
                  <div class="col-12">
                    {{ nota.nota }}
                  </div>
                </div>

                <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                  <div class="col-7">
                    Nama
                  </div>
                  <div class="col-4">
                    Jumlah
                  </div>
                </div>
                <div
                  v-for="(item,i) in nota.rinci"
                  :key="i"
                  class="anu row items-center q-mb-xs q-col-gutter-sm"
                >
                  <div class="col-8 wrap_it">
                    {{ item.relmasterpemeriksaan?item.relmasterpemeriksaan.rs2:'-' }}
                  </div>
                  <div class="col-4 text-right">
                    {{ formatDouble(item.subtotal) }}
                  </div>
                </div>
                <div class="row items-center q-col-gutter-sm text-weight-bold">
                  <div class="col-8">
                    subtotal
                  </div>
                  <div class="col-4">
                    {{ formatDouble(nota.subtotal) }}
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template #cell-msistembayar="{row}">
            <div class="kecilin">
              {{ row.msistembayar?row.msistembayar.rs2:'-' }}
            </div>
          </template>
          <template #cell-subtotal="{row}">
            {{ formatDouble(row.subtotal) }}
          </template>
        </CustomTable>
        <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { date } from 'quasar'
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useSimrsLaporanKeuanganBillRajalStore } from 'src/stores/simrs/laporan/keuangan/billrajal/billrajal'
import CustomTable from '../../rekap/CustomTable.vue'
import { ref } from 'vue'

const store = useSimrsLaporanKeuanganBillRajalStore()

// data for print --start--
const loading = ref(false)
function startDownload() {
  loading.value = true
}
function finishDownload() {
  loading.value = false
}
const jsonFields = {
  No: 'no',
  Tanggal: 'tanggal',
  Pasien: 'pasien',
  Poli: 'poli',
  'Apotek Racikan': 'racikan',
  'Apotek Non Racikan': 'nonracikan',
  Laborat: 'laborat',
  Radiologi: 'radiologi',
  'Sistem Bayar': 'bayar',
  'Sub Total': 'subtotal'
}
function fetchData() {
  loading.value = true
  const data = []
  store.items.forEach((item, i) => {
    const temp = {}
    temp.no = i + 1
    temp.subtotal = item.subtotal
    temp.tanggal = date.formatDate(item.rs3, 'DD MMMM YYYY')
    temp.pasien = item.masterpasien ? item.rs1 + ', ' + item.masterpasien[0].rs1 + ', ' + item.masterpasien[0].rs2 : '-'
    temp.poli = item.relmpoli ? item.relmpoli.rs2 : '-'
    temp.racikan = item.rajalracik ? 'Nota : ' + item.rajalracik.map(a => a.nota) + ', Subtotal ' + item.rajalracik.map(a => a.subtotal) + ', rinci : ' + item.rajalracik.map(a => a.rinci.map(anu => { return ' ' + anu.racikanrinci.rs2 + ' [' + anu.subtotal + ']' })) : '-'
    temp.nonracikan = item.rajalpoli ? 'Nota : ' + item.rajalpoli.map(a => a.nota) + ', Subtotal ' + item.rajalpoli.map(a => a.subtotal) + ', rinci : ' + item.rajalpoli.map(a => a.rinci.map(anu => { return ' ' + anu.mobat.rs2 + ' [' + anu.subtotal + ']' })) : '-'
    temp.laborat = item.lab ? 'Nota : ' + item.lab.map(a => a.nota) + ', Subtotal ' + item.lab.map(a => a.subtotal) + ', rinci : ' + item.lab.map(a => a.rinci.map(anu => { return ' ' + (anu.pemeriksaanlab.rs21 !== '' ? anu.pemeriksaanlab.rs21 : anu.pemeriksaanlab.rs2) + ' [' + anu.subtotal + ']' })) : '-'
    temp.radiologi = item.radiolog ? 'Nota : ' + item.radiolog.map(a => a.nota) + ', Subtotal ' + item.radiolog.map(a => a.subtotal) + ', rinci : ' + item.radiolog.map(a => a.rinci.map(anu => { return ' ' + (anu.relmasterpemeriksaan ? anu.relmasterpemeriksaan.rs2 : '-') + ' [' + anu.subtotal + ']' })) : '-'
    temp.bayar = item.msistembayar ? item.msistembayar.rs2 : '-'
    data.push(temp)

    // console.log('in', i, 'item', item)
  })
  loading.value = false
  return data
}
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

store.getInitialData()
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
