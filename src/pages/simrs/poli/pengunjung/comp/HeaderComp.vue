<template>
  <div
    class="row items-center justify-between q-pa-sm"
    :class="`${color} text-${textColor}`"
  >
    <div
      v-if="!custom"
      class="row"
    >
      <q-input
        v-model="q"
        outlined
        dark
        color="white"
        dense
        placeholder="Cari Kunjungan ..."
        debounce="500"
        style="min-width: 200px;"
      >
        <template
          v-if="q"
          #append
        >
          <q-icon
            name="icon-mat-close"
            size="xs"
            class="cursor-pointer"
            @click.stop.prevent="q = ''"
          />
        </template>
        <template #prepend>
          <q-icon
            size="sm"
            name="icon-mat-search"
          />
        </template>
      </q-input>
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
      <q-select
        v-model="poli"
        dense
        outlined
        dark
        color="white"
        :options="polis"
        label="Pilih Poli"
        class="q-ml-sm"
        emit-value
        map-options
        option-value="kodepoli"
        option-label="polirs"
        style="min-width: 250px;"
        @update:model-value="gantiPoli"
      />
    </div>
    <div v-else>
      <q-btn
        label="Kembali Ke Normal Filter"
        icon="icon-mat-keyboard_arrow_left"
        color="white"
        flat
        @click="kembaliNormal"
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
        @click="emits('refresh')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Refresh Data
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        dense
        :color="textColor"
        icon="icon-mat-dashboard"
        size="sm"
        class="q-mx-sm"
        @click="emits('filter')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Filter Data
        </q-tooltip>
      </q-btn>

      <!-- fullscreen -->
      <q-btn
        flat
        :color="textColor"
        :icon="!full?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        size="xs"
        padding="xs"
        @click="emits('fullscreen')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Fullscreen
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import { date } from 'quasar'
import { dateDbFormat } from 'src/modules/formatter'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { computed, onMounted, ref } from 'vue'
const txt = ref('BELUM TERLAYANI')
const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
const poli = ref(['SEMUA'])
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'refresh', 'setPeriode', 'filter', 'normal', 'setPoli'])
const periods = ref([
  { value: 1, label: 'Hari ini' },
  { value: 2, label: 'Minggu Ini' },
  { value: 3, label: 'Bulan Ini' }
  // { value: 4, label: 'Tahun Ini' }
])

const setting = useSettingsAplikasi()

const periode = ref(1)
// const options = ref([5, 10, 20, 50, 100])
const props = defineProps({
  color: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'white'
  },
  search: {
    type: String,
    default: ''
  },
  perPage: { type: Number, default: 10 },
  tanggal: {
    type: String,
    default: dateDbFormat(new Date())
  },
  full: { type: Boolean, default: false },
  custom: { type: Boolean, default: false }
})
const q = computed({
  get() {
    return props.search
  },
  set(newVal) {
    emits('setSearch', newVal)
  }
})

const polis = computed(() => {
  const arr = setting.polis
  arr.unshift({
    kodepoli: 'SEMUA',
    polirs: 'SEMUA'
  })
  return setting.polis
})

const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))

function hariIni() {
  const cDate = new Date()
  to.value = dateDbFormat(cDate)
  from.value = dateDbFormat(cDate)
}
function mingguIni() {
  const curr = new Date()
  const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
  const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
  to.value = dateDbFormat(firstday)
  from.value = dateDbFormat(lastday)
}
function bulanIni() {
  const curr = new Date()
  const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
  const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
  to.value = dateDbFormat(firstday)
  from.value = dateDbFormat(lastday)
}

function tahunIni() {
  const curr = new Date()
  const firstday = date.formatDate(curr, 'YYYY') + '-01' + '-01'
  const lastday = date.formatDate(curr, 'YYYY') + '-12' + '-31'
  to.value = dateDbFormat(firstday)
  from.value = dateDbFormat(lastday)
}

function gantiStatus(val) {
  if (val === 'BELUM TERLAYANI') {
    return ''
  } else if (val === 'TERLAYANI') {
    return '1'
  } else {
    return 'all'
  }
}

function gantiTxt() {
  gantiPeriode(periode.value)
}

function gantiPeriode(val) {
  if (val === 1) {
    hariIni()
  } else if (val === 2) {
    mingguIni()
  } else if (val === 3) {
    bulanIni()
  } else {
    tahunIni()
  }

  console.log(to.value)
  console.log(from.value)
  const per = {
    to: to.value,
    from: from.value,
    status: gantiStatus(txt.value)
  }
  emits('setPeriode', per)
}

function gantiPoli(val) {
  let kirim = poli.value
  if (val === 'SEMUA') {
    kirim = setting.polis.map(x => x.kodepoli) ?? []
  } else {
    kirim = val
  }

  emits('setPoli', kirim)
}

function kembaliNormal() {
  periode.value = 1
  txt.value = 'BELUM TERLAYANI'
  gantiPeriode(periode.value)
  emits('normal')
}

onMounted(() => {
  hariIni()
})
</script>
