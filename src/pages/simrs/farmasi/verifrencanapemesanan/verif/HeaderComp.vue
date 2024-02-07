<template>
  <div class="column">
    <div class="row justify-between items-center q-pa-sm bg-primary text-white">
      <div class="kiri row q-gutter-sm items-center">
        <q-input
          v-model="search"
          outlined
          dark
          color="white"
          dense
          :label="labelCari"
          debounce="500"
          style="min-width: 250px;"
          @keyup.enter="enterSearch"
        >
          <template
            v-if="props?.search"
            #append
          >
            <q-icon
              name="icon-mat-close"
              size="xs"
              class="cursor-pointer"
              @click.stop.prevent="enterSearch('')"
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
        <q-option-group
          v-model="toFlag"
          :options="flagOptions"
          color="primary"
          class="q-ml-sm"
          dense
          type="checkbox"
          inline
        />
      </div>
      <div class="kanan">
        <!-- refresh Ids -->
        <q-btn
          v-if="props.adaRefresh"
          unelevated
          round
          size="sm"
          icon="icon-mat-refresh"
          @click="emits('refresh')"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Refresh Table
          </q-tooltip>
        </q-btn>
        <!-- per page -->
        <q-btn
          v-if="props.adaPerPage"
          class="q-ml-sm"
          unelevated
          color="orange"
          round
          size="sm"
          icon="icon-mat-layers"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Filter Table
          </q-tooltip>
          <q-menu
            transition-show="flip-left"
            transition-hide="flip-right"
            class="q-pt-sm"
            anchor="top left"
            self="top right"
          >
            <q-list>
              <q-item
                v-for="(opt, i) in options"
                :key="i"
                v-ripple
                tag="label"
              >
                <q-item-section>
                  <q-radio
                    v-model="selectPerPage"
                    size="xs"
                    :val="opt"
                    :label="opt + ' Baris'"
                    color="primary"
                  />
                </q-item-section>
                <q-item-label />
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!-- style -->
        <q-btn
          v-if="useFull"
          flat
          :icon="!style.componentfull ? 'icon-mat-open_in_full' : 'icon-mat-close_fullscreen'"
          round
          :color="style.componentfull ? 'green' : 'white'"
          size="12px"
          class="q-ml-md"
          @click="style.setComponentFull"
        >
          <q-tooltip
            class="primary"
            :offset="[10, 10]"
          >
            Full Screen
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStyledStore } from 'src/stores/app/styled'
import { dateDbFormat } from 'src/modules/formatter'
import { date } from 'quasar'

const style = useStyledStore()
const emits = defineEmits(['cari', 'refresh', 'setPerPage', 'setFlag', 'setPeriode'])
const props = defineProps({
  search: { type: String, default: '' },
  labelCari: { type: String, default: 'Cari ...' },
  adaPerPage: { type: Boolean, default: false },
  adaRefresh: { type: Boolean, default: false },
  useFull: { type: Boolean, default: false },
  perPage: { type: Number, default: 5 },
  flag: { type: Array, default: () => ['1'] }
})

function enterSearch(evt) {
  const val = evt?.target?.value
  emits('cari', val)
}
const options = ref([5, 10, 20, 50, 100])
const selectPerPage = computed({
  get () {
    return props.perPage
  },
  set (val) {
    emits('setPerPage', val)
  }
})
const search = computed({
  get () {
    return props.search
  },
  set (newVal) {
    emits('cari', newVal)
  }
})
// flag
const flagOptions = ref([
  { label: 'Direncanakan', value: '1' },
  { label: 'Diverifikasi', value: '2' },
  { label: 'Selesai', value: '3' }
])
const toFlag = computed({
  get () {
    return props.flag
  },
  set (newVal) {
    emits('setFlag', newVal)
  }
})

// periode
const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))
const periode = ref(1)
const periods = ref([
  { value: 1, label: 'Hari ini' },
  { value: 2, label: 'Minggu Ini' },
  { value: 3, label: 'Bulan Ini' }
  // { value: 4, label: 'Tahun Ini' }
])

function hariIni() {
  const cDate = new Date()
  to.value = dateDbFormat(cDate)
  from.value = dateDbFormat(cDate)
}
function mingguIni() {
  const curr = new Date()
  const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
  const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
  from.value = dateDbFormat(firstday)
  to.value = dateDbFormat(lastday)
}
function bulanIni() {
  const curr = new Date()
  const firstday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-01'
  const lastday = date.formatDate(curr, 'YYYY') + '-' + date.formatDate(curr, 'MM') + '-31'
  from.value = dateDbFormat(firstday)
  to.value = dateDbFormat(lastday)
}

function gantiPeriode(val) {
  if (val === 1) {
    hariIni()
  } else if (val === 2) {
    mingguIni()
  } else if (val === 3) {
    bulanIni()
  }

  const per = {
    to: to.value,
    from: from.value
  }
  emits('setPeriode', per)
}
onMounted(() => {
  hariIni()
})
</script>
