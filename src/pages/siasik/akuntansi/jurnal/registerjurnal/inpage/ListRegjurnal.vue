<template>
  <template v-if="store.jurnals.length">
    <div class="q-pa-md full-width">
      <q-table
        class="my-sticky-table"
        wrap-cells
        :rows="store.jurnals"
        :columns="columns"
        dense
        flat bordered
        row-key="name"
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
                placeholder="Cari Nomer Transaksi..."
                debounce="0"
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
          <q-tr class="vertical-top">
            <q-td key="tgltrans" :props="props" class="text-left">
              <div class="text-bold">
                {{ props.row?.tanggal }}
              </div>
            </q-td>
            <q-td key="notrans" :props="props" class="text-left">
              <div class="text-bold">
                {{ props.row?.notrans }}
              </div>
            </q-td>
            <q-td key="koderek" :props="props" class="text-left vertical-bottom">
              <div class="row" v-for="it in props.row?.d_bendpg" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.kd_bend }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.blud" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.kd_blud }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.belanja" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.kd_belanja }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.kcair1" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.kode_cair1 }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.cairx" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.kode_cairx }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.kasbend" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.kd_kasbend }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.debit" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.kode_bast }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.kredit" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.kode_bastx }}
                </q-badge>
              </div>
            </q-td>

            <q-td key="uraian" :props="props" class="text-left vertical-bottom">
              <div class="text-bold">
                {{ props.row?.kegiatan }}
              </div>
              <div class="row" v-for="it in props.row?.d_bendpg" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.ur_bend }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.blud" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.ur_blud }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.belanja" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.urai_belanja }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.kcair1" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.uraian_cair1 }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.cairx" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.uraian_cairx }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.kasbend" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.ur_kasbend }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.debit" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-teal-6">
                  {{ it.uraian_bast }}
                </q-badge>
              </div>
              <div class="row q-pl-md" v-for="it in props.row?.kredit" :key="it">
                <q-badge color="white" class="row full-width text-weight-bold text-orange-6">
                  {{ it.uraian_bastx }}
                </q-badge>
              </div>
            </q-td>

            <q-td key="debit" :props="props" class="text-right vertical-bottom">
              <div class="row" v-for="it in props.row?.d_bendpg" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.blud" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.belanja" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.kcair1" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.cairx" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.kasbend" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div v-for="it in props.row?.debit" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div v-for="it in props.row?.kredit" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
            </q-td>

            <q-td key="kredit" :props="props" class="text-right vertical-bottom">
              <div class="row" v-for="it in props.row?.d_bendpg" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.blud" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.belanja" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.kcair1" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.cairx" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div class="row" v-for="it in props.row?.kasbend" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div v-for="it in props.row?.debit" :key="it">
                <q-badge color="teal-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div v-for="it in props.row?.kredit" :key="it">
                <q-badge color="orange-6" class="row justify-end full-width">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </template>
  <template v-else>
    <div class="row q-pa-md full-width text-subtitle1 flex-center">
      <q-icon class="q-pr-sm" size="sm" name="icon-mat-warning" />
      Silahkan Pilih Parameter Dulu
    </div>
  </template>
</template>
<script setup>
import { formattanpaRp } from 'src/modules/formatter'
import { registerJurnal } from 'src/stores/siasik/akuntansi/jurnal/regjurnal'
import { ref } from 'vue'

const store = registerJurnal()
const clearSearch = () => {
  store.reqs.q = ''
  store.goToPage(1)
}
const listRegjurnal = [
  {
    label: 'Tanggal',
    name: 'tgltrans',
    field: 'tangal',
    align: 'center'
  },
  {
    label: 'No. Transaksi',
    name: 'notrans',
    align: 'center',
    field: row => [row.notrans, row.koderek50]
  },
  {
    label: 'Kode Rekening',
    name: 'koderek',
    align: 'center',
    field: row => [row.kredit, row.d_bendpg, row.belanja, row.cairx]
  },
  {
    label: 'Uraian',
    name: 'uraian',
    align: 'center',
    field: row => [row.kegiatan, row.kredit, row.d_bendpg, row.belanja, row.cairx]
  },
  {
    label: 'Debit (Rp.)',
    name: 'debit',
    align: 'center',
    field: row => [row.kredit, row.d_bendpg, row.belanja, row.cairx]
  },
  {
    label: 'Kredit (Rp.)',
    name: 'kredit',
    align: 'center',
    field: row => [row.kredit, row.d_bendpg, row.belanja, row.cairx]
  }
]
const columns = ref(listRegjurnal)
</script>
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
