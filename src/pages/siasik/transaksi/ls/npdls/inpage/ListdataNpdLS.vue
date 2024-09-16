<template>
  <template v-if="store.datanpd">
    <div class="justify-content-center">
      <q-table
        class="my-sticky-table"
        :rows="store.datanpd"
        :columns="columnsnpd"
        row-key="name"
        dense
        flat bordered
        wrap-cells
        :filter="store.reqs.q"
        :loading="store.loading"
        :rows-per-page-options="[10,50,100]"
      >
        <template #loading>
          <q-inner-loading showing color="warning" />
        </template>
        <template #top-left>
          <div class="flex q-qutter-sm z-top">
            <div>
              <q-input
                v-model="store.reqs.q"
                outlined
                dark
                color="warning"
                dense
                placeholder="Cari NPD-LS ..."
                debounce="500"
                style="min-width: 300px;"
              >
                <template
                  v-if="store.reqs.q"
                  #append
                >
                  <q-icon
                    name="icon-mat-close"
                    size="xs"
                    class="cursor-pointer"
                    @click.stop.prevent="clearSearch"
                  />
                </template>
                <template #prepend>
                  <q-icon
                    size="sm"
                    name="icon-mat-search"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </template>

        <template #body="props">
          <q-tr>
            <q-td key="nonpdls" :props="props" class="text-left">
              <div>{{ props.row?.nonpdls }}</div>
              <q-td key="total">
                <q-badge color="green" @click="onRowClick(props.row)">
                  {{ formatRpDouble(props.row?.total) }}
                </q-badge>
              </q-td>
            </q-td>
            <q-td key="tglnpdls" :props="props" class="text-left">
              {{ props.row?.tglnpdls }}
            </q-td>
            <q-td key="pptk" :props="props" class="text-left">
              <div>{{ props.row?.bidang }}</div>
              <q-badge color="pink">
                {{ props.row?.pptk }}
              </q-badge>
            </q-td>
            <q-td key="kegiatanblud" :props="props" class="text-left">
              {{ props.row?.kegiatanblud }}
            </q-td>
            <q-td key="penerima" :props="props" class="text-left">
              {{ props.row?.penerima }}
            </q-td>
            <q-td key="keterangan" :props="props" class="text-left wrap-cells">
              <div>
                {{ props.row?.keterangan }}
              </div>
            </q-td>
            <q-td key="nopencairan" :props="props" class="text-left wrap-cells">
              <div>
                Pencairan Tanggal {{ props.row?.tglcair }}
              </div>
              <q-badge>
                {{ props.row?.nopencairan }}
              </q-badge>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
</template>

<script setup>

// eslint-disable-next-line no-unused-vars
import { formatRpDouble } from 'src/modules/formatter'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { onMounted, ref } from 'vue'

const store = formNotaPermintaanDanaLS()

onMounted(() => {
  // carisrt.resetFORM()
  // onReset()
  store.listdatanpd()
})
// eslint-disable-next-line no-unused-vars
const clearSearch = () => {
  store.reqs.q = ''
  store.goToPage(1)
}
const listnpdls = [
  {
    label: 'No NPD-LS',
    name: 'nonpdls',
    field: row => [row.nonpdls, row.total],
    align: 'center',
    headerStyle: 'width: 200px;'
  },
  // {
  //   name: 'total',
  //   field: 'total',
  //   headerStyle: 'width: 200px;'
  // },
  {
    label: 'Tanggal',
    name: 'tglnpdls',
    align: 'center',
    field: 'tglnpdls',
    sortable: true,
    headerStyle: 'width: 90px;'
  },
  {
    label: 'Bidang',
    name: 'pptk',
    align: 'center',
    field: row => [row.pptk, row.bidang]
  },
  {
    label: 'Kegiatan BLUD',
    name: 'kegiatanblud',
    align: 'center',
    field: 'kegiatanblud',
    headerStyle: 'width: 200px;'
  },
  {
    label: 'Pihak Ketiga',
    name: 'penerima',
    align: 'center',
    field: 'penerima'
  },
  {
    label: 'Keterangan',
    name: 'keterangan',
    align: 'center',
    field: 'keterangan',
    headerStyle: 'width: 300px;'
  },
  {
    label: 'Status',
    name: 'nopencairan',
    align: 'center',
    field: row => [row.nopencairan, row.tglcair],
    headerStyle: 'width: 300px;'
  }
]
const columnsnpd = ref(listnpdls)

const onRowClick = (row) =>
  alert([row?.nopencairan, row?.total])

</script>

<!-- <style lang="scss">
.my-sticky-header {
  /* height or max-height is important */
  height: 510px;

  tr:first-child th {
    background-color: $dark;
    color: $white;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    height:fit-content;
    font-weight: bold;
    border-width: 0.5px;
    border-style: dotted;
  }

  //   /* bg color is important for th; just specify one */

  thead tr th{
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th{
    top: 0;
  }
  .q-td{
    font-size: 3mm;
    border-width: 0.5px;
    border-style:dotted;
  }
  // /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th{
    /* height of all previous header rows */
    top: 48px
  }
  // /* prevent scrolling behind sticky top row on focus */
  tbody{
    /* height of all previous header rows */
    scroll-margin-top: 100px !important;

  }

  .q-table__bottom .q-field__native,
  .q-table__bottom .q-field__inner .q-field__control .q-anchor--skip,
  i.q-icon
   {
    color: $grey-4;
  }

}
</style> -->

<style lang="scss">
.my-sticky-table{
  height: 510px;

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
    color: $white;
  }
}
</style>
