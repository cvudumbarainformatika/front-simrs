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
            <tr>
              <td>
                <div class="bold" />
              </td>
              <td>
                <div class="bold">
                  Kode barang
                </div>
              </td>
              <td>
                <div class="bold">
                  <app-autocomplete-new
                    :model="table.form.kode_rs"
                    :valid="kodeRs"
                    outlined
                    label="Nama Barang RS"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    :source="mapingbarang.barangrses"
                    @on-select="barangSelected"
                    @clear="clearBarangRs"
                    @set-model="modelSet"
                  />
                </div>
              </td>
              <td>
                <div class="bold">
                  satuan
                </div>
              </td>
              <td>
                <div class="bold">
                  Stok User
                </div>
              </td>
              <td>
                <div class="bold">
                  Stok Alokasi
                </div>
              </td>
              <td>
                <div class="bold">
                  maks stok
                </div>
              </td>
              <td>
                <div class="bold">
                  jumlah minta
                </div>
              </td>
              <td>
                <div class="bold">
                  Gudang
                </div>
              </td>

              <td>
                <div class="bold">
                  Alasan PNM
                </div>
              </td>
            </tr>
          </template>
        </app-table-input>
      </template>
    </app-card>
  </div>
</template>
<script setup>
import { useMasterMapingBarangForm } from 'src/stores/simrs/logistik/sigarang/master/mapingbarang/form'
import { useTransaksiPermintaanForm } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/form'
import { useTransaksiPermintaanTable } from 'src/stores/simrs/logistik/sigarang/transaksi/permintaan/permintaan'

const table = useTransaksiPermintaanTable()
const store = useTransaksiPermintaanForm()

const mapingbarang = useMasterMapingBarangForm()

const barangSelected = val => {}
const clearBarangRs = () => {}
const modelSet = val => {
  console.log(val)
}
</script>
