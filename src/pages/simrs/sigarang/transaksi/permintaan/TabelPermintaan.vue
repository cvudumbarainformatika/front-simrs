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
                <div class="bold text-left">
                  <strong>No</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Kode Barang</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Nama Barang</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Satuan</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Stok User</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Stok Alokasi</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Maks Stok</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Jumlah Minta</strong>
                </div>
              </th>
              <th>
                <div class="bold text-left">
                  <strong>Gudang</strong>
                </div>
              </th>
              <!-- <th>
                <div class="bold text-left">
                  <strong>Ruang</strong>
                </div>
              </th> -->
              <th>
                <div class="bold text-left">
                  <strong>Alasan PNM</strong>
                </div>
              </th>
            </tr>
            <tr>
              <td>
                <div class="bold text-left" />
              </td>
              <td>
                <div class="bold text-left">
                  {{ table.form.kode_rs }}
                </div>
              </td>
              <td>
                <div class="bold text-left">
                  <app-autocomplete-new
                    :model="table.form.kode_rs"
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
                <div class="bold text-left">
                  {{ table.nama.satuan }}
                </div>
              </td>
              <td>
                <div class="bold text-left">
                  Stok User
                </div>
              </td>
              <td>
                <div class="bold text-left">
                  Stok Alokasi
                </div>
              </td>
              <td>
                <div class="bold text-left">
                  maks stok
                </div>
              </td>
              <td>
                <div class="bold text-left">
                  <app-input
                    v-model="table.form.jumlah"
                    outlined
                    label="Jumlah Minta"
                  />
                </div>
              </td>
              <td>
                <div class="bold text-left">
                  {{ table.nama.gudang }}
                  <!-- <app-autocomplete-new
                    :model="table.form.dari"
                    outlined
                    label="Gudang"
                    autocomplete="nama"
                    option-value="kode"
                    option-label="nama"
                    :source="table.depos"
                    @on-select="depoSelected"
                    @clear="cleardepo"
                    @set-model="depoSet"
                  /> -->
                </div>
              </td>

              <!-- <td>
                <div class="bold text-left">
                  {{ table.nama.ruang }}
                  <q-input
                    v-model="table.form.alasan"
                    dense
                    borderless
                    filled
                    autogrow
                  />
                </div>
              </td>-->
              <td>
                <div class="bold text-left">
                  <q-input
                    v-model="table.form.alasan"
                    dense
                    borderless
                    filled
                    autogrow
                  />
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

const barangSelected = val => {
  table.setForm('kode_rs', val)

  const apem = mapingbarang.barangrses.filter(data => { return data.kode === val })

  table.setForm('kode_satuan', apem[0].kode_satuan)
  const satuan = apem.length ? mapingbarang.satuans.filter(data => { return data.kode === apem[0].kode_satuan }) : null
  if (satuan.length) {
    table.setNama('satuan', satuan[0].nama)
  }

  const depo = table.mapingDepos.filter(data => { return data.kode_rs === val })
  console.log('depo', depo)
  if (depo.length) {
    table.setForm('kode_gudang', depo[0].kode_gudang)
    table.setNama('gudang', depo[0].gudang.nama)
  } else {
    table.setForm('kode_gudang', null)
    table.setNama('gudang', 'gudang tidak ditemukan')
  }

  console.log('epem', apem)
  console.log('epem', mapingbarang.satuans[0])
}
const clearBarangRs = () => {
  table.setForm('kode_rs', null)
  table.setNama('satuan', 'barang belum dipilih')
  table.setNama('gudang', 'barang belum dipilih')
}
const modelSet = val => {
  console.log(val)
}
// const depoSelected = val => {
//   table.setForm('dari', val)
// }
// const cleardepo = () => {
//   table.setForm('dari', null)
// }
// const depoSet = val => {
//   console.log(val)
// }
// const ruangSelected = val => {
//   table.setForm('tujuan', val)
// }
// const clearRuang = () => {
//   table.setForm('tujuan', null)
// }
</script>
