<template>
  <template v-if="store.datastp.length">
    <div class="q-pa-md full-width">
      <q-table
        class="my-sticky-table"
        wrap-cells
        :rows="store.datastp"
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
              <div v-for="it in props.row?.debit" :key="it">
                <template v-if="it.kode_lo.length">
                  <q-badge color="pink">
                    {{ it.kode_lo }}
                  </q-badge>
                </template>
                <template v-else>
                  <q-badge color="pink">
                    {{ it.kode_neraca }}
                  </q-badge>
                </template>
              </div>
              <div v-for="it in props.row?.kredit" :key="it">
                <template v-if="it.kode_neraca.length">
                  <q-badge color="lime" text-color="dark">
                    {{ it.kode_neraca }}
                  </q-badge>
                </template>
                <template v-else>
                  <div />
                </template>
              </div>
            </q-td>

            <q-td key="uraian" :props="props" class="text-left">
              <div class="text-bold">
                {{ props.row?.kegiatan }}
              </div>
              <div v-for="it in props.row?.debit" :key="it">
                <template v-if="it.kode_lo.length">
                  <q-badge color="pink">
                    {{ it.uraian_lo }}
                  </q-badge>
                </template>
                <template v-else>
                  <q-badge color="pink">
                    {{ it.uraian_neraca }}
                  </q-badge>
                </template>
              </div>
              <div v-for="it in props.row?.kredit" :key="it">
                <template v-if="it.kode_neraca.length">
                  <q-badge color="lime" text-color="dark">
                    {{ it.uraian_neraca }}
                  </q-badge>
                </template>
                <template v-else>
                  <div />
                </template>
              </div>
            </q-td>

            <q-td key="debit" :props="props" class="text-right vertical-bottom">
              <div v-for="it in props.row?.debit" :key="it">
                <q-badge color="pink">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
              <div v-for="it in props.row?.kredit" :key="it">
                <q-badge color="lime" text-color="dark">
                  {{ formattanpaRp(it.debit) }}
                </q-badge>
              </div>
            </q-td>

            <q-td key="kredit" :props="props" class="text-right vertical-bottom">
              <div v-for="it in props.row?.debit" :key="it">
                <q-badge color="pink">
                  {{ formattanpaRp(it.kredit) }}
                </q-badge>
              </div>
              <div v-for="it in props.row?.kredit" :key="it">
                <q-badge color="lime" text-color="dark">
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
    field: row => [row.debit, row.kredit]
  },
  {
    label: 'Uraian',
    name: 'uraian',
    align: 'center',
    field: row => [row.kegiatan, row.debit, row.kredit]
  },
  {
    label: 'Debit (Rp.)',
    name: 'debit',
    align: 'center',
    field: row => [row.debit, row.kredit]
  },
  {
    label: 'Kredit (Rp.)',
    name: 'kredit',
    align: 'center',
    field: row => [row.debit, row.kredit]
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
