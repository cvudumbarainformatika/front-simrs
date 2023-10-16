<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Tarif InaCbg
      </div>
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-2">
        <app-input-date-human
          :model="store.display.from"
          label="Dari tanggal"
          outlined
          @db-model="setDari"
          @set-display="setDispDari"
        />
      </div>
      <div class="col-2">
        <app-input-date-human
          :model="store.display.to"
          label="Sampai tanggal"
          outlined
          @db-model="setKe"
          @set-display="setDispKe"
        />
      </div>
    </div>
    <div class="row q-col-gutter-sm items-center q-my-sm">
      <div class="col-2">
        <q-radio
          v-model="store.params.rawat"
          dense
          checked-icon="icon-mat-task_alt"
          unchecked-icon="icon-mat-panorama_fish_eye"
          val="rawat jalan"
          label="Rawat Jalan"
        />
      </div>
      <div class="col-2">
        <q-radio
          v-model="store.params.rawat"
          dense
          checked-icon="icon-mat-task_alt"
          unchecked-icon="icon-mat-panorama_fish_eye"
          val="rawat inap"
          label="Rawat Inap"
        />
      </div>
      <div class="col-2">
        <app-btn
          label="Ambil Data"
          :disable="store.loading"
          :loading="store.loading"
          @click="store.getDataTable"
        />
      </div>
      <div class="col-2">
        <div v-if="store.items.length">
          <download-excel
            class="btn"
            :data="store.items"
            :fields="jsonFields"
            :name="'inacbg periode '+ store.display.from + '-' + store.display.to + '.xls'"
          >
            <app-btn
              label="Download Excel"
              icon="icon-mat-download"
              push
            />
          </download-excel>
        </div>
      </div>
    </div>
    <app-table-extend
      id="printMe"
      :columns="store.columns"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      :ada-cari="false"
      row-no
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
    >
      <template #col-tanggal>
        <div>Tanggal</div>
      </template>
      <template #col-no_penerimaan>
        <div>Nomor Penerimaan</div>
      </template>
      <template #col-satuan>
        <div>Satuan</div>
      </template>
      <template #col-surat_jalan>
        <div>Surat Jalan</div>
      </template>
      <template #col-faktur>
        <div>Faktur</div>
      </template>
      <template #col-perusahaan>
        <div>Penyedia</div>
      </template>
      <template #col-kode_rs>
        <div>Kode</div>
      </template>
      <template #col-nama>
        <div>Nama</div>
      </template>
      <template #col-harga>
        <div class="row">
          Harga
        </div>
        <div class="row no-wrap f-6 text-italic">
          (+) diskon dan ppn
        </div>
      </template>
      <template #col-sub_total>
        <div>Nilai</div>
      </template>
      <template #col-status>
        <div>Status</div>
      </template>
      <template #col-qty>
        <div>
          Qty
        </div>
      </template>
      <template #cell-satuan="{row}">
        <div>{{ row.satuan }}</div>
      </template>
      <template #cell-tanggal="{row}">
        <div>{{ dateFullFormat(row.tanggal) }}</div>
      </template>
      <template #cell-sub_total="{row}">
        <div v-if="row.harga>0">
          {{ formatRp(row.sub_total) }}
        </div>
        <div v-else>
          belum bast
        </div>
      </template>
      <template #cell-perusahaan="{row}">
        <div>
          {{ row.perusahaan?.nama ?? '-' }}
        </div>
      </template>
      <template #cell-status="{row}">
        <div
          v-if="row.status<=1"
          class="text-negative text-weight-bold"
        >
          Belum Diterima gudang
        </div>
        <div
          v-if="row.status>=2 && row.sisa_stok > 0"
          class="text-deep-orange text-weight-bold"
        >
          Sudah di Gudang
        </div>
        <div
          v-if="row.status>=2 && row.sisa_stok <= 0"
          class="text-green"
        >
          Sudah di distribusikan
        </div>
      </template>
      <!-- <template #bottom-row>
        <td colspan="11">
          <div class="text-right f-12">
            Jumlah
          </div>
        </td>
        <td>
          <div
            v-if="store.items.length"
            class="text-right f-12"
          >
            {{ formatRp(store.total) }}
          </div>
        </td>
      </template> -->
    </app-table-extend>
  </div>
</template>
<script setup>
import { formatRp, dateFullFormat } from 'src/modules/formatter'
import { useLaporanKeuanganInacbgStore } from 'src/stores/simrs/laporan/keuangan/inacbg/inacbg'

const store = useLaporanKeuanganInacbgStore()
store.getInitialData()

function setDari(val) {
  store.setParams('from', val)
}
function setDispDari(val) {
  store.display.from = val
}
function setKe(val) {
  store.setParams('to', val)
}
function setDispKe(val) {
  store.display.to = val
}
const jsonFields = {
  Poli: 'poli',
  Dokter: 'dokter',
  'Jumlah Kunjungan': 'kunjungan',
  'Jumlah Tagihan': 'tagihan',
  'Jumlah Pendapatan': 'pendapatan',
  Laborat: 'lab',
  Radiologi: 'rad',
  Obat: 'obat'
}
// const printObj = {
//   id: 'printMe',
//   popTitle: 'Laporan Persediaan FiFo'
//   // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
//   // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

// }
</script>
<style lang="scss" scoped>
$fs : 9px;
.app-table {
  width: 100%; /* print width */
  font-size:$fs;

  .q-table td {
    padding-left: 10px;
    font-size: $fs;
  }
  .q-table th {
    padding-left: 10px;
    font-size: $fs;
  }
}

@media print {
  .app-table {
    width: 100%; /* print width */
    font-size:$fs;

    .q-table {
        max-width: 100% !important;
      }
    .q-table td {
      padding: 2px;
      font-size: $fs;
       white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }
    .q-table th {
      padding:2px;
      font-size:$fs;
      white-space: normal !important;
        word-wrap: normal !important;
        hyphens: manual;
    }

    .screenwide{
      max-width: 100% !important;
    }
  }
}

</style>
