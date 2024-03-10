<template>
  <div class="bg-white q-pa-xs">
    <div
      class="row bg-primary text-white q-pa-sm q-mb-sm"
    >
      <div class="f-14 text-weight-bold">
        Laporan Rekap Pengeluaran Depo
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

    <div
      v-if="!store.params.ruang"
      class="row justify-center f-16 text-weight-bold q-my-sm"
    >
      Laporan Rekap Pengeluaran Depo
    </div>
    <div
      v-if="store.params.ruang"
      class="row justify-center f-14 text-weight-bold q-my-sm"
    >
      Laporan Rekap Per Ruangan
    </div>
    <div
      v-if="store.params.ruang"
      class="row justify-center f-16 text-weight-bold q-my-sm text-italic"
    >
      {{ ruangan }}
    </div>
    <div class="row justify-center f-12 text-weight-bold q-my-sm">
      Tahun {{ store.params.year }}
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div class="col-2">
        <app-autocomplete
          v-model="store.params.year"
          :source="years"
          label="Pilih tahun"
          outlined
        />
      </div>
      <!-- <div class="col-2">
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
      </div> -->
    </div>
    <div class="row q-col-gutter-sm q-my-sm">
      <div :class="store.params.kode_ruang!=='Gd-02010102'?'col-2':'col-4'">
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
      <div
        v-if="store.params.kode_ruang!=='Gd-02010102'"
        class="col-2"
      >
        <app-autocomplete
          v-model="store.params.ruang"
          label="pilih Ruangan"
          autocomplete="uraian"
          option-label="uraian"
          option-value="kode"
          valid
          outlined
          :source="store.ruangs"
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
      separator="cell"
      text-cari="Cari Nama barang..."
      row-no
      tanda-tangan
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

        <div
          v-if="!store.params.ruang"
          class="row justify-center f-16 text-weight-bold q-my-sm"
        >
          Laporan Rekap Pengeluaran Depo
        </div>
        <div
          v-if="store.params.ruang"
          class="row justify-center f-14 text-weight-bold q-my-sm"
        >
          Laporan Rekap Per Ruangan
        </div>
        <div
          v-if="store.params.ruang"
          class="row justify-center f-16 text-weight-bold q-my-sm text-italic"
        >
          {{ ruangan }}
        </div>
        <div class="row justify-center f-12 text-weight-bold q-my-sm">
          Tahun {{ store.params.year }}
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
      <template #col-satuan>
        <div>Satuan</div>
      </template>
      <template #col-jumlah>
        <div>Qty</div>
      </template>
      <template #col-01>
        <div>Jan</div>
      </template>
      <template #col-02>
        <div>Feb</div>
      </template>
      <template #col-03>
        <div>Mar</div>
      </template>
      <template #col-04>
        <div>Apr</div>
      </template>
      <template #col-05>
        <div>Mei</div>
      </template>
      <template #col-06>
        <div>Jun</div>
      </template>
      <template #col-07>
        <div>Jul</div>
      </template>
      <template #col-08>
        <div>Agu</div>
      </template>
      <template #col-09>
        <div>Sep</div>
      </template>
      <template #col-10>
        <div>Okt</div>
      </template>
      <template #col-11>
        <div>Nov</div>
      </template>
      <template #col-12>
        <div>Des</div>
      </template>
      <template #col-kode>
        <div>Kode</div>
      </template>
      <template #col-nama>
        <div>Nama</div>
      </template>
      <template #cell-satuan="{row}">
        <div class="sat">
          {{ row.satuan }}
        </div>
      </template>
      <template #cell-nama="{row}">
        <div class="nama">
          {{ row.nama }}
        </div>
      </template>
      <template #cell-tanggal="{row}">
        <div>{{ row.tanggal?dateFullFormat(row.tanggal):dateFullFormat(row.tanggal_l) }}</div>
      </template>
      <template #cell-jumlah="{row}">
        <div class="text-right">
          {{ row.jumlah??0 }}
        </div>
      </template>

      <template #expand="{ row }">
        <div v-if="!row.detail_distribusi_langsung.length && !row.detail_permintaanruangan.length">
          Tidak Ada Detail
        </div>
        <div v-if="row.detail_distribusi_langsung.length">
          <div class="row text-weight-bold">
            <div class="h-no">
              No
            </div>
            <div class="h-tgl">
              Tanggal
            </div>
            <div class="h-no-dis">
              Tujuan
            </div>
            <div class="h-jum">
              Qty
            </div>
          </div>
          <div
            v-for="(dist,i) in row.detail_distribusi_langsung"
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
              {{ dist?.tujuan }}
            </div>
            <div class="jum text-right">
              {{ dist.jumlah_distribusi }}
            </div>
          </div>
        </div>
        <div v-if="row.detail_permintaanruangan.length">
          <div class="row text-weight-bold">
            <div class="h-no">
              No
            </div>
            <div class="h-tgl">
              Tanggal
            </div>
            <div class="h-no-dis">
              Tujuan
            </div>
            <div class="h-jum">
              Qty
            </div>
          </div>
          <div
            v-for="(dist,i) in row.detail_permintaanruangan"
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
              {{ dist?.tujuan }}
            </div>
            <div class="jum text-right">
              {{ dist.jumlah }}
            </div>
          </div>
        </div>
      </template>
      <template #bottom-row>
        <td colspan="4">
          <div class="text-right f-12 text-weight-bold">
            Jumlah Distribusi
          </div>
        </td>
        <td colspan="3">
          <div
            v-if="store.items.length"
            class="text-right f-12  text-weight-bold"
          >
            {{ parseFloat(store.total.toFixed(3)) }}
          </div>
        </td>
      </template>
    </app-table-extend>
  </div>
