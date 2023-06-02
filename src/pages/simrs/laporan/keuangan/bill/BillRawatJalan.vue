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
          :enable-head="true"
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
            </div>
          </template>
          <!-- pengganti header karena header di disable -->
          <!-- <template #top-row>
            <th>
              <div class="row items-center text-weight-bold">
                TANGGAL
              </div>
            </th>
            <th>
              <div class="row items-center text-weight-bold">
                PASIEN
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                POLI
              </div>
            </th>
            <th>
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                PASIEN RR
              </div>
              <div class="row items-center text-weight-bold">
                <div class="col-6">
                  MASUK (JAM)
                </div>
                <div class="col-6">
                  KELUAR (JAM)
                </div>
              </div>
            </th>
            <th>
              <div class="row items-center text-weight-bold">
                LAMA
              </div>
            </th>
          </template> -->
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
            Apotek Rawat Jalan
          </template>
          <template #col-apotikpoli>
            Apotek Poli
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
            <div
              v-if="row.apotekracikanrajal.length"
            >
              <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                <div class="col-8">
                  Nama
                </div>
                <div class="col-4 text-right">
                  Jumlah
                </div>
              </div>
              <div
                v-for="(item,i) in row.apotekracikanrajal"
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
              <div class="anu row items-center q-col-gutter-sm text-weight-bold">
                <div class="col-8">
                  Total
                </div>
                <div class="col-4  text-right">
                  {{ formatDouble(row.apotekracikanrajal.map(apt=>apt.subtotal).reduce((a,b)=>a+b,0)) }}
                </div>
              </div>
            </div>
            <div v-if="!row.apotekracikanrajal.length">
              -
            </div>
          </template>
          <template #cell-apotikpoli="{row}">
            <div v-if="row.apotekrajalpolilalu.length">
              <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                <div class="col-8">
                  Nama
                </div>
                <div class="col-4">
                  Jumlah
                </div>
              </div>
              <div
                v-for="(item,i) in row.apotekrajalpolilalu"
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
              <div class="anu row items-center q-col-gutter-sm text-weight-bold">
                <div class="col-8">
                  Total
                </div>
                <div class="col-4  text-right">
                  {{ formatDouble(row.apotekrajalpolilalu.map(apt=>apt.subtotal).reduce((a,b)=>a+b,0)) }}
                </div>
              </div>
            </div>
            <div v-if="!row.apotekrajalpolilalu.length">
              -
            </div>
          </template>
          <template #cell-laborat="{row}">
            <div v-if="row.laborat.length">
              <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                <div class="col-8">
                  Nama
                </div>
                <div class="col-4">
                  Jumlah
                </div>
              </div>
              <div
                v-for="(item,i) in row.laborat"
                :key="i"
                class="anu row items-center q-mb-xs q-col-gutter-sm"
              >
                <div class="col-8 wrap_it">
                  {{ item.pemeriksaanlab.rs2 }}
                </div>
                <div class="col-4 text-right">
                  {{ formatDouble(item.subtotal) }}
                </div>
              </div>
              <div class="anu row items-center q-col-gutter-sm text-weight-bold">
                <div class="col-8">
                  Total
                </div>
                <div class="col-4  text-right">
                  {{ formatDouble(row.laborat.map(apt=>apt.subtotal).reduce((a,b)=>a+b,0)) }}
                </div>
              </div>
            </div>
            <div v-if="!row.laborat.length">
              -
            </div>
          </template>
          <template #cell-radiologi="{row}">
            <div v-if="row.radiologi">
              <div v-if="row.radiologi.length">
                <div class="anu row items-center q-mb-xs q-col-gutter-sm text-weight-bold">
                  <div class="col-8">
                    Nama
                  </div>
                  <div class="col-4">
                    subtotal
                  </div>
                </div>
                <div
                  v-for="(item,i) in row.radiologi"
                  :key="i"
                  class="anu row items-center q-mb-xs q-col-gutter-sm"
                >
                  <div class="col-8 wrap_it">
                    {{ item.radiologi?item.radiologi.rs2:'-' }}
                  </div>
                  <div class="col-4 text-right">
                    {{ formatDouble(item.subtotal) }}
                  </div>
                </div>
                <div class="anu row items-center q-col-gutter-sm text-weight-bold">
                  <div class="col-8">
                    Total
                  </div>
                  <div class="col-4  text-right">
                    {{ formatDouble(row.radiologi.map(apt=>apt.subtotal).reduce((a,b)=>a+b,0)) }}
                  </div>
                </div>
              </div>
              <div v-if="!row.radiologi.length">
                -
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
// import { date } from 'quasar'
import { dateFullFormat, formatDouble } from 'src/modules/formatter'
import { useSimrsLaporanKeuanganBillRajalStore } from 'src/stores/simrs/laporan/keuangan/billrajal/billrajal'
import { ref } from 'vue'

import CustomTable from '../../rekap/CustomTable.vue'

const store = useSimrsLaporanKeuanganBillRajalStore()

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
