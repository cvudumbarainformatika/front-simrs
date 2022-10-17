<template>
  <q-page class="q-pa-sm">
    <div>
      <app-card :is-header="false">
        <template #content>
          <app-table-view
            :title="`Data ${table.nama}`"
            :columns="table.columns"
            :column-hide="table.columnHide"
            :items="table.items"
            :meta="table.meta"
            :per-page="table.params.per_page"
            :order-by="table.params.order_by"
            :sort="table.params.sort"
            :loading="table.loading"
            :to-search="table.params.q"
            ada-detail
            @goto="table.setPage"
            @set-row="table.setPerPage"
            @refresh="table.refreshTable"
            @find="table.setSearch"
            @set-order="table.setOder"
            @delete="table.deletesData"
            @detail="table.setDetails"
          >
            <template #cell-total="{row}">
              {{ formatRp(row.total) }}
            </template>
            <template #cell-perusahaan="{row}">
              {{ row.perusahaan.nama }}
            </template>
            <template #cell-tanggal="{row}">
              {{ dateFullFormat(row.tanggal) }}
            </template>
            <template #cell-tanggal_surat="{row}">
              {{ dateFullFormat(row.tanggal_surat) }}
            </template>
            <template #cell-asal="{row}">
              {{ row.asal.nama }}
            </template>
            <template #cell-tujuan="{row}">
              {{ row.tujuan.nama }}
            </template>
            <template #cell-status="{row}">
              <!-- {{row.status}} -->
              <q-chip
                class="f-12"
                :color="color(row.status)"
                text-color="white"
                :label="label(row.status,row.nama)"
              />
            </template>
            <template #col-total>
              Total
            </template>
            <template #col-perusahaan>
              Perusahaan
            </template>
            <template #col-tanggal>
              Tanggal
            </template>
            <template #col-tanggal_surat>
              Tanggal Surat / Faktur
            </template>
            <template #col-kontrak>
              Nomor Kontrak
            </template>
            <template #col-nomor>
              Nomor Pemesanan
            </template>
            <template #col-faktur>
              Faktur
            </template>
            <template #col-surat_jalan>
              Surat Jalan
            </template>
            <template #col-status_pembelian>
              Status Pembelian
            </template>
            <template #col-no_penerimaan>
              Nomor Penerimaan
            </template>
            <template #col-pengirim>
              Pengirim
            </template>
            <template #col-tempo>
              Tempo
            </template>
            <template #col-asal>
              Asal Gudang
            </template>
            <template #col-tujuan>
              Gudang Tujuan
            </template>
            <template #col-status>
              Status
            </template>
          </app-table-view>
          <!--
            row-image="image"
            @delete-ids="table.deletesData"
            -->
        </template>
      </app-card>
    </div>
    <DetailsTablePage v-model="detail.isOpen" />
  </q-page>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useDetailHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/details'
import { useHistoryTable } from 'src/stores/simrs/logistik/sigarang/history/table'
import DetailsTablePage from './DetailsTablePage.vue'
const table = useHistoryTable()
const detail = useDetailHistoryTable()
const color = val => {
  switch (val) {
    case 1:
      return 'blue'
      // eslint-disable-next-line no-unreachable
      break
    case 2:
      return 'green'
      // eslint-disable-next-line no-unreachable
      break
    case 3:
      return 'orange'
      // eslint-disable-next-line no-unreachable
      break
    case 4:
      return 'grey'
      // eslint-disable-next-line no-unreachable
      break

    default:
      return 'red'
      // eslint-disable-next-line no-unreachable
      break
  }
}

const label = (status, nama) => {
  if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Selesai'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  } else { // if (nama === 'PEMESANAN') {
    switch (status) {
      case 1:
        return 'Draft'
        // eslint-disable-next-line no-unreachable
        break
      case 2:
        return 'Selesai'
        // eslint-disable-next-line no-unreachable
        break
      case 3:
        return 'Diterima Sebagian'
        // eslint-disable-next-line no-unreachable
        break
      case 4:
        return 'Diterima Seluruhnya'
        // eslint-disable-next-line no-unreachable
        break

      default:
        return 'Belum di definisikan'
        // eslint-disable-next-line no-unreachable
        break
    }
  }
}
// table.getDataTable()
</script>
