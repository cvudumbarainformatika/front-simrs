<template>
  <q-page padding>
    <q-card :key="store.items">
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
            <div class="row justify-center f-12 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center f-20 text-weight-bold">
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
          REKAP DATA PASIEN DI RR TAHUN {{ date.formatDate(store.params.to,'YYYY') }}
        </div>
      </q-card-section>
      <q-card-section>
        <CustomTable
          id="printMe"
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
                <div class="row justify-center f-12 text-weight-bold">
                  DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
                </div>
                <div class="row justify-center f-20 text-weight-bold">
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
                  style="height: 3cm; max-width: 3cm"
                />
              </div>
            </div>

            <div class="row justify-center f-18 text-weight-bold q-my-sm">
              REKAP DATA PASIEN DI RR TAHUN {{ date.formatDate(store.params.to,'YYYY') }}
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
                  @set-model="setFrom"
                  @set-display="setFromDisp"
                />
              </div>
              <div>
                <app-input-date-human
                  :model="store.tanggal.to"
                  label="sampai tanggal"
                  outlined
                  :loading="store.loading"
                  @set-model="setTo"
                  @set-display="setToDisp"
                />
              </div>
            </div>
          </template>
          <!-- pengganti header karena header di disable -->
          <template #top-row>
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
            <th colspan="2">
              <div class="row justify-center items-center text-weight-bold q-mb-sm">
                RENCANA ANASTESI
              </div>
              <div class="row items-center text-weight-bold">
                <div class="col-6">
                  GENERAL
                </div>
                <div class="col-6">
                  REGIONAL
                </div>
              </div>
            </th>
            <th colspan="2">
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
          </template>
          <template #cell-tanggal="{row}">
            {{ dateFullFormat(row.rs3) }}
          </template>
          <template #cell-pasien="{row}">
            {{ row.pasien_kunjungan_poli?row.pasien_kunjungan_poli.nama:row.pasien_kunjungan_rawat_inap.nama }}
          </template>
          <template #cell-masuk="{row}">
            {{ row.rs11?row.rs11:'-' }}
          </template>
          <template #cell-keluar="{row}">
            {{ row.rs12?row.rs12:'-' }}
          </template>
          <template #cell-lama="{row}">
            {{ timeDiff(row.rs11,row.rs12) }}
          </template>
          <template #cell-regional="{row}">
            <div
              v-if="row.rs4==='Regional'"
              class="text-center"
            >
              <q-avatar size="12px">
                <img src="~assets/images/check.png">
              </q-avatar>
            </div>
          </template>
          <template #cell-general="{row}">
            <div
              v-if="row.rs4!=='Regional'"
              class="text-center"
            >
              <q-avatar size="12px">
                <img src="~assets/images/check.png">
              </q-avatar>
            </div>
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
import { dateFullFormat, timeDiff } from 'src/modules/formatter'
import { useSimrsLaporanRekapDataPasienStore } from 'src/stores/simrs/laporan/rekap/datapasien/datapasien.js'
import { ref } from 'vue'

import CustomTable from '../CustomTable.vue'

const store = useSimrsLaporanRekapDataPasienStore()

function setFrom (val) {
  store.params.from = date.formatDate(val, 'YYYY-MM-DD')
  store.getDataTable()
}
function setFromDisp (val) {
  store.tanggal.from = val
  console.log('params ', store.params)
  console.log('tanggal', store.tanggal)
}
function setTo (val) {
  store.params.to = date.formatDate(val, 'YYYY-MM-DD')
  store.getDataTable()
}
function setToDisp (val) {
  store.tanggal.to = val
  console.log('params ', store.params)
  console.log('tanggal', store.tanggal)
}

const printed = ref(false)
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Rekap',
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback (vue) {
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
</style>
