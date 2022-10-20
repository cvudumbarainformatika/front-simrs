<template>
  <div class="q-pt-sm q-pb-lg-xl">
    <app-card :is-header="false">
      <template #content>
        <app-table-input
          title="Input Permintaan"
          :columns="table.columns"
          :column-hide="table.columnHide"
          :items="table.items"
          :meta="table.meta"
          :per-page="table.params.per_page"
          :order-by="table.params.order_by"
          ada-input
          :input-col="10"
          :sort="table.params.sort"
          :loading="table.loading"
          :to-search="table.params.q"
          :add-input="store.isOpen"
          @goto="table.setPage"
          @set-row="table.setPerPage"
          @refresh="table.refreshTable"
          @find="table.setSearch"
          @set-order="table.setOder"
          @new-data="store.newData"
          @edit-data="store.editData"
          @delete="table.deletesData"
        >
          <template #top-row>
            <tr>
              <th>
                <div class="bold">
                  <strong>No</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Kode Barang</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Nama Barang</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Satuan</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Stok User</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Stok Alokasi</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Maks Stok</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Jumlah Minta</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Gudang</strong>
                </div>
              </th>
              <th>
                <div class="bold">
                  <strong>Alasan PNM</strong>
                </div>
              </th>
            </tr>
          </template>
        </app-table-input>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'

const table = useTransaksiPermintaanTable()
const store = useTransaksiPermintaanForm()
</script>
