<template>
  <div class="justify-content-center">
    <formGetdata />
    <div class="q-pa-md full-width">
      <template v-if="store.params.levels === '2' && !store.loading">
        <q-table
          class="my-sticky-table"
          :rows="store.kodekelompok"
          :columns="columns"
          row-key="name"
          wrap-cells
          :loading="store.loading"
          :rows-per-page-options="[0]"
          hide-bottom
          :rows-number="[0]"
        >
          <template #body="props">
            <q-tr>
              <q-td key="kode" :props="props" class="text-left">
                <div :class="props?.row?.kodeall3.length <= 1 ? 'text-bold' : '' ">
                  {{ props.row?.kodeall3 }}
                </div>
              </q-td>
              <q-td key="rekening" :props="props" class="text-left">
                <div :class="props?.row?.kodeall3.length <= 1 ? 'text-bold' : '' ">
                  {{ props.row?.uraian }}
                </div>
              </q-td>
              <q-td key="pagu" :props="props" class="text-right">
                <div :class="props?.row?.kodeall3.length <= 1 ? 'text-bold' : '' ">
                  {{ formattanpaRp(props.row?.totalPagu) }}
                </div>
              </q-td>
              <!-- <q-td key="realisasi" :props="props" class="text-right">
                <div>
                  {{ formattanpaRp(props.row?.totalRealisasiSebelumnya) }}
                </div>
              </q-td>
              <q-td key="realisasix" :props="props" class="text-right">
                <div>
                  {{ formattanpaRp(props.row?.totalRealisasi) }}
                </div>
              </q-td> -->
              <q-td key="totalreal" :props="props" class="text-right">
                <div :class="props?.row?.kodeall3.length <= 1 ? 'text-bold' : '' ">
                  {{ formattanpaRp(props.row?.RealisasiSemua) }}
                </div>
              </q-td>
              <q-td key="selisih" :props="props" class="text-right">
                <div :class="props?.row?.kodeall3.length <= 1 ? 'text-bold' : '' ">
                  {{ formattanpaRp(props.row?.selisih) }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </template>
      <template v-if="store.params.levels === '3'">
        <q-table
          class="my-sticky-table"
          :rows="store.kodejenis"
          :columns="columns"
          row-key="name"
          wrap-cells
          :loading="store.loading"
          :rows-per-page-options="[0]"
          hide-bottom
          :rows-number="[0]"
        >
          <template #body="props">
            <q-tr>
              <q-td key="kode" :props="props" class="text-left">
                <div :class="props?.row?.kodeall3.length <= 3 ? 'text-bold' : '' ">
                  {{ props.row?.kodeall3 }}
                </div>
              </q-td>
              <q-td key="rekening" :props="props" class="text-left">
                <div :class="props?.row?.kodeall3.length <= 3 ? 'text-bold' : '' ">
                  {{ props.row?.uraian }}
                </div>
              </q-td>
              <q-td key="pagu" :props="props" class="text-right">
                <div :class="props?.row?.kodeall3.length <= 3 ? 'text-bold' : '' ">
                  {{ formattanpaRp(props.row?.totalPagu) }}
                </div>
              </q-td>
              <!-- <q-td key="realisasi" :props="props" class="text-right">
                <div>
                  {{ formattanpaRp(props.row?.totalRealisasiSebelumnya) }}
                </div>
              </q-td>
              <q-td key="realisasix" :props="props" class="text-right">
                <div>
                  {{ formattanpaRp(props.row?.totalRealisasi) }}
                </div>
              </q-td> -->
              <q-td key="totalreal" :props="props" class="text-right">
                <div :class="props?.row?.kodeall3.length <= 3 ? 'text-bold' : '' ">
                  {{ formattanpaRp(props.row?.RealisasiSemua) }}
                </div>
              </q-td>
              <q-td key="selisih" :props="props" class="text-right">
                <div :class="props?.row?.kodeall3.length <= 3 ? 'text-bold' : '' ">
                  {{ formattanpaRp(props.row?.selisih) }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </template>
    </div>
  </div>
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { useLaporanLraLaprealisasianggaranStore } from 'src/stores/siasik/laporan/lra/laprealisasianggaran'
import { onMounted, ref } from 'vue'
import formGetdata from './FormGetdata.vue'
const store = useLaporanLraLaprealisasianggaranStore()

onMounted(() => {
  store.getDataRealisasi()
})
const tables = [
  {
    label: 'Kode Rekening',
    name: 'kode',
    field: row => [row.kodeall3],
    align: 'center'
  },
  {
    label: 'Uraian',
    name: 'rekening',
    field: row => [row.uraian],
    align: 'center',
    headerStyle: 'width: 200px;'
  },
  {
    label: 'Pagu Anggaran (Rp.)',
    name: 'pagu',
    field: row => [row.totalPagu],
    align: 'center'
  },
  // {
  //   label: 'Reaslisasi Sebelumnya (Rp.)',
  //   name: 'realisasi',
  //   field: row => [row.totalRealisasiSebelumnya],
  //   align: 'center'
  // },
  // {
  //   label: 'Reaslisasi Sekarang (Rp.)',
  //   name: 'realisasix',
  //   field: row => [row.totalRealisasi],
  //   align: 'center'
  // },
  {
    label: 'Total Realisasi (Rp.)',
    name: 'totalreal',
    field: row => [row.RealisasiSemua],
    align: 'center'
  },
  {
    label: 'Sisa Pagu (Rp.)',
    name: 'selisih',
    field: row => [row.selisih],
    align: 'center'
  }
]
// eslint-disable-next-line no-unused-vars
const columns = ref(tables)

// const jenis = [
//   {
//     label: 'Kode Rekening',
//     name: 'kode',
//     field: row => [row.kodeall3],
//     align: 'center'
//   },
//   {
//     label: 'Uraian',
//     name: 'rekening',
//     field: row => [row.uraian],
//     align: 'center',
//     headerStyle: 'width: 200px;'
//   },
//   {
//     label: 'Pagu Anggaran (Rp.)',
//     name: 'pagu',
//     field: row => [row.totalPagu],
//     align: 'center'
//   },
//   // {
//   //   label: 'Reaslisasi Sebelumnya (Rp.)',
//   //   name: 'realisasi',
//   //   field: row => [row.totalRealisasiSebelumnya],
//   //   align: 'center'
//   // },
//   // {
//   //   label: 'Reaslisasi Sekarang (Rp.)',
//   //   name: 'realisasix',
//   //   field: row => [row.totalRealisasi],
//   //   align: 'center'
//   // },
//   {
//     label: 'Total Realisasi (Rp.)',
//     name: 'totalreal',
//     field: row => [row.RealisasiSemua],
//     align: 'center'
//   },
//   {
//     label: 'Sisa Pagu (Rp.)',
//     name: 'selisih',
//     field: row => [row.selisih],
//     align: 'center'
//   }
// ]
// // eslint-disable-next-line no-unused-vars
// const columnsjenis = ref(jenis)

</script>
<style lang="scss">
.my-sticky-table{

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th{
    background-color: #000000;
    color: $white;

  }

  thead tr th{
    position: sticky;
    z-index: 1;
    font-weight: bold;
  }

  /* this will be the loading indicator */
  thead tr:last-child th{
    top: 48px;

  }
    /* height of all previous header rows */

  thead tr:first-child th{
    top: 0;
  }
  .q-td{
    font-size: 3mm;
  }
  /* prevent scrolling behind sticky top row on focus */
  tbody{
    scroll-margin-top: 48px;
    font-size: 1mm;
  }
  .q-table__bottom .q-field__native,
  .q-table__bottom .q-field__inner .q-field__control .q-anchor--skip,
  i.q-icon
   {
    color: $dark;
  }
}
</style>
