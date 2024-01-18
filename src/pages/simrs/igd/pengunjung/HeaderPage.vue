<template>
  <div class="row justify-between items-center q-pa-sm">
    <div class="row items-center">
      <div>
        <q-input
          v-model="store.params.q"
          placeholder="Cari Pasien ..."
          dense
          outlined
          dark
          color="white"
          style="min-width:200px"
          debounce="800"
          :loading="store.loading"
          @update:model-value="store.search"
        >
          <template #prepend>
            <q-icon name="icon-mat-search" />
          </template>
        </q-input>
      </div>
      <q-select
        v-model="store.periode"
        dense
        outlined
        dark
        color="white"
        :options="store.periods"
        label="Periode"
        class="q-ml-sm"
        emit-value
        map-options
        style="min-width: 150px;"
        @update:model-value="gantiPeriode"
      />
    </div>
    <div>
      <q-btn
        class="q-ml-sm"
        unelevated
        color="orange"
        flat
        size="sm"
        padding="xs"
        icon="icon-mat-refresh"
        @click="store.refresh"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Refresh Data
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<script setup>
import { date } from 'quasar'
import { dateDbFormat } from 'src/modules/formatter'
import { onMounted } from 'vue'
import { usePengunjungIgdStore } from 'src/stores/simrs/igd/pengunjung'
const store = usePengunjungIgdStore()

function gantiPeriode(val) {
  console.log('val', val)
  if (val === 'Hari Ini') hariIni()
  if (val === 'Minggu Ini') mingguIni()
  if (val === 'Bulan Ini') bulanIni()
}
function hariIni() {
  const cDate = new Date()
  store.setParams('to', dateDbFormat(cDate))
  store.setParams('from', dateDbFormat(cDate))
  store.getData()
}
function mingguIni() {
  const curr = new Date()
  const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
  const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))

  store.setParams('from', dateDbFormat(firstday))
  store.setParams('to', dateDbFormat(lastday))
  store.getData()
}
function bulanIni() {
  const curr = new Date()
  const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
  const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'

  store.setParams('from', dateDbFormat(firstday))
  store.setParams('to', dateDbFormat(lastday))
  store.getData()
}
onMounted(() => {
  hariIni()
})
</script>
