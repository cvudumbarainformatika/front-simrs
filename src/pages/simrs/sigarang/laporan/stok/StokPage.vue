<template>
  <div :key="store.items">
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
            <div class="text-right">
              <q-btn
                v-print="printObj"
                unelevated
                color="dark"
                round
                size="sm"
                icon="icon-mat-print"
              >
                <q-tooltip
                  class="primary"
                  :offset="[10, 10]"
                >
                  Print
                </q-tooltip>
              </q-btn>
            </div>
          </div>
        </div>

        <q-separator />
        <div class="q-mt-sm">
          <!-- table -->
          <div id="printMe">
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
              row-no
              @goto="store.setPage"
              @set-row="store.setPerPage"
              @refresh="store.refreshTable"
              @find="store.setSearch"
              @set-order="store.setOder"
              @new-data="store.newData"
              @edit-data="store.editData"
              @delete="store.deletesData"
            >
              <!-- header pRint -->
              <template #header-for-print>
                <div class="row justify-center f-16 text-weight-bold">
                  Data Stok Per {{ date.formatDate(Date.now(),'DD MMMM YYYY') }}
                </div>
                <div class="row justify-center f-16 text-weight-bold">
                  {{ namaTempat }}
                </div>
                <div class="row justify-center f-16 text-weight-bold">
                  UOBK RSUD DR. MOHAMAD SALEH KOTA PROBOLINGGO
                </div>
              </template>
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
                {{ row.barang?row.barang.nama:'master barang tidak ditemukan' }}
              </template>
              <template #cell-tempat="{row}">
                {{ (row.depo?row.depo.nama:row.ruang?row.ruang.uraian:'-') }}
              </template>
              <template #cell-kode_108="{row}">
                {{ row.barang?(row.barang.kode_108):'master barang tidak ditemukan' }}
              </template>
              <template #cell-uraian="{row}">
                {{ row.barang?(row.barang.uraian_108):'master barang tidak ditemukan' }}
              </template>
              <template #cell-satuan="{row}">
                {{ row.barang?(row.barang.satuan?row.barang.satuan.nama:'belum ada satuan'):'master barang tidak ditemukan' }}
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
            <!--
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
              -->
            </app-table>
            <div class="q-my-md">
              <div class="row q-mb-md">
                <div class="col-4" />
                <div class="col-4" />
                <div class="col-4">
                  <div class="text-center">
                    {{ pojokKananAtas }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="text-center">
                    {{ kiriAtasSatu }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ tengahAtasSatu }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ kananAtasSatu }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="text-center">
                    {{ kiriAtasDua }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ tengahAtasDua }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ kananAtasDua }}
                  </div>
                </div>
              </div>
              <div class="row q-mt-xl text-weight-bold">
                <div class="col-4">
                  <div class="text-center">
                    {{ kiriBawahSatu }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ tengahBawahSatu }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ kananBawahSatu }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="text-center">
                    {{ kiriBawahDua }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ tengahBawahDua }}
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    {{ kananBawahDua }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="q-my-md">
              <div class="row ">
                <div class="col-4" />
                <div class="col-4" />
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="pojokKananAtas"
                      label="tanggal"
                      valid
                      outlined
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kiriAtasSatu"
                      label="kiri atas satu"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="tengahAtasSatu"
                      label="tengah atas satu"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kananAtasSatu"
                      label="kanan atas satu"
                      valid
                      outlined
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kiriAtasDua"
                      label="kiri atas dua"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="tengahAtasDua"
                      label="tengah atas dua"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kananAtasDua"
                      label="kanan atas dua"
                      valid
                      outlined
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kiriBawahSatu"
                      label="kiri bawah satu"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="tengahBawahSatu"
                      label="tengah bawah satu"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kananBawahSatu"
                      label="kanan bawah satu"
                      valid
                      outlined
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kiriBawahDua"
                      label="kiri bawah dua"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="tengahBawahDua"
                      label="tengah bawah dua"
                      valid
                      outlined
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="text-center">
                    <app-input
                      v-model="kananBawahDua"
                      label="kanan bawah dua"
                      valid
                      outlined
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-separator />
      </q-card-section>
    </q-card>
    <!-- <KartuStok v-model="store.isOpen" /> -->
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
// import KartuStok from './KartuStok.vue'

const tanggalStokOpname = ref(date.formatDate(Date.now(), 'DD MMMM YYYY'))
const store = useStokStore()
store.getInitialData()
// text tanda tangan start

const kiriAtasSatu = ref('Mengetahui')
const kiriAtasDua = ref('Kepala Bagian Umum')
const kiriBawahSatu = ref('Jumadi, S.Sos, MM')
const kiriBawahDua = ref('NIP . 19691223 199302 1 002')

const tengahAtasSatu = ref('')
const tengahAtasDua = ref('Pejabat Teknik Kegiatan')
const tengahBawahSatu = ref('Yuliana, S.A.P')
const tengahBawahDua = ref('NIP. 19740304 200801 2 005')

const kananAtasSatu = ref('')
const kananAtasDua = ref('Petugas Bagian Barang')
const kananBawahSatu = ref('SARWANI')
const kananBawahDua = ref('NIP. 19760311 200801 1 008')

const pojokKananAtas = ref('Probolinggo, ' + date.formatDate(Date.now(), 'DD MMMM YYYY'))

// text tanda tangan end
const namaTempat = ref('semua')
const gudangSelected = (val) => {
  // console.log('gudang', val)
  store.kode_tempat = val
  if (val === null || val === 'semua') {
    namaTempat.value = 'Semua'
    store.params.search = ''
    store.params.page = 1
    store.getDataTable()
  } else {
    const anu = store.gudangDepo.filter(a => a.kode === val)
    if (anu.length) {
      namaTempat.value = anu[0].nama
    }
    store.params.search = val
    store.params.page = 1
    store.getDataByDepo()
  }
}
const gudangCleared = () => {
  namaTempat.value = 'Semua'
  store.kode_tempat = 'semua'
  store.params.search = ''
  store.getDataTable()
}
// const kartuStok = val => {
//   const skr = Date.now()
//   store.setParamsDetails('from', date.formatDate(skr, 'YYYY-MM-') + '01')
//   store.setParamsDetails('to', date.formatDate(skr, 'YYYY-MM-DD'))

//   store.setOpen()
//   store.setParamsDetails('kode_rs', val.kode_rs)
//   store.setParamsDetails('kode_ruang', val.kode_ruang)
//   // const anu = Object.keys(val)
//   // if (anu.length) {
//   //   anu.forEach(y => {
//   //     if (val[y] !== null || val[y] !== '') {
//   //     }
//   //   })
//   // }
//   // console.log('anu', anu)
//   store.getDataByBarang()
// }
// const searchEnter = () => {
//   console.log(store.params.search)
// }

// print
const openPrint = ref(false)
// let title = ''
const printed = ref(false)
const item = ref({})
// function toPrint (val) {
//   // console.log('print', val)
//   item.value = val
//   // title = 'Print ' + val.nama
//   openPrint.value = true
// }
const printObj = {
  id: 'printMe',
  // popTitle: title,
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
  beforeOpenCallback (vue) {
    printed.value = true
    console.log('wait...', vue)
  },
  openCallback (vue) {
    console.log('opened', vue)
  },
  closeCallback (vue) {
    openPrint.value = false
    printed.value = false
    // changePeriode()
    item.value = {}
    console.log('closePrint')
  }
}
</script>
