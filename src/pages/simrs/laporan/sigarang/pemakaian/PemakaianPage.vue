<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Pemakaian Ruangan
      </div>
    </div>
    <div class="row items-center garis-bawah">
      <div class="col-2">
        <q-img
          src="~assets/images/logo-kota-grey.png"
          spinner-color="white"
          style="height: 3.56cm; max-width: 2.86cm"
        />
      </div>
      <div class="col-8">
        <div class="row justify-center text-center f-18">
          PEMERINTAH KOTA PROBOLINGGO
        </div>
        <div class="row justify-center text-center f-12 text-weight-bold">
          DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
        </div>
        <div class="row justify-center text-center f-20 text-weight-bold">
          UOBK RSUD DOKTER MOHAMAD SALEH
        </div>
        <div class="row justify-center text-center f-12">
          Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
        </div>
        <div class="row justify-center text-center f-14">
          E-mail : rsudprob@probolinggokota.go.id
        </div>
        <div class="row justify-center text-center f-14 text-weight-bold">
          PROBOLINGGO  67219
        </div>
      </div>
      <div class="col-2">
        <q-img
          src="~assets/logos/logo-rsud.png"
          spinner-color="white"
          style="height: 3cm; max-width: 3cm"
        />
      </div>
    </div>

    <div class="row justify-center f-16 text-weight-bold q-my-sm">
      Laporan Pemakaian Ruangan
    </div>
    <div class="row justify-center f-12 text-weight-bold q-my-sm">
      Periode {{ store.display.from + ' - ' + store.display.to }}
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
      <div class="col-2">
        <app-btn
          label="Ambil Data"
          :disable="store.loading"
          :loading="store.loading"
          @click="store.getDataTable"
        />
      </div>
    </div>
    <!-- <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-4">
        <app-input
          v-model="store.params.kode_ruang"
          label="Cari Ruangan ..."
          valid
          outlined
          debounce="800"
          :loading="store.loading"
          @update:model-value="cariRuangan"
        />
      </div>
    </div> -->
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
      text-cari="Cari Nama barang..."
      row-no
      bottom-row
      tanda-tangan
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
    >
      <template #header-for-print>
        <div class="row items-center garis-bawah">
          <div class="col-2">
            <q-img
              src="~assets/images/logo-kota-grey.png"
              spinner-color="white"
              style="height: 3.56cm; max-width: 2.86cm"
            />
          </div>
          <div class="col-8">
            <div class="row justify-center text-center f-18">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center text-center f-12 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center text-center f-20 text-weight-bold">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div class="row justify-center text-center f-12">
              Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
            </div>
            <div class="row justify-center text-center f-14">
              E-mail : rsudprob@probolinggokota.go.id
            </div>
            <div class="row justify-center text-center f-14 text-weight-bold">
              PROBOLINGGO  67219
            </div>
          </div>
          <div class="col-2">
            <q-img
              src="~assets/logos/logo-rsud.png"
              spinner-color="white"
              style="height: 3cm; max-width: 3cm"
            />
          </div>
        </div>

        <div class="row justify-center f-16 text-weight-bold q-my-sm">
          Laporan Pemakaian Ruangan
        </div>
        <div class="row justify-center f-12 text-weight-bold q-my-sm">
          Periode {{ store.display.from + ' - ' + store.display.to }}
        </div>
      </template>
      <template #header-left-after-search>
        <div class="q-ml-sm">
          <app-input
            v-model="store.params.kode_ruang"
            label="Cari Ruangan ..."
            valid
            outlined
            debounce="800"
            icon="icon-mat-search"
            :loading="store.loading"
            @update:model-value="cariRuangan"
          />
        </div>
      </template>
      <template #header-right-before>
        <q-btn
          ref="refPrint"
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
      </template>
      <template #col-ruang>
        <div>Ruangan</div>
      </template>
      <template #col-satuan>
        <div>Satuan</div>
      </template>
      <template #col-jumlah>
        <div>Qty Pemakaian</div>
      </template>
      <template #col-kode_rs>
        <div>Kode</div>
      </template>
      <template #col-nama>
        <div>Nama</div>
      </template>
      <template #cell-satuan="{row}">
        <div>{{ row.satuan }}</div>
      </template>
      <template #cell-jumlah="{row}">
        <div class="text-right">
          {{ row.jumlah??0 }}
        </div>
      </template>
      <template #bottom-row>
        <td colspan="5">
          <div class="text-right f-12 text-weight-bold">
            Jumlah Distribusi
          </div>
        </td>
        <td>
          <div
            v-if="store.items.length"
            class="text-right f-12  text-weight-bold"
          >
            {{ parseFloat(store.total.toFixed(3)) }}
            <!-- {{ store.items.map(anu=>anu.subtotal) }} -->
          </div>
        </td>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { useLaporanSigarangPemakaianStore } from 'src/stores/simrs/laporan/sigarang/pemakaian/pemakaian'

const store = useLaporanSigarangPemakaianStore()
store.getInitialData()
function cariRuangan(val) {
  store.setParams('kode_ruang', val)
  store.getDataTable()
}
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
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Pemakaian Ruangan'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
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
