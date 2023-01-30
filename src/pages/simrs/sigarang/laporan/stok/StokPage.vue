<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="f-14 text-weight-bold">
          Stok
        </div>
        <div class="title-desc">
          Halaman Stok Barang Penunjang Non Medik
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <!-- tanggal -->
        <div class="fit row no-wrap q-col-gutter-sm justify-between items-start">
          <div class="col-6">
            <div class="fit row no-wrap justify-between items-center">
              <div class="col-4">
                Tanggal Stok
              </div>
              <div class="col-8">
                {{ tanggalStokOpname }}
              </div>
            </div>
            <!-- gudang -->
            <div class="fit row no-wrap justify-between items-center q-mb-sm">
              <div class="col-4">
                Depo / Ruang
              </div>
              <div class="col-8">
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
          </div>
          <div class="col-6">
            <!-- <div class="row">
              stok per ruangan
            </div>
            <div class="row">
              total stok barang
            </div> -->
          </div>
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
            :default-btn="false"

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
              <div>Stok</div>
            </template>
            <template #col-totalStok>
              <div>Stok</div>
            </template>
            <template #col-satuan>
              <div>Satuan</div>
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
              {{ (row.depo?row.depo.nama:row.ruang?row.ruang.uraian:'-') }}
            </template>
            <template #cell-kode_108="{row}">
              {{ (row.barang.kode_108) }}
            </template>
            <template #cell-uraian="{row}">
              {{ (row.barang.barang108.uraian) }}
            </template>
            <template #cell-satuan="{row}">
              {{ (row.barang.satuan.nama) }}
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
            <!-- Custom BTN -->
            <template #custom-btn="{row}">
              <q-btn
                flat
                class=""
                size="sm"
                round
                color="grey"
                icon="icon-mat-visibility"
                @click="kartuStok(row)"
              >
                <q-tooltip
                  anchor="top middle"
                  self="center middle"
                >
                  Lihat kartu stok
                </q-tooltip>
              </q-btn>
            </template>
          </app-table>
        </div>
        <q-separator />
      </q-card-section>
    </q-card>
    <KartuStok v-model="store.isOpen" />
  </div>
</template>
<script setup>
// dibuat tabel
// tombol stok opname
// pilih bulan
import { date } from 'quasar'
import { ref } from 'vue'
import { useStokStore } from 'stores/simrs/logistik/sigarang/laporan/stok/stok'
import { dateFullFormat } from 'src/modules/formatter'
import KartuStok from './KartuStok.vue'

const tanggalStokOpname = ref(date.formatDate(Date.now(), 'DD MMMM YYYY'))
const store = useStokStore()
store.getInitialData()

const gudangSelected = (val) => {
  console.log('gudang', val)
  store.kode_tempat = val
  if (val === null || val === 'semua') {
    store.params.search = ''
    store.params.page = 1
    store.getDataTable()
  } else {
    store.params.search = val
    store.params.page = 1
    store.getDataByDepo()
  }
}
const gudangCleared = () => {
  store.kode_tempat = 'semua'
  store.params.search = ''
  store.getDataTable()
}
const kartuStok = val => {
  store.setOpen()
  console.log(val)
}
// const searchEnter = () => {
//   console.log(store.params.search)
// }
</script>
