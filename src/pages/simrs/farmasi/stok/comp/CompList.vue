<template>
  <!-- <div class="row q-mt-lg q-px-xs">
    {{ table?.keterangan }}
  </div> -->
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
      <template #col-fisik>
        <div>Fisik</div>
      </template>
      <template #col-selisih>
        <div>Selisih</div>
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
          Rp  {{ formatRp( row.harga ) }}
        </div>
        <div class="row no-wrap text-italic f-10">
          exp : {{ dateFullFormat( row.tglexp ) }}
        </div>
      </template>
      <template #cell-fisik="{row}">
        <div v-if="!table.tutup" class="row q-col-gutter-sm items-center " style="min-width: 200px;">
          <div class="col-auto">
            <app-input-date-human
              :model="row.tglInputFisik"
              label="Tanggal Input fisik"
              outlined
              valid
              @set-display="setData('tglInputFisik',$event,row)"
              @db-model="setData('tgl_input_fisik',$event,row)"
            />
          </div>
          <div class="col-auto">
            <app-input-date-human
              :model="row.jamInput"
              label="Jam Input fisik"
              outlined
              valid
              :type-date="false"
              @set-model="setData('jamInput',$event,row)"
            />
          </div>
          <div class="col-auto">
            <q-input
              v-model="row.totalFisik"
              label="Jumlah Fisik Obat"
              outlined
              dense
              standout="bg-yellow-3"
              :loading="row.loadingSimpan"
              :disable="row.loadingSimpan"
              valid
              @keyup.enter.stop="simpanFisik(row)"
            >
              <q-tooltip class="bg-white text-weight-bold" anchor="center right" self="center left" :offset="[15,0]">
                <div class="row text-orange f-12">
                  Di Isi Jumlah Stok Fisik
                </div>
                <div class="row text-primary f-12">
                  Tekan Enter Untuk Simpan
                </div>
              </q-tooltip>
            </q-input>
          </div>
        </div>
        <div v-else>
          {{ row?.totalFisik }}
        </div>
      </template>
      <template #cell-selisih="{row}">
        <div class="row text-weight-bold" :class="getSelisih(row)===0?'':(getSelisih(row)>0?'text-orange':'text-negative')">
          {{ getSelisih(row) }}
        </div>
      </template>
      <template #left-acttion="{row}">
        <div>
          <div class="row q-mr-md q-my-sm">
            <q-btn
              class=""
              size="sm"
              color="primary"
              label="Simpan"
              no-caps
              :loading="row?.loadingSimpan"
              :disable="row?.loadingSimpan"
              @click="simpanFisik(row)"
            >
              <q-tooltip
                anchor="top middle"
                self="center middle"
              >
                Re-stok
              </q-tooltip>
            </q-btn>
          </div>
          <div class="row q-mr-md q-my-sm">
            <q-btn
              v-if="role===1"
              class=""
              size="sm"
              color="dark"
              label="Re-Stok Opname"
              no-caps
              :loading="row?.loadingRe"
              :disable="row?.loadingRe"
              @click="editData(row)"
            >
              <q-tooltip
                anchor="top middle"
                self="center middle"
              >
                Re-stok
              </q-tooltip>
            </q-btn>
          </div>
        </div>
      </template>
    </app-table>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { notifErrVue } from 'src/modules/utils'
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { UseFarmasiStokStore } from 'src/stores/simrs/farmasi/stok/form'
import { UseFarmasiStokTable } from 'src/stores/simrs/farmasi/stok/tabel'
import { computed } from 'vue'

const table = UseFarmasiStokTable()
const store = UseFarmasiStokStore()
const apps = useAplikasiStore()
const role = computed(() => {
  return apps?.user?.pegawai?.role_id
})
function cariGudang (val) {
  // console.log('user', apps?.user?.pegawai?.role_id)
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

// watch(() => apps?.user?.kdruangansim, (obj) => {

// })
function simpanFisik (row) {
  console.log('simpan fisik', row, parseFloat(row?.fisik))
  if (isNaN(parseFloat(row?.fisik))) return notifErrVue('Di Isi Nomor')
  store.simpanFisik(row)
}
function editData (val) {
  // store.editData(val)
  console.log('edit', val)
}
function setData (key, evt, row) {
  row[key] = evt
}
function getSelisih (row) {
  const jumlah = parseFloat(row?.total)
  const fisik = !isNaN(parseFloat(row?.totalFisik)) ? parseFloat(row?.totalFisik) : 0
  return jumlah - fisik
}
</script>
