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
        <div class="row q-col-gutter-sm items-start">
          <div class="col-6">
            <div class="fit row no-wrap justify-between items-center q-my-sm">
              <div class="col-3">
                Tanggal Stok Opname
              </div>
              <div class="col-9">
                <!-- <app-input-date
                  v-model="tanggalStokOpname"
                  label="Tanggal Stok opname"
                  outlined
                /> -->
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
                  outlined
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
            <div class="fit row no-wrap justify-start items-center q-col-gutter-sm">
              <div class="col-3">
                Periode
              </div>
              <div class="col-3">
                <app-autocomplete-new
                  v-model="store.params.bulan"
                  label="Pilih Bulan"
                  autocomplete="nama"
                  option-label="nama"
                  option-value="value"
                  outlined
                  :source="store.months"
                  @on-select="bulanSelected"
                />
              </div>
              <div class="col-3">
                <app-autocomplete
                  v-model="store.params.tahun"
                  label="Pilih Tahun"
                  outlined
                  :source="years"
                  @selected="tahunSelected"
                />
              </div>
            </div>
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
import { useStokOpnameStore } from 'stores/simrs/logistik/sigarang/laporan/stok/stokOpname'
import { dateFullFormat } from 'src/modules/formatter'
import formDialog from './FormDialog.vue'
import { daysInMonth } from 'src/modules/utils'

const store = useStokOpnameStore()
const tanggalStokOpname = ref('')
const dayInMonth = ref(0)
const setDate = () => {
  // const tempDate = Date.now()
  const sekarang = new Date()
  sekarang.setMonth(parseInt(store.params.bulan) - 1)
  sekarang.setFullYear(parseInt(store.params.tahun))
  dayInMonth.value = daysInMonth(parseInt(store.params.bulan), parseInt(store.params.tahun))
  sekarang.setDate(dayInMonth.value)
  sekarang.setHours(23)
  sekarang.setMinutes(59)
  sekarang.setSeconds(59)
  tanggalStokOpname.value = date.formatDate(sekarang, 'DD MMMM YYYY HH:mm:ss')
  store.setParams('lastDay', dayInMonth.value)
  console.log('params', store.params)
  console.log('tanggal', date.formatDate(sekarang, 'DD MMMM YYYY HH:mm:ss'))
  console.log('bulan selected', parseInt(store.params.bulan))
  console.log('bulan selected day', daysInMonth(parseInt(store.params.bulan), parseInt(store.params.tahun)))
  console.log('sekarang', sekarang)
}
store.getInitialData()
setDate()
const bulanSelected = (val) => {
  store.setParams('bulan', val)
  store.setParams('page', 1)
  setDate()
  store.getDataTable()
}
const tahunSelected = val => {
  console.log('tahun', val)
  store.setParams('page', 1)
  store.setParams('tahun', val)
  setDate()
  store.getDataTable()
}
const gudangSelected = (val) => {
  console.log('gudang', val)
  store.kode_tempat = val
  store.setParams('search', val)
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

// pilih range bulan dan tahun
// const months = ref()
const curY = parseInt(store.params.tahun)
const years = ref([])
for (let index = 0; index < 11; index++) {
  years.value[index] = curY - 5 + index
}

// const monthSelected = ref(null)
// const yearSelected = ref(null)

// const searchEnter = () => {
//   console.log(store.params.search)
// }
</script>
