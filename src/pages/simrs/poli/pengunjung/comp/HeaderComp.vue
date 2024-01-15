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
      <q-btn-dropdown
        class="glossy q-ml-sm"
        color="orange"
        :label="poli?.polirs"
      >
        <q-list>
          <q-item
            v-for="row in polis"
            :key="row"
            v-close-popup
            clickable
            @click="gantiPoli(row)"
          >
            <q-item-section avatar>
              <q-avatar
                icon="icon-mat-medical_information"
                color="primary"
                text-color="white"
                size="sm"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ row?.polirs }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
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
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { usePengunjungPoliStore } from 'src/stores/simrs/pelayanan/poli/pengunjung'
import { useSettingsAplikasi } from 'src/stores/simrs/settings'
import { computed, onMounted, ref } from 'vue'

const txt = ref('BELUM TERLAYANI')
const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
const poli = ref({
  kodepoli: 'SEMUA POLI',
  polirs: 'SEMUA POLI'
})
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'refresh', 'setPeriode', 'filter', 'normal', 'setPoli'])
const periods = ref([
  { value: 1, label: 'Hari ini' },
  { value: 2, label: 'Minggu Ini' },
  { value: 3, label: 'Bulan Ini' }
  // { value: 4, label: 'Tahun Ini' }
])

const setting = useSettingsAplikasi()
const store = usePengunjungPoliStore()
const app = useAplikasiStore()
const periode = ref(1)

onMounted(() => {
  setting.getHeaderPoli().then(() => {
    poli.value = polis.value[0] ?? [{
      kodepoli: 'SEMUA POLI',
      polirs: 'SEMUA POLI'
    }]
    const params = {
      page: 1,
      q: '',
      status: '',
      to: dateDbFormat(new Date()),
      from: dateDbFormat(new Date()),
      per_page: 100,
      kodepoli: poli.value?.kodepoli === 'SEMUA POLI' ? polis.value.map(x => x?.kodepoli) : [poli.value?.kodepoli ?? '']
    }
    // console.log('init poli', poli.value)
    // console.log('init pengunjung', params)
    store.init(params)
  })
})
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
  const aksesruangan = app.user?.pegawai?.kdruangansim
  let arr = []
  if (aksesruangan === '' || aksesruangan === null) {
    arr = setting.polis
  } else {
    const split = aksesruangan.split('|')
    const res = []
    for (let i = 0; i < split.length; i++) {
      const kd = split[i]
      res.push(setting.polis.filter(x => x.kodepoli === kd)[0])
    }

    arr = res ?? []
    // console.log('asdas', arr)
  }

  arr?.push({
    kodepoli: 'SEMUA POLI',
    polirs: 'SEMUA POLI'
  })
  return arr
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

  // console.log(to.value)
  // console.log(from.value)
  const per = {
    to: to.value,
    from: from.value,
    status: gantiStatus(txt.value)
  }
  emits('setPeriode', per)
}

function gantiPoli(val) {
  poli.value = val
  const sendt = poli.value?.kodepoli === 'SEMUA POLI' ? polis.value?.map(x => x?.kodepoli) : [poli.value?.kodepoli ?? '']
  console.log(sendt)
  emits('setPoli', sendt)
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
