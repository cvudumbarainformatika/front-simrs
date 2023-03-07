<template>
  <div class="q-mt-sm">
    <q-card>
      <q-card-section>
        <div class="f-12 text-weight-bold">
          Daftar Barang Depo Gizi
        </div>
        <div class="f-10">
          Daftar Barang yang bisa di distribusikan langsung
        </div>
      </q-card-section>
      <q-card-section>
        <app-table
          title="Data stok Barang Rumah sakit"
          :columns="store.columns"
          :column-hide="store.columnHide"
          :items="store.items"
          :meta="store.meta"
          :per-page="store.params.per_page"
          :order-by="store.params.order_by"
          :sort="store.params.sort"
          :loading="store.loading"
          :to-search="store.params.q"
          row-no
          :ada-tambah="false"
          :ada-edit="false"
          :ada-delete="false"
          :click-able="true"
          @goto="store.setPage"
          @set-row="store.setPerPage"
          @refresh="store.refreshTable"
          @find="store.setSearch"
          @delete="store.deletesData"
        >
          <template #col-sisa_stok>
            <div>Sisa stok</div>
          </template>
          <template #col-kode>
            <div>Kode Barang</div>
          </template>
          <template #col-nama>
            <div>Nama Barang</div>
          </template>
        </app-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useTransaksiDistribusiLangsung } from 'src/stores/simrs/logistik/sigarang/transaksi/distribusilangsung/distribusilangsung'

const store = useTransaksiDistribusiLangsung()
</script>
