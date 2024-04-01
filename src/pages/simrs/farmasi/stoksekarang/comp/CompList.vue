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
      <template #col-penerimaan>
        <div>Penerimaan</div>
      </template>
      <template #col-stok>
        <div>Stok</div>
      </template>

      <template #cell-obat="{row}">
        <div class="row no-wrap text-weight-bold text-green">
          {{ row.kd_obat }}
        </div>
        <div class="row text-weight-bold text-amber-10 box text-right no-wrap items-center">
          {{ row.nama_obat }}
        </div>
        <div class="row text-weight-bold no-wrap text-italic f-10">
          ( {{ row.satuan_k ? row.satuan_k :'-' }} )
        </div>
        <div class="row justify-start no-wrap q-my-xs">
          <div
            class="text-weight-bold"
            :class="row.status_fornas === '1'?'text-green':'text-negative'"
          >
            {{ row.status_fornas==='1' ?'Fornas':'Non-Fornas' }}
          </div>
          <div
            class="text-weight-bold q-ml-sm"
            :class="row.status_forkid === '1'?'text-green':'text-negative'"
          >
            {{ row.status_forkid==='1' ?'Forkit':'Non-Forkit' }}
          </div>
          <div
            class="text-weight-bold q-ml-sm"
            :class="row.status_generik === '1'?'text-green':'text-negative'"
          >
            {{ row.status_generik==='1' ?'Generik':'Non-Generik' }}
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
      </template>
      <template #cell-penerimaan="{row}">
        <div class="row no-wrap">
          {{ row.nopenerimaan }}
        </div>
        <div class="row no-wrap">
          {{ dateFullFormat( row.tglpenerimaan ) }}
        </div>
      </template>
      <template #cell-stok="{row}">
        <div class="row no-wrap text-italic">
          <!-- {{ cariGudang(row.kdruang) }} -->
          {{ store?.disp?.kdruang }}
        </div>
        <div class="row no-wrap text-weight-bold  items-end">
          <div>
            {{ row.jumlah }}
          </div>
          <div class="q-ml-sm f-10 text-italic">
            ( {{ row.satuan_k ? row.satuan_k :'-' }} )
          </div>
        </div>
        <div class="row no-wrap text-italic f-10">
          Rp  {{ formatRp( row.harga ) }}
        </div>
        <div class="row no-wrap text-italic f-10">
          exp : {{ dateFullFormat( row.tglexp ) }}
        </div>
      </template>
      <!-- <template #left-acttion="{row}">
        <div class="q-mr-md">
          <q-btn
            flat
            class=""
            size="sm"
            round
            color="grey"
            icon="icon-mat-edit"
            @click="editData(row)"
          >
            <q-tooltip
              anchor="top middle"
              self="center middle"
            >
              Edit Data
            </q-tooltip>
          </q-btn>
        </div>
      </template> -->
    </app-table>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
// import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { UseFarmasiStokSekarangTable } from 'src/stores/simrs/farmasi/stoksekarang/tabel'
import { UseFarmasiStokSekarangStore } from 'src/stores/simrs/farmasi/stoksekarang/form'

const table = UseFarmasiStokSekarangTable()
const store = UseFarmasiStokSekarangStore()
// const apps = useAplikasiStore()

// function cariGudang(val) {
//   if (table.gudangs.length) {
//     const gudang = table.gudangs.filter(gud => gud.kode === val)
//     if (apps?.user?.kdruangansim !== '') {
//       const gudang2 = table.gudangs.filter(gud => gud.kode === apps?.user?.kdruangansim)
//       store.setDisp('kdruang', gudang2[0]?.nama)
//     }
//     if (gudang.length) {
//       return gudang[0]?.nama
//     } else return 'Gudang / Depo tidak ditemukan'
//   } else {
//     return 'menunggu data Gudang / Depo'
//   }
// }

// watch(() => apps?.user?.kdruangansim, (obj) => {

// })
// function editData(val) {
//   store.editData(val)
//   console.log('edit', val)
// }
</script>
