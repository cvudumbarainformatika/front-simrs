<template>
  <div class="row">
    <app-table
      title="obat"
      :columns="table.columns"
      :column-hide="table.columnHide"
      :items="table.items"
      :meta="table.meta"
      :per-page="table.params.per_page"
      :order-by="table.params.order_by"
      :sort="table.params.sort"
      :loading="table?.loading"
      :to-search="table.params.q"
      :default-btn="false"
      :ada-paginasi="false"
      :ada-cari="false"
      :ada-refresh="false"
      :ada-per-page="false"
      :ada-filter="false"
      :ada-tambah="false"
    >
      <template #col-obat>
        <div>Obat</div>
      </template>
      <template #col-stok>
        <div>Stok</div>
      </template>
      <template #col-stokalokasi>
        <div>Stok Alokasi</div>
      </template>
      <template #col-lain>
        <div>Stok Alokasi Gudang / Depo Lain</div>
      </template>
      <template #col-peny>
        <div>Cek Stok</div>
      </template>

      <template #cell-obat="{row}">
        <div class="row no-wrap text-weight-bold text-green">
          {{ row.kd_obat }}
        </div>
        <div class="row text-weight-bold text-amber-10 box text-right no-wrap items-center">
          {{ row.nama_obat }}
        </div>
        <!-- <div class="row text-weight-bold no-wrap text-italic f-10">
          ( {{ row.satuan_k ? row.satuan_k :'-' }} )
        </div> -->
        <div class="row justify-start no-wrap q-my-xs">
          <div
            class="text-weight-bold q-mr-sm text-green"
            v-if="row.status_fornas === '1'"
          >
            Fornas
          </div>
          <div
            class="text-weight-bold q-mr-sm text-green"
            v-if="row.status_forkid === '1'"
          >
            Forkit
          </div>
          <div
            class="text-weight-bold q-mr-sm text-green"
            v-if="row.status_generik === '1'"
          >
            Generik
          </div>
          <div
            class="text-weight-bold q-mr-sm text-negative"
            v-if="row.status_kronis === '1'"
          >
            Kronis
          </div>
          <div
            class="text-weight-bold q-mr-sm text-negative"
            v-if="row.kelompok_psikotropika === '1'"
          >
            Psikotropika
          </div>
          <div
            class="text-weight-bold q-mr-sm text-primary"
            v-if="row.status_konsinyasi === '1'"
          >
            Konsinyasi
          </div>
        </div>
        <div class="row justify-start no-wrap q-my-xs">
          <div
            class="text-weight-bold"
            :class="row.gudang === 'Gd-03010100'?'text-blue':(row.gudang === 'Gd-05010100'?'text-primary':'text-green')"
          >
            {{ row.gudang==='Gd-03010100' ?'Gudang Floor Stok':(row.gudang === 'Gd-05010100'?'Gudang Kamar Obat':'Semua gudang') }}
          </div>
        </div>
        <div class="row justify-start no-wrap q-my-xs">
          <div
            class="text-weight-bold"
            :class="row.sistembayar === 'SEMUA'?'':(row.sistembayar === 'UMUM'?'text-primary':(row.sistembayar ==='BPJS'?'text-deep-purple':'text-negative'))"
          >
            sistem bayar : {{ row.sistembayar==='SEMUA' ?'Semua':(row.sistembayar === 'UMUM'?'UMUM':(row.sistembayar ==='BPJS'?'BPJS':'kosong')) }}
          </div>
        </div>
      </template>
      <template #cell-stok="{row}">
        <div class="row no-wrap text-italic">
          {{ cariGudang(row.kdruang) }}
          <!-- {{ store?.disp?.kdruang }} -->
        </div>
        <div class="row no-wrap text-weight-bold  items-end">
          <div>
            {{ row.total }}
          </div>
          <div class="q-ml-sm f-10 text-italic">
            ( {{ row.satuan_k ? row.satuan_k :'-' }} )
          </div>
        </div>
        <div class="row no-wrap text-italic f-10">
          {{ row.harga? 'Rp ' + formatRp( row.harga ): 'Harga tidak ditemukan' }}
        </div>
        <div class="row no-wrap text-italic f-10">
          {{ row.tglexp ?'exp : ' + dateFullFormat( row.tglexp ):'tanggal expired tidak ditemukan' }}
        </div>
      </template>
      <template #cell-stokalokasi="{row}">
        <div
          class="row no-wrap text-weight-bold  items-end cursor-pointer"
          :class="parseFloat(row.stokalokasi) !== parseFloat(row.total) ? (parseFloat(row.stokalokasi) < 0 ? 'bg-negative text-white q-pa-sm' :'bg-orange text-white q-pa-sm'):''"
          @click="rinciAlokasi(row)"
        >
          <div>
            {{ row.stokalokasi }}
          </div>
          <div class="q-ml-sm f-10 text-italic">
            ( {{ row.satuan_k ? row.satuan_k :'-' }} )
          </div>
        </div>
      </template>
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #cell-lain="{row}">
        <div v-if="true">
          belum
        </div>
        <div v-else>
          <div v-for="(gud,i) in namaGudang()" :key="i" style="min-width: 300px;">
            <div class="row items-center">
              <div class="col-9">
                {{ gud?.nama }}
              </div>
              <div class="col-2">
                {{ ambilJumlah(gud, row) }}
              </div>
              <div class="col-1">
                <q-btn
                  unelevated
                  round
                  flat
                  size="xs"
                  color="teal"
                  icon="icon-mat-refresh"
                  @click="ambilDataJumlah(gud,row)"
                >
                  <q-tooltip
                    class="primary"
                    :offset="[10, 10]"
                  >
                    Refresh / ambil Jumlah
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- {{ row?.lain??anu }} -->
      </template>
      <!-- eslint-disable-next-line vue/no-unused-vars -->
      <template #cell-peny="{row}">
        <div class="row no-wrap">
          <div class="col-auto">
            <q-btn
              v-if="role===1"
              label="Cek Stok"
              dense
              no-caps
              color="negative"
              push
              :loading="row.loading"
              :disable="row.loading"
              @click="table.cekStok(row)"
            />
          </div>
          <div class="col-auto">
            <q-btn
              v-if="role===1"
              label="cek penerimaan"
              dense
              no-caps
              color="primary"
              push
              :loading="row.loadingCek"
              :disable="row.loadingCek"
              @click="table.cekPenerimaan(row)"
            />
          </div>
        </div>
      </template>
      <template #left-acttion="{row}">
        <div class="q-mr-md">
          <q-btn
            v-if="role===1"
            flat
            class=""
            size="sm"
            round
            color="grey"
            icon="icon-mat-edit"
            :loading="row.loading"
            :disable="row.loading"
            @click="editData(row)"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
            >
              Penyesuaian Stok Awal
            </q-tooltip>
          </q-btn>
        </div>
      </template>
    </app-table>
    <DetailAlokasi v-model="table.isOpen" />
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { defineAsyncComponent, computed } from 'vue'
import { UseFarmasiStokSekarangTable } from 'src/stores/simrs/farmasi/stoksekarang/tabel'
import { UseFarmasiStokSekarangStore } from 'src/stores/simrs/farmasi/stoksekarang/form'

