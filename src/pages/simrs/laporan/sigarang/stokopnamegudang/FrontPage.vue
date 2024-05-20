<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Persediaan Non Medis Gudang Rumah Sakit
      </div>
    </div>
    <div class="row justify-between">
      <div class="col-grow">
        <div class="row q-col-gutter-sm q-my-sm">
          <div class="col-2">
            <app-input
              v-model="store.params.q"
              label="Cari"
              outlined
              valid
              :loading="store.loading"
              @keyup.enter="store.setSearch"
            />
          </div>
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
      </div>
      <div class="col-auto">
        <div class="row items center">
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
        </div>
      </div>
    </div>
    <div id="printMe">
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
        Laporan Stok Opname Gudang Habis Pakai periode {{ date.formatDate((store.params.tahun+'-'+store.params.bulan+'-02' ),'MMMM YYYY') }}
      </div>
      <div class="q-pa-sm">
        <TableComp />
      </div>
      <div class="q-mt-md">
        <div class="q-my-md">
          <div class="row q-mb-md">
            <div class="col-4" />
            <div class="col-4" />
            <div class="col-4">
              <div class="text-center f-10">
                {{ pojokKananAtas }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriAtasSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahAtasSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananAtasSatu }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriAtasDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahAtasDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananAtasDua }}
              </div>
            </div>
          </div>
          <div class="row q-mt-xl text-weight-bold">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriBawahSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahBawahSatu }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananBawahSatu }}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="text-center f-10">
                {{ kiriBawahDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ tengahBawahDua }}
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                {{ kananBawahDua }}
              </div>
            </div>
          </div>
        </div>
        <div class="q-my-md print-hide">
          <div class="row ">
            <div class="col-4" />
            <div class="col-4" />
            <div class="col-4">
              <div class="text-center f-10">
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
              <div class="text-center f-10">
                <app-input
                  v-model="kiriAtasSatu"
                  label="kiri atas satu"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input
                  v-model="tengahAtasSatu"
                  label="tengah atas satu"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
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
              <div class="text-center f-10">
                <app-input
                  v-model="kiriAtasDua"
                  label="kiri atas dua"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input
                  v-model="tengahAtasDua"
                  label="tengah atas dua"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
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
              <div class="text-center f-10">
                <app-input
                  v-model="kiriBawahSatu"
                  label="kiri bawah satu"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input
                  v-model="tengahBawahSatu"
                  label="tengah bawah satu"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
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
              <div class="text-center f-10">
                <app-input
                  v-model="kiriBawahDua"
                  label="kiri bawah dua"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
                <app-input
                  v-model="tengahBawahDua"
                  label="tengah bawah dua"
                  valid
                  outlined
                />
              </div>
            </div>
            <div class="col-4">
              <div class="text-center f-10">
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
    <!-- <app-table-extend
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
          Laporan Stok Opname Gudang Habis Pakai periode {{ date.formatDate((store.params.tahun+'-'+store.params.bulan+'-02' ),'MMMM YYYY') }}
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
          </div>
        </td>
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
    </app-table-extend> -->
  </div>
</template>
<script setup>
// eslint-disable-next-line no-unused-vars
import { formatRp } from 'src/modules/formatter'
import { useLaporanStokOpnameGudangStore } from 'src/stores/simrs/laporan/sigarang/stokopnamegudang/opname'
import { date } from 'quasar'
import { defineAsyncComponent, ref } from 'vue'
const store = useLaporanStokOpnameGudangStore()
store.getInitialData()
const TableComp = defineAsyncComponent(() => import('./comp/TableComp.vue'))
// const ruang = computed(() => {
//   const tem = store.gudangs.filter(v => v.value === store.params.kode_ruang)
//   return tem.length > 0 ? tem[0].nama : '-'
// })

const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Stok Opname Gudang'

}
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
