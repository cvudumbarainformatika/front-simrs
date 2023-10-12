<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Penerimaan Gudang
      </div>
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
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-4">
        <app-autocomplete
          v-model="store.params.kode_ruang"
          label="Pilih Gudang / Depo"
          autocomplete="nama"
          option-label="nama"
          option-value="value"
          valid
          outlined
          :source="store.gudangs"
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
      text-cari="Cari Nama / Kode ..."
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
          Laporan Penerimaan Gudang
        </div>
        <div class="row justify-center f-12 text-weight-bold q-my-sm">
          Periode {{ date.formatDate((store.params.from ),'DD MMMM YYYY') }} - {{ date.formatDate((store.params.to ),'DD MMMM YYYY') }}
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
      <template #col-kode>
        <div>Kode</div>
      </template>
      <template #col-nama>
        <div>Nama</div>
      </template>
      <template #col-satuan>
        <div>Satuan</div>
      </template>
      <template #col-qty>
        <div class="row no-wrap q-col-gutter-md">
          <div class="col-4">
            Qty
          </div>
          <div class="col-4 q-mx-md">
            Harga
          </div>
          <div class="col-4">
            Nilai
          </div>
        </div>
      </template>
      <template #cell-satuan="{row}">
        <div>{{ row.satuan?.nama }}</div>
      </template>
      <template #cell-qty="{row}">
        <div v-if="row.monthly.length">
          <div
            v-for="(item,i) in row.monthly"
            :key="i"
            class="row no-wrap q-col-gutter-md"
          >
            <div class="col-4">
              {{ item.totalStok }}
            </div>
            <div class="col-4 text-right">
              {{ formatRp( item.harga) }}
            </div>
            <div class="col-4 text-right">
              {{ formatRp(item.total) }}
            </div>
          </div>
        </div>
        <div v-else-if="row.recent.length">
          <div
            v-for="(item,i) in row.recent"
            :key="i"
            class="row no-wrap q-col-gutter-md"
          >
            <div class="col-4">
              {{ item.totalStok }}
            </div>
            <div class="col-4 text-right">
              {{ formatRp(item.harga) }}
            </div>
            <div class="col-4 text-right">
              {{ formatRp(item.total) }}
            </div>
          </div>
        </div>
        <div
          v-else
          class=" row jutify-center"
        >
          -
        </div>
      </template>
      <template #bottom-row>
        <td colspan="4">
          <div class="text-right">
            Jumlah
          </div>
        </td>
        <td>
          <div
            v-if="store.items.length"
            class="text-right"
          >
            {{ formatRp(store.total) }}
            <!-- {{ store.items.map(anu=>anu.subtotal) }} -->
          </div>
        </td>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { formatRp } from 'src/modules/formatter'
import { useLaporanSigarangPenerimaanGudangStore } from 'src/stores/simrs/laporan/sigarang/penerimaangudang/penerimaangudang'
import { date } from 'quasar'

const store = useLaporanSigarangPenerimaanGudangStore()
store.getInitialData()

const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Persediaan FiFo'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>
<style scoped>
.q-table td box {
  white-space: normal !important;
    inline-size: 100px;
    overflow-wrap: break-word;
}
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal !important;
}
</style>