const table = UseFarmasiStokSekarangTable()
const store = UseFarmasiStokSekarangStore()
const apps = useAplikasiStore()

const DetailAlokasi = defineAsyncComponent(() => import('./DetailAlokasi.vue'))
const role = computed(() => {
  return apps?.user?.pegawai?.role_id
})
function cariGudang (val) {
  if (table.gudangs.length) {
    const gudang = table.gudangs.filter(gud => gud.kode === val)
    if (apps?.user?.kdruangansim !== '') {
      const gudang2 = table.gudangs.filter(gud => gud.kode === apps?.user?.kdruangansim)
      store.setDisp('kdruang', gudang2[0]?.nama)
    }
    if (gudang.length) {
      return gudang[0]?.nama
    }
    else return 'Gudang / Depo tidak ditemukan'
  }
  else {
    return 'menunggu data Gudang / Depo'
  }
}

function rinciAlokasi (row) {
  console.log('rinci alokasi', row)
  table.isOpen = true
  table.getDataAlokasi(row)
}

// watch(() => apps?.user?.kdruangansim, (obj) => {

// })
// eslint-disable-next-line no-unused-vars
function editData (val) {
  store.editData(val)
  console.log('edit', val)
}
const gudang = [
  { nama: 'Floor Stock 1 (AKHP)', value: 'Gd-03010101' },
  { nama: 'Depo Rawat inap', value: 'Gd-04010102' },
  { nama: 'Depo OK', value: 'Gd-04010103' },
  { nama: 'Depo Rawat Jalan', value: 'Gd-05010101' },
  { nama: 'Depo IGD', value: 'Gd-02010104' },
  { nama: 'Gudang Farmasi ( Kamar Obat )', value: 'Gd-05010100' },
  { nama: 'Gudang Farmasi ( Floor Stok )', value: 'Gd-03010100' }
]
function namaGudang () {
  const me = apps?.user?.kdruangansim
  const gud = gudang.filter(f => f.value !== me)
  return gud ?? []
}

function ambilDataJumlah (gud, row) {
  // console.log('ambil jumlah', gud, row)
  const masuk = {
    kdobat: row?.kdobat,
    kdruang: gud?.value,
    stokalokasi: row?.stokalokasi
  }
  const index = row.lain.findIndex(r => r.kdruang === gud?.value)
  if (index >= 0) row.lain[index] = masuk
  else row.lain.push(masuk)
}
function ambilJumlah (gud, row) {
  const obatnya = row.lain.find(r => r.kdruang === gud.value)
  if (obatnya) return obatnya.stokalokasi ?? 0
  else return '-'
  // console.log('ambil jumlah', gud, row)
}
</script>
