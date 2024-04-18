<template>
  <div
    class="row items-center justify-between q-pa-sm"
    :class="`${color} text-${textColor}`"
  >
    <div class="row">
      <q-input
        v-model="q"
        outlined
        dark
        color="white"
        dense
        placeholder="Cari Kunjungan ..."
        debounce="500"
      />
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
      <!-- <q-btn
        flat
        :color="textColor"
        icon-right="icon-mat-event"
        :label="tanggal"
        size="sm"
        padding="xs"
        class="q-mr-sm"
      >
        <q-popup-proxy ref="popup">
          <q-date

            v-model="dateX"
            minimal
            mask="YYYY-MM-DD"
            @update:model-value="lihatRef"
          />
        </q-popup-proxy>
      </q-btn> -->
      <!-- <q-btn
        flat
        :color="textColor"
        icon-right="icon-mat-dataset"
        :label="txt"
        size="sm"
        padding="xs"
        class="q-mr-sm"
      >
        <q-menu
          transition-show="flip-left"
          transition-hide="flip-right"
          :offset="[0,10]"
        >
          <q-list style="min-width: 150px">
            <q-item
              v-for="(item, i) in txts"
              :key="i"
              v-close-popup
              clickable
              :class="item===txt?'bg-secondary text-white':''"
              @click="txt=item"
            >
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
            <q-separator />
          </q-list>
        </q-menu>
      </q-btn> -->

      <!-- per_page -->
      <q-btn
        flat
        :color="textColor"
        icon="icon-mat-dashboard"
        size="xs"
        padding="xs"
        @click="emits('filter')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Filter
        </q-tooltip>
      </q-btn>
      <q-btn
        flat
        color="orange"
        icon="icon-mat-refresh"
        size="xs"
        padding="xs"
        @click="emits('refresh')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Refresh
        </q-tooltip>
      </q-btn>
      <q-btn
        class="q-ml-sm"
        unelevated
        color="orange"
        flat
        size="sm"
        padding="xs"
        icon="icon-mat-layers"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          per Baris List
        </q-tooltip>
        <q-menu
          transition-show="flip-left"
          transition-hide="flip-right"
          anchor="top left"
          self="top right"
        >
          <q-list dense>
            <q-item
              v-for="(opt, i) in options"
              :key="i"
              v-ripple
              tag="label"
            >
              <q-radio
                v-model="selectPerPage"
                size="xs"
                :val="opt"
                :label="opt + ' Baris'"
                color="primary"
              />
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <!-- fullscreen -->
      <q-btn
        flat
        :color="textColor"
        :icon="!fullscreen?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
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
import { dateDbFormat } from 'src/modules/formatter'
import { date } from 'quasar'
import { computed, onMounted, ref } from 'vue'
const txt = ref('BELUM TERLAYANI')
const txts = ref(['SEMUA', 'BELUM TERLAYANI', 'MASIH DILAYANI', 'SUDAH TERLAYANI'])
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'setPeriode', 'refresh', 'filter'])
const options = ref([5, 10, 20, 50, 100])
const periods = ref([
  { value: 1, label: 'Hari ini' },
  { value: 2, label: 'Minggu Ini' },
  { value: 3, label: 'Bulan Ini' },
  { value: 4, label: 'Tahun Ini' }
])

const periode = ref(1)
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
  fullscreen: { type: Boolean, default: false }
})

// const popup = ref()

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
  } else if (val === 'SUDAH TERLAYANI') {
    return '1'
  } else if (val === 'MASIH DILAYANI') {
    return '2'
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

onMounted(() => {
  hariIni()
})

// function lihatRef() {
//   popup.value.hide()
// }
const selectPerPage = computed({
  get () {
    return props.perPage
  },
  set (val) { emits('setRow', val) }
})
// const dateX = computed({
//   get() {
//     return props.tanggal
//   },
//   set(newVal) {
//     emits('setTanggal', newVal)
//   }
// })
const q = computed({
  get() {
    return props.search
  },
  set(newVal) {
    emits('setSearch', newVal)
  }
})
</script>
