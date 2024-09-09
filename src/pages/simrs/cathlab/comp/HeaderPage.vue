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
        v-model="periode"
        dense
        outlined
        dark
        color="white"
        :options="periods"
        label="Periode"
        class="q-ml-sm"
        emit-value
        map-options
        style="min-width: 150px;"
        @update:model-value="gantiPeriode"
      />
      <q-select
        v-model="txt"
        dense
        outlined
        dark
        color="white"
        :options="txts"
        label="status pasien"
        class="q-ml-sm"
        emit-value
        map-options
        style="min-width: 150px;"
        @update:model-value="gantiTxt"
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
import { onMounted, ref } from 'vue'
import { usePermintaanCathLab } from 'src/stores/simrs/penunjang/cathlab/permintaan'
const store = usePermintaanCathLab()
const txt = ref('BELUM TERLAYANI')
const txts = ref(['SEMUA', 'BELUM TERLAYANI', 'MASIH DILAYANI', 'SUDAH TERLAYANI'])
const periode = ref(1)
const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'setPeriode', 'refresh', 'filter'])

const periods = ref([
  { value: 1, label: 'Hari ini' },
  { value: 2, label: 'Minggu Ini' },
  { value: 3, label: 'Bulan Ini' },
  { value: 4, label: 'Tahun Ini' }
])

function gantiPeriode (val) {
  // console.log('val', val)
  if (val === 1) hariIni()
  if (val === 2) mingguIni()
  if (val === 3) bulanIni()
  if (val === 4) tahunIni()

  // console.log('asasa', txt.value)
  // console.log(from.value)
  const per = {
    to: to.value,
    from: from.value,
    status: gantiStatus(txt.value)
  }
  emits('setPeriode', per)
}

function gantiStatus (val) {
  if (val === 'BELUM TERLAYANI') {
    return ''
  }
  else if (val === 'SUDAH TERLAYANI') {
    return '1'
  }
  else if (val === 'MASIH DILAYANI') {
    return '2'
  }
  else {
    return 'all'
  }
}

function hariIni () {
  const cDate = new Date()
  to.value = dateDbFormat(cDate)
  from.value = dateDbFormat(cDate)
  // store.getData()
}
function mingguIni () {
  const curr = new Date()
  const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
  const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))

  to.value = dateDbFormat(firstday)
  from.value = dateDbFormat(lastday)
  // store.getData()
}
function bulanIni () {
  const curr = new Date()
  const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
  const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'

  to.value = dateDbFormat(firstday)
  from.value = dateDbFormat(lastday)
  // store.getData()
}

function tahunIni () {
  const curr = new Date()
  const firstday = date.formatDate(curr, 'YYYY') + '-01' + '-01'
  const lastday = date.formatDate(curr, 'YYYY') + '-12' + '-31'

  to.value = dateDbFormat(firstday)
  from.value = dateDbFormat(lastday)
  // store.getData()
}

function gantiTxt () {
  gantiPeriode(periode.value)
  // console.log('dadada', periode.value)
}

onMounted(() => {
  store.getData()
})
</script>
