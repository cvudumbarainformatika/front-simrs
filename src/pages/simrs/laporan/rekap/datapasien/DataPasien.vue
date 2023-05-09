<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="row fit justify-center items-center text-weight-bold f-18">
          REKAP DATA PASIEN DI RR
        </div>
      </q-card-section>
      <q-card-section>
        <app-table
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
          :enable-head="false"
          :ada-tambah="false"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @set-order="store.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="store.deletesData"
        >
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
              <!-- pake from to app date human -->
              <!-- <app-autocomplete-new
                :model="store.params.bulan"
                label="pilih bulan"
                autocomplete="nama"
                option-label="nama"
                option-value="mo"
                outlined
                :source="store.bulans"
                @on-select="store.bulanSelected"
              /> -->
            </div>
          </template>
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
        </app-table>
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
const store = useSimrsLaporanRekapDataPasienStore()

function setFrom(val) {
  store.params.from = date.formatDate(val, 'YYYY-MM-DD')
  store.getDataTable()
}
function setFromDisp(val) {
  store.tanggal.from = val
  console.log('params ', store.params)
  console.log('tanggal', store.tanggal)
}
function setTo(val) {
  store.params.to = date.formatDate(val, 'YYYY-MM-DD')
  store.getDataTable()
}
function setToDisp(val) {
  store.tanggal.to = val
  console.log('params ', store.params)
  console.log('tanggal', store.tanggal)
}

store.getInitialData()
</script>
