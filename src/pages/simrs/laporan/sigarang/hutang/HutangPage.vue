<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Hutang Persediaan Non Medis Rumah Sakit
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
      Laporan Hutang Persediaan Non Farmasi
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
      text-cari="Cari Perusahaan ..."
      row-no
      tanda-tangan
      bottom-row
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
          Laporan Hutang Persediaan Non Farmasi
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

      <template #col-penyedia>
        <div>Nama Penyedia</div>
      </template>
      <template #col-nilai>
        <div>Nilai</div>
      </template>
      <template #cell-penyedia="{row}">
        <div>{{ row?.nama }}</div>
      </template>
      <template #cell-nilai="{row}">
        <div class="text-right">
          {{ formatRp(row?.nilai) }}
        </div>
      </template>

      <template #expand="{ row }">
        <div v-if="row.penerimaan.length">
          <div class="row text-weight-bold">
            <div class="no">
              No
            </div>
            <div class="trm">
              No Penerimaan
            </div>

            <div class="peny">
              Penyedia
            </div>
            <div class="fak">
              No Faktur
            </div>
            <div class="tgl-trm">
              Tgl Penerimaan
            </div>
            <div class="tmp">
              Tgl Jatuh Tempo
            </div>
            <div class="sub text-right">
              Subtotal
            </div>
          </div>
          <!-- <q-separator /> -->
          <div
            v-for="(trm,i) in row.penerimaan"
            :key="i"
            class="row"
          >
            <div class="no">
              {{ i+1 }}
            </div>
            <div class="trm box-lg">
              {{ trm.no_penerimaan }}
            </div>
            <div class="peny box">
              {{ row.nama }}
            </div>
            <div class="fak">
              {{ trm.faktur }}
            </div>
            <div class="tgl-trm">
              {{ dateFullFormat( trm.tanggal) }}
            </div>
            <div class="tmp">
              {{ dateFullFormat(trm.tempo) }}
            </div>
            <div class="sub text-right">
              {{ trm.nilai_tagihan>0?formatRp(trm.nilai_tagihan):formatRp(trm.total) }}
            </div>
            <q-separator />
          </div>
        </div>
        <div v-if="!row.penerimaan.length">
          Tidak ada detail
        </div>
      </template>

      <template #bottom-row>
        <td colspan="2">
          <div class="text-right text-weight-bold ">
            Jumlah
          </div>
        </td>
        <td>
          <div
            v-if="store.items.length"
            class="text-right"
          >
            <div class="text-weight-bold text-right">
              {{ formatRp( store.total?? 0) }}
            </div>
          </div>
        </td>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat, formatRp } from 'src/modules/formatter'
import { useLaporanSigarangHutangStore } from 'src/stores/simrs/laporan/sigarang/hutang/hutang'

const store = useLaporanSigarangHutangStore()
store.getInitialData()

// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Hutang Persediaan Non Farmasi'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>
<style  lang="scss"  scoped>
.box {
  white-space: normal !important;
    inline-size: 150px;
    overflow-wrap: break-word;
}
.box-lg {
  white-space: normal !important;
    inline-size: 250px;
    overflow-wrap: break-word;
}
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
.trm{
  width: 25%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.peny{
  width: 20%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.fak{
  width: 15%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.tgl-trm{
  width: 13%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.tmp{
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
.q-table td box {
  white-space: normal !important;
    inline-size: 100px;
    overflow-wrap: break-word;
}
.q-table--no-wrap th, .q-table--no-wrap td {
  white-space: normal !important;
}

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
