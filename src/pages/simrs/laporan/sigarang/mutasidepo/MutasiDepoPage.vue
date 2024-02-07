<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Persediaan Non Medis Depo Rumah Sakit
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
        <div class="row justify-center f-18">
          PEMERINTAH KOTA PROBOLINGGO
        </div>
        <div class="row justify-center f-12 text-weight-bold">
          DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
        </div>
        <div class="row justify-center f-20 text-weight-bold">
          UOBK RSUD DOKTER MOHAMAD SALEH
        </div>
        <div class="row justify-center f-14">
          Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
        </div>
        <div class="row justify-center f-14">
          E-mail : rsudprob@probolinggokota.go.id
        </div>
        <div class="row justify-center f-14 text-weight-bold">
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
      Laporan Stok Opname {{ ruang }} periode {{ date.formatDate((store.params.tahun+'-'+store.params.bulan+'-02' ),'MMMM YYYY') }}
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-2">
        <app-autocomplete
          v-model="store.params.bulan"
          label="Pilih Bulan"
          autocomplete="nama"
          option-label="nama"
          option-value="value"
          outlined
          :source="store.bulans"
          :loading="store.loading"
        />
      </div>
      <div class="col-2">
        <app-input
          v-model="store.params.tahun"
          label="Tahun"
          outlined
          :loading="store.loading"
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
    <app-table-extend
      id="printMe"
      :columns="store.columns"
      :column-hide="store.columnsHide"
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      :default-btn="false"
      :ada-tambah="false"
      :ada-paginasi="false"
      :ada-per-page="false"
      :click-able="true"
      text-cari="Cari Nama / Kode ..."
      row-no
      top-row
      tanda-tangan
      bottom-row
      separator="cell"
      :enable-head="false"
      @find="store.setSearch"
      @goto="store.setPage"
      @set-row="store.setPerPage"
      @refresh="store.refreshTable"
      @on-click="onClick"
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
            <div class="row justify-center f-18">
              PEMERINTAH KOTA PROBOLINGGO
            </div>
            <div class="row justify-center f-12 text-weight-bold">
              DINAS KESEHATAN, PENGENDALIAN PENDUDUK, DAN KELUARGA BERENCANA
            </div>
            <div class="row justify-center f-20 text-weight-bold">
              UOBK RSUD DOKTER MOHAMAD SALEH
            </div>
            <div class="row justify-center f-14">
              Jl. Mayjen Panjaitan No.65 Telp.(0335) 433119, 42118 Fax (0335) 432702
            </div>
            <div class="row justify-center f-14">
              E-mail : rsudprob@probolinggokota.go.id
            </div>
            <div class="row justify-center f-14 text-weight-bold">
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
          Laporan Stok Opname {{ ruang }} periode {{ date.formatDate((store.params.tahun+'-'+store.params.bulan+'-02' ),'MMMM YYYY') }}
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
      <template #header-left-after-search>
        <div class="q-ml-sm">
          <app-autocomplete
            v-model="store.params.kode_ruang"
            label="Pilih Depo"
            autocomplete="nama"
            option-label="nama"
            option-value="value"
            outlined
            :source="store.gudangs"
            :loading="store.loading"
          />
        </div>
      </template>

      <template #top-row>
        <th>
          <div>No</div>
        </th>
        <th>
          <div>Kode 108</div>
        </th>
        <th>
          <div>Nama 108</div>
        </th>
        <th>
          <div>Kode Rs</div>
        </th>
        <th>
          <div>Nama Barang</div>
        </th>
        <th colspan="4">
          <div class="row">
            <div class="col-12 text-center">
              Stok Barang
            </div>
          </div>

          <q-separator />
          <div class="row">
            <div class="col-3">
              Awal
            </div>
            <div class="col-3">
              Masuk
            </div>
            <div class="col-3">
              Keluar
            </div>
            <div class="col-3">
              Sisa
            </div>
          </div>
        </th>
        <th>
          <div>
            Satuan
          </div>
        </th>
        <!-- <th colspan="4">
          <div class="row">
            <div class="col-12 text-center">
              Nilai Persediaan
            </div>
          </div>
          <q-separator />
          <div class="row">
            <div class="col-3">
              Awal (Rp)
            </div>
            <div class="col-3">
              Masuk (Rp)
            </div>
            <div class="col-3">
              Keluar (Rp)
            </div>
            <div class="col-3">
              Sisa (Rp)
            </div>
          </div>
        </th> -->
      </template>
      <template #bottom-row>
        <td colspan="5">
          <div class="text-right">
            Jumlah
          </div>
        </td>
        <td colspan="4">
          <div
            v-if="store.items.length"
            class="text-right"
          >
            <div class="row no-wrap justify-end items-center">
              {{ parseFloat( store.total ?? 0) }}
            </div>
            <div class="row no-wrap justify-end f-8 text-italic print-hide">
              tabel :  {{ parseFloat( store.tTotal.toFixed(2) ?? 0) }}
            </div>
            <!-- {{ store.items.map(anu=>anu.subtotal) }} -->
          </div>
        </td>
        <!--
          <td>
            <div
              v-if="store.items.length"
              class="text-right"
            />
          </td>
          <td colspan="4">
          <div
            v-if="store.items.length"
            class="text-right"
          >
            <div class="row no-wrap justify-end items-center">
              {{ formatRp( store.htotal?? 0) }}
            </div>
            <div class="row no-wrap f-8 justify-end text-italic print-hide">
              tabel :  {{ formatRp( store.htTotal?? 0) }}
            </div>
          </div>
        </td>
      -->
      </template>
      <template #col-kode_108>
        Kode 108
      </template>
      <template #col-uraian_108>
        Uraian 108
      </template>
      <template #col-kode>
        Kode Rs
      </template>
      <template #col-nama>
        Nama Barang
      </template>
      <template #col-awal>
        Awal
      </template>
      <template #col-masuk>
        Masuk
      </template>
      <template #col-keluar>
        Keluar
      </template>
      <template #col-sisa>
        Sisa
      </template>
      <template #col-satuan>
        Satuan
      </template>
      <template #col-hawal>
        <div class="wrap">
          (Harga) Awal (Rp)
        </div>
      </template>
      <template #col-hmasuk>
        <div class="wrap">
          (Harga) Masuk (Rp)
        </div>
      </template>
      <template #col-hkeluar>
        <div class="wrap">
          (Harga) Keluar (Rp)
        </div>
      </template>
      <template #col-hsisa>
        <div class="wrap">
          (Harga) Sisa (Rp)
        </div>
      </template>
      <template #cell-satuan="{row}">
        <div class="box-mini">
          {{ row.satuan?.nama }}
        </div>
      </template>
      <template #cell-nama="{row}">
        <div class="box">
          {{ row.nama }}
        </div>
      </template>
      <template #cell-uraian_108="{row}">
        <div class="box">
          {{ row.uraian_108 }}
        </div>
      </template>
      <template #cell-awal="{row}">
        <div class="text-right">
          {{ parseFloat(row.awal) }}
        </div>
      </template>
      <template #cell-masuk="{row}">
        <div class="text-right">
          {{ parseFloat(row.masuk) }}
        </div>
      </template>
      <template #cell-keluar="{row}">
        <div class="text-right">
          {{ parseFloat(row.keluar) }}
          <div
            v-if="row.trmru"
            class="text-italic text-right print-hide"
            :class="parseFloat(row.keluar)!== parseFloat(row.trmru)? 'text-negative text-weight-bold f-12':'f-8 '"
          >
            (trm: {{ parseFloat(row.trmru) }})
          </div>
        </div>
      </template>
      <template #cell-sisa="{row}">
        <div class="text-right">
          {{ parseFloat(row.akhir) }}
          <div
            class="text-italic text-right print-hide"
            :class="parseFloat(row.akhir)!== parseFloat(row.tAkhir)? 'text-negative text-weight-bold f-14':'f-8 '"
          >
            (tabel: {{ parseFloat(row.tAkhir) }})
          </div>
        </div>
        <!-- <div class="row items-center box-mini ">
          <div class="col-12">
            <div class="row justify-end">
              {{ parseFloat(row.akhir) }}
            </div>
            <div class="row f-8 text-italic justify-end print-hide">
              {{ parseFloat(row.tAkhir) }}
            </div>
          </div>
        </div> -->
      </template>
      <template #cell-hawal="{row}">
        <div class="row justify-end no-wrap">
          {{ formatRp( row.hAwal?? 0) }}
        </div>
      </template>
      <template #cell-hmasuk="{row}">
        <div class="row justify-end no-wrap">
          {{ formatRp( row.hMasuk?? 0) }}
        </div>
      </template>
      <template #cell-hkeluar="{row}">
        <div class="row justify-end no-wrap">
          {{ formatRp( row.hKeluar?? 0) }}
        </div>
      </template>
      <template #cell-hsisa="{row}">
        <div class="row no-wrap justify-end items-center">
          {{ formatRp( row.hAkhir?? 0) }}
        </div>
        <div
          class="row justify-end no-wrap text-italic print-hide"
          :class="parseFloat(row.hAkhir)!== parseFloat(row.htAkhir)? 'text-negative text-weight-bold f-12':'f-8 '"
        >
          tabel :{{ formatRp( row.htAkhir?? 0) }}
        </div>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useLaporanSigarangMutasiDepoStore } from 'src/stores/simrs/laporan/sigarang/mutasidepo/mutasi'
import { date } from 'quasar'
import { computed } from 'vue'
const store = useLaporanSigarangMutasiDepoStore()
store.getInitialData()

const ruang = computed(() => {
  const tem = store.gudangs.filter(v => v.value === store.params.kode_ruang)
  return tem.length > 0 ? tem[0].nama : '-'
})
// click
function onClick (val) {
  console.log('click', val)
}
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Mutasi Depo (Stok Opname)'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>
<style scoped>
.box-mini {
  white-space: normal !important;
    inline-size: 50px;
    overflow-wrap: break-word;
}
.box {
  white-space: normal !important;
    inline-size: 150px;
    overflow-wrap: break-word;
}
.q-table td box {
  white-space: normal !important;
    inline-size: 100px;
    overflow-wrap: break-word;
}
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal !important;
}
</style>
