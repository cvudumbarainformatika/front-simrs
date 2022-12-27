<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Stok Opname
        </div>
        <div class="title-desc">
          Halaman Stok Opname Barang Penunjang Non Medik
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- tanggal -->
        <div class="fit row no-wrap justify-between items-center">
          <div class="col-3">
            Tanggal Stok Opname
          </div>
          <div class="col-9">
            {{ tanggalStokOpname }}
          </div>
        </div>
        <!-- gudang -->
        <div class="fit row no-wrap justify-between items-center q-mb-sm">
          <div class="col-3">
            Gudang
          </div>
          <div class="col-9">
            <app-autocomplete-new
              label="pilih "
              :model="store.kode_tempat"
              autocomplete="nama"
              option-label="nama"
              option-value="kode"
              valid
              :loading="store.loading"
              :source="store.gudangDepo"
              @on-select="gudangSelected"
              @clear="gudangCleared"
            />
          </div>
        </div>
        <!-- button stok opname -->
        <div class="fit row no-wrap justify-end items-center q-mb-sm">
          <q-btn
            :label="!store.allItems.length ? 'Mulai Opname':'Sudah ada data'"
            no-caps
            color="primary"
            :disable="!!store.allItems.length || store.loading"
            @click="store.simpanOpname"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
            >
              <div v-if="!store.allItems.length">
                Mulai stok opname
              </div>
              <div v-if="store.allItems.length">
                Sudah dilakukan stok opname di bulan ini
              </div>
            </q-tooltip>
          </q-btn>
        </div>
        <q-separator />
        <div class="q-mt-sm">
          <!-- table -->
          <app-table
            title="Data Distribusi"
            :columns="store.columns"
            :column-hide="store.columnHide"
            :items="store.items"
            :meta="store.meta"
            :per-page="store.params.per_page"
            :order-by="store.params.order_by"
            :sort="store.params.sort"
            :loading="store.loading"
            :to-search="store.params.q"
            :ada-tambah="false"
            :ada-delete="false"
            @goto="store.setPage"
            @set-row="store.setPerPage"
            @refresh="store.refreshTable"
            @find="store.setSearch"
            @set-order="store.setOder"
            @new-data="store.newData"
            @edit-data="store.editData"
            @delete="store.deletesData"
          >
            <!-- kolom -->
            <template #col-tanggal>
              <div>Tanggal</div>
            </template>
            <template #col-kode_rs>
              <div>Kode Barang</div>
            </template>
            <template #col-kode_108>
              <div>Kode 108</div>
            </template>
            <template #col-barang>
              <div>Nama Barang</div>
            </template>
            <template #col-uraian>
              <div>Uraian 108</div>
            </template>
            <template #col-sisa_stok>
              <div>Stok Aplikasi</div>
            </template>
            <template #col-stok_fisik>
              <div>Stok Fisik</div>
            </template>
            <template #col-selisih>
              <div>Selisih</div>
            </template>
            <template #col-tempat>
              <div>Tempat</div>
            </template>

            <!-- cell -->

            <template #cell-tanggal="{row}">
              {{ dateFullFormat(row.tanggal) }}
            </template>
            <template #cell-barang="{row}">
              {{ (row.barang.nama) }}
            </template>
            <template #cell-tempat="{row}">
              {{ (row.depo.nama) }}
            </template>
            <template #cell-kode_108="{row}">
              {{ (row.barang.mapingbarang.kode_108) }}
            </template>
            <template #cell-uraian="{row}">
              {{ (row.barang.mapingbarang.barang108.uraian) }}
            </template>
            <template #cell-stok_fisik="{row}">
              {{ row.penyesuaian?row.penyesuaian.jumlah:row.sisa_stok }}
            </template>
            <template #cell-selisih="{row}">
              {{ row.penyesuaian?row.penyesuaian.selisih:'-' }}
            </template>
            <template #cell-sisa_stok="{row}">
              {{ row.penyesuaian?row.penyesuaian.jumlah:row.sisa_stok }}
            </template>
          </app-table>
        </div>
        <q-separator />
      </q-card-section>
    </q-card>
    <formDialog v-model="store.isOpen" />
  </div>
</template>
<script setup>
// dibuat tabel
// tombol stok opname
// pilih bulan
import { date } from 'quasar'
import { ref } from 'vue'
import { useStokOpnameStore } from 'stores/simrs/logistik/sigarang/transaksi/opname/stokOpname'
import { dateFullFormat } from 'src/modules/formatter'
import formDialog from './FormDialog.vue'

const tanggalStokOpname = ref(date.formatDate(Date.now(), 'DD MMMM YYYY'))
const store = useStokOpnameStore()
store.getInitialData()

const gudangSelected = (val) => {
  console.log('gudang', val)
  store.kode_tempat = val
  if (val !== null) {
    store.params.search = val
    store.getDataByDepo()
  } else {
    store.params.search = ''
    store.getDataTable()
  }
}
const gudangCleared = () => {
  store.kode_tempat = null
  store.params.search = ''
  store.getDataTable()
}
// const searchEnter = () => {
//   console.log(store.params.search)
// }
</script>
