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
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          :ada-cari="false"
          :ada-delete="false"
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
          <template #header-left-after-search>
            <div class="row">
              pake from to app date human
              <app-autocomplete-new
                :model="store.params.bulan"
                label="pilih bulan"
                autocomplete="nama"
                option-label="nama"
                option-value="mo"
                outlined
                :source="store.bulans"
                @on-select="store.bulanSelected"
              />
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
                LAMA (MENIT)
              </div>
            </th>
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
import { useSimrsLaporanRekapDataPasienStore } from 'src/stores/simrs/laporan/rekap/datapasien/datapasien.js'
const store = useSimrsLaporanRekapDataPasienStore()
</script>