</template>
<script setup>
import { dateFullFormat } from 'src/modules/formatter'
import { useLaporanSigarangRekapPengeluaranStore } from 'src/stores/simrs/laporan/sigarang/rekapkeluardepo/rekap'
import { ref, computed } from 'vue'

const store = useLaporanSigarangRekapPengeluaranStore()
store.getInitialData()
const ruangan = computed(() => {
  const temp = store.ruangs.filter(a => a.kode === store.params.ruang)
  console.log('temp', temp)
  return temp.length ? temp[0]?.uraian : '-'
})
// function setDari(val) {
//   store.setParams('from', val)
// }
// function setDispDari(val) {
//   store.display.from = val
// }
// function setKe(val) {
//   store.setParams('to', val)
// }
// function setDispKe(val) {
//   store.display.to = val
// }

// click
function onClick (val) {
  console.log('click', val)
  val.item.expand = !val.item.expand
  val.item.highlight = !val.item.highlight
}

const curY = parseInt(store.params.year)
const years = ref([])
for (let index = 0; index < 11; index++) {
  console.log('year', curY, store.params.year)
  years.value[index] = curY - 5 + index
}
const printObj = {
  id: 'printMe',
  popTitle: 'Laporan Rekap Pengeluaran Depo'
  // extraCss: 'https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css',
  // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',

}
</script>
<style lang="scss" scoped>
$fs : 9px;
.nama{
  min-width: 200px;
  max-width: 250px;
  white-space: normal !important;
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  word-break: break-word;
}
.sat{
  min-width: 50px;
  max-width: 100px;
  white-space: normal !important;
  overflow-wrap: normal !important;
  word-wrap: normal !important;
  word-break: break-word;
}
.h-no{
  width: 5%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.h-tgl{
  width: 15%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.h-no-dis{
  width: 40%;
  border-top: 1px solid $grey;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.h-jum{
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
.no{
  width: 5%;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.tgl{
  width: 15%;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.no-dis{
  width: 40%;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.jum{
  width: 10%;
  border-left: 1px solid $grey;
  border-bottom: 1px solid $grey;
  border-right: 1px solid $grey;
  padding-top :4px;
  padding-bottom :4px;
  padding-left:3px;
  padding-right:3px;
}
.har{
  width: 10%;
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
  .app-table-extend {
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
