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
      Laporan Stok Opname Depo RS periode {{ date.formatDate((store.params.tahun+'-'+store.params.bulan+'-02' ),'MMMM YYYY') }}
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
      :items="store.items"
      :meta="store.meta"
      :per-page="store.params.per_page"
      :loading="store.loading"
      :to-search="store.params.q"
      :default-btn="false"
      :ada-tambah="false"
      :ada-filter="false"
      :ada-paginasi="false"
      :ada-per-page="false"
      :click-able="true"
      text-cari="Cari Nama / Kode ..."
      row-no
      tanda-tangan
      bottom-row
      top-row
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
          Laporan Stok Opname Depo RS periode {{ date.formatDate((store.params.tahun+'-'+store.params.bulan+'-02' ),'MMMM YYYY') }}
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
          <div class="row no-wrap">
            <div class="col-12 text-center">
              Stok Barang
            </div>
          </div>

          <q-separator />
          <div class="row no-wrap">
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
        <th colspan="4">
          <div class="row no-wrap">
            <div class="col-12 text-center">
              Harga Barang
            </div>
          </div>
          <q-separator />
          <div class="row no-wrap">
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
        </th>
      </template>
      <template #cell-satuan="{row}">
        <div>{{ row.satuan?.nama }}</div>
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
        {{ parseFloat(row.awal) }}
      </template>
      <template #cell-masuk="{row}">
        {{ row.masuk }}
      </template>
      <template #cell-keluar="{row}">
        {{ row.keluar }}
      </template>
      <template #cell-sisa="{row}">
        <div class="row no-wrap  items-center">
          {{ row.akhir }}
        </div>
        <div class="row no-wrap f-8 text-italic print-hide">
          tabel : {{ row.tAkhir }}
        </div>
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
        <div class="row justify-end no-wrap f-8 text-italic print-hide">
          tabel :{{ formatRp( row.htAkhir?? 0) }}
        </div>
      </template>

      <template #bottom-row>
        <td colspan="8">
          <div class="text-right">
            Jumlah
          </div>
        </td>
        <td>
          <div
            v-if="store.items.length"
            class="text-right"
          >
            <div class="row no-wrap  items-center">
              {{ formatRp( store.total?? 0) }}
            </div>
            <div class="row no-wrap f-8 text-italic print-hide">
              tabel :{{ formatRp( store.tTotal?? 0) }}
            </div>
            <!-- {{ store.items.map(anu=>anu.subtotal) }} -->
          </div>
        </td>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useLaporanSigarangMutasiDepoStore } from 'src/stores/simrs/laporan/sigarang/mutasidepo/mutasi'
import { date } from 'quasar'

const store = useLaporanSigarangMutasiDepoStore()
store.getInitialData()

// click
function onClick (val) {
  console.log('click', val)
}
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Mutasi Depo'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>
<style scoped>
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
