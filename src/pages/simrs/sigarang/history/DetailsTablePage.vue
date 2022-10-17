<template>
  <q-dialog
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-bar>
        <q-space />
        <q-btn
          v-close-popup
          dense
          flat
          icon="icon-mat-close"
        >
          <q-tooltip class="bg-white text-primary">
            Close
          </q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <div class="row">
              <div class="col-4">
                Nomor Pemesanan
              </div>
              <div class="col-6">
                {{ table.header.nomor }}
              </div>
            </div>
            <div
              v-if="table.header.no_penerimaan"
              class="row"
            >
              <div class="col-4">
                Nomor Penerimaan
              </div>
              <div class="col-6">
                {{ table.header.no_penerimaan }}
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Tanggal
              </div>
              <div class="col-6">
                {{ dateFullFormat(table.header.tanggal) }}
              </div>
            </div>
          </div>
          <div class="col-6">
            <div
              v-if="table.header.kontrak"
              class="row"
            >
              <div class="col-4">
                Nomor Kontrak
              </div>
              <div class="col-6">
                {{ table.header.kontrak }}
              </div>
            </div>
            <div
              v-if="table.header.perusahaan"
              class="row"
            >
              <div class="col-4">
                Nama Perusahaan
              </div>
              <div class="col-6">
                {{ table.header.perusahaan.nama }}
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                Total
              </div>
              <div class="col-6">
                {{ formatRp(table.header.total) }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <app-card :is-header="false">
          <template #content>
            <app-table-view
              :title="`Detail Data ${titleCase(table.header.nama)}`"
              :columns="table.columns"
              :column-hide="table.columnHide"
              :items="table.items"
              :loading="table.loading"
              :to-search="table.params.q"
              :paginasi="false"
              :ada-cari="false"
              :ada-refresh="false"
              :ada-filter="false"
              @goto="table.setPage"
              @set-row="table.setPerPage"
              @refresh="table.refreshTable"
              @find="table.setSearch"
              @set-order="table.setOder"
              @delete="table.deletesData"
              @detail="table.setDetails"
            >
              <template #col-sub_total>
                Sub Total
              </template>
              <template #col-kode_108>
                Kode 108
              </template>
              <template #col-kode_rs>
                Kode Rs
              </template>
              <template #col-barangrs>
                Barang RS
              </template>
              <template #col-barang108>
                Barang 108
              </template>
              <template #col-qty>
                Jumlah
              </template>
              <template #col-satuan>
                Satuan
              </template>
              <template #col-harga>
                Harga
              </template>
              <template #cell-harga="{row}">
                {{ formatRp(row.harga) }}
              </template>
              <template #cell-sub_total="{row}">
                {{ formatRp(row.sub_total) }}
              </template>
              <template #cell-barang108="{row}">
                {{ row.barang108.uraian }}
              </template>
              <template #cell-satuan="{row}">
                {{ row.satuan.nama }}
              </template>
              <template #cell-barangrs="{row}">
                {{ row.barangrs.nama }}
              </template>
            </app-table-view>
            <!--
                    row-image="image"
                    @delete-ids="table.deletesData"
                    -->
          </template>
        </app-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { dateFullFormat, formatRp, titleCase } from 'src/modules/formatter'
import { useDetailHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/details'

const table = useDetailHistoryTable()
</script>
