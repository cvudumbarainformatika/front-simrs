<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Penerimaan Depo
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
      Laporan Penerimaan Depo
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
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-4">
        <app-autocomplete
          v-model="store.params.kode_ruang"
          label="pilih Depo"
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
      :click-able="true"
      text-cari="Cari Nama barang..."
      row-no
      bottom-row
      tanda-tangan
      separator="cell"
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
          Laporan Penerimaan Depo
        </div>
        <div class="row justify-center f-12 text-weight-bold q-my-sm">
          Periode {{ store.display.from + ' - ' + store.display.to }}
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
      <template #col-tanggal>
        <div>Tanggal</div>
      </template>
      <template #col-no_distribusi>
        <div>Nomor Distribusi</div>
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
      <template #col-kode>
        <div>Kode</div>
      </template>
      <template #col-nama>
        <div>Nama</div>
      </template>
      <template #col-harga>
        <div class="row">
          Harga
        </div>
      </template>
      <template #col-sub_total>
        <div>Nilai</div>
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
        <div class="text-right">
          {{ formatRp(row.sub_total) }}
        </div>
      </template>
      <template #cell-harga="{row}">
        <div class="text-right">
          {{ formatRp(row.harga) }}
        </div>
      </template>
      <template #expand="{ row }">
        <div v-if="row.detail_distribusi_depo.length">
          <div class="row">
            <div class="no">
              No
            </div>
            <div class="tgl">
              Tanggal
            </div>
            <div class="no-dis">
              No Distribusi
            </div>
            <div class="jum">
              Jumlah
            </div>
            <div class="har">
              Harga
            </div>
            <div class="sub">
              Sub Total
            </div>
          </div>
          <div
            v-for="(dist,i) in row.detail_distribusi_depo"
            :key="i"
            class="row"
          >
            <div class="no">
              {{ i+1 }}
            </div>
            <div class="tgl">
              {{ dateFullFormat(dist.tanggal) }}
            </div>
            <div class="no-dis">
              {{ dist?.distribusi?.no_distribusi }}
            </div>
            <div class="jum">
              {{ dist.jumlah }}
            </div>
            <div class="har text-right">
              {{ formatRp(dist.harga) }}
            </div>
            <div class="sub text-right">
              {{ formatRp(dist.sub) }}
            </div>
          </div>
        </div>
        <div v-if="!row.detail_distribusi_depo.length">
          Tidak ada detail
        </div>
      </template>
      <template #bottom-row>
        <td colspan="5">
          <div class="text-right f-12">
            Jumlah
          </div>
        </td>
        <td colspan="2">
          <div
            v-if="store.items.length"
            class="text-right f-12"
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
import { formatRp, dateFullFormat } from 'src/modules/formatter'
import { useLaporanSigarangPenerimaanDepoStore } from 'src/stores/simrs/laporan/sigarang/penerimaandepo/depo'

const store = useLaporanSigarangPenerimaanDepoStore()
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
// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Penerimaan Depo'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>
<style lang="scss" scoped>
$fs : 9px;

.no{
  width: 4%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.tgl{
  width: 25%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.no-dis{
  width: 20%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.jum{
  width: 15%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.har{
  width: 13%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.sub{
  width: 10%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  border-right: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
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
