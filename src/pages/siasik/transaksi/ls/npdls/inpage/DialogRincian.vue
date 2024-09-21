<template>
  <q-dialog
    class="full-width q-mt-lg"
    @hide="hiddenDialog()"
    backdrop-filter="blur(4x)"
    persistent
  >
    <q-card style="min-width:50vw;">
      <q-card-section class="row items-center">
        <div class="column">
          <div class="f-14 text-weight-bold">
            Rincian NPD-LS
          </div>
          <div class="f-10">
            Rincian Nota Permintaan Dana Langsung
          </div>
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="icon-mat-clear"
          flat
          round
          dense
        />
      </q-card-section>
      <q-card-section>
        <q-table
          :rows="store.reqs.listrinci"
          :columns="columns"
          row-key="name"
          hide-pagination
          wrap-cells
          :disable="store.loading"
          :loading="store.loading"
        >
          <template #body="props">
            <q-tr>
              <q-td key="rincian" :props="props">
                <q-badge color="green">
                  {{ props.row?.koderek50 }}
                </q-badge>
                <div>{{ props.row?.rincianbelanja }}</div>
              </q-td>
              <q-td key="item" :props="props">
                <q-badge color="green">
                  {{ props.row?.koderek108 }}
                </q-badge>
                <div>{{ props.row?.itembelanja }}</div>
              </q-td>
              <q-td key="rinci" :props="props">
                <q-badge color="green">
                  Vol : {{ props.row?.volumels }} |
                  Harga : {{ formattanpaRp(props.row?.hargals) }}
                </q-badge>
                <div class="q-pa-xs">
                  <q-separator />
                </div>
                <q-badge size="18px" color="yellow" class="text-bold text-dark">
                  Jumlah : {{ formattanpaRp(props.row?.nominalpembayaran) }}
                </q-badge>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>

import { formattanpaRp } from 'src/modules/formatter'
import { formNotaPermintaanDanaLS } from 'src/stores/siasik/transaksi/ls/npdls/formnpdls'
import { ref } from 'vue'

const store = formNotaPermintaanDanaLS()

function hiddenDialog () {
  console.log('hidden dialog')
}
const rincinpd = [
  {
    label: 'Uraian Rekening 50',
    name: 'rincian',
    field: row => [row.rincianbelanja, row.koderek50]
  },
  {
    label: 'Item Belanja',
    name: 'item',
    field: row => [row.itembelanja, row.koderek108]
  },
  {
    label: 'Rincian',
    name: 'rinci',
    field: row => [row.volumels, row.hargals, row.nominalpembayaran]
  }
]
const columns = ref(rincinpd)
</script>
