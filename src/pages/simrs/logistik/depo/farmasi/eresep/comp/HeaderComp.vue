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
          style="min-width: 200px;"
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
        <q-select
          v-model="toFlag"
          dense
          outlined
          dark
          color="white"
          :options="flagOptions"
          label="Status"
          class="q-ml-sm"
          emit-value
          map-options
          style="min-width: 150px;"
        />
        <q-select
          v-if="ruang==='Gd-05010101'"
          v-model="tipeResep"
          dense
          outlined
          dark
          color="white"
          :options="tipeOptions"
          label="Tipe Resep"
          class="q-ml-sm"
          emit-value
          map-options
          style="min-width: 150px;"
        />
        <q-select
          v-model="group"
          dense
          outlined
          dark
          color="white"
          :options="groups"
          option-label="nama"
          option-value="value"
          label="Group Sistembayar"
          class="q-ml-sm"
          emit-value
          map-options
          style="min-width: 150px;"
          @update:model-value="setGroupSistembayar"
        />
        <q-select
          v-if="group"
          v-model="sistembayar"
          dense
          outlined
          dark
          color="white"
          :options="sistemBayars"
          option-label="nama"
          option-value="kode"
          label="Sistembayar"
          class="q-ml-sm"
          emit-value
          map-options
          style="min-width: 150px;"
          @update:model-value="setSistembayar"
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
import { useAplikasiStore } from 'src/stores/app/aplikasi';

const style = useStyledStore()
const emits = defineEmits(['cari', 'refresh', 'setPerPage', 'setFlag', 'setPeriode', 'setTipe','setSistembayar'])
const props = defineProps({
  ruang: { type: String, default: '' },
  search: { type: String, default: '' },
  labelCari: { type: String, default: 'Cari ...' },
  adaPerPage: { type: Boolean, default: false },
  adaRefresh: { type: Boolean, default: false },
  useFull: { type: Boolean, default: false },
  perPage: { type: Number, default: 5 },
  flag: { type: String, default: '1' },
  tipe: { type: String, default: '' }
})
// filter sistem bayar start ---
const group=ref(null)
const groups=ref([  
  {nama:'Semua', value:null},
  {nama:'JKN', value:'1'},
  {nama:'Mandiri', value:'2'},
  {nama:'Tagihan', value:'3'},
])
const app=useAplikasiStore()
const sistemBayars=computed(()=>{
  return app?.sistemBayars?.filter(a=>a?.groups===group.value)
})
const sistembayar =ref(null)
function setGroupSistembayar(val){
  // console.log('set', val);
  sistembayar.value=null
  if(!val) emits('setSistembayar',null)
  else if(val==='2') {
    sistembayar.value='UMUM'
    emits('setSistembayar','UMUM')
  }
}
function setSistembayar(val){
  // console.log('sistem', val);
  emits('setSistembayar',val)
  
}
// filter sistem bayar end ---

function enterSearch (evt) {
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
  { label: 'Belum Dikirimkan', value: '' },
  { label: 'Belum Diterima', value: '1' },
  { label: 'Siap Dikerjakan', value: '2' },
  { label: 'Selesai', value: '3' },
  { label: 'Returned', value: '4' },
  { label: 'Ditolak', value: '5' },
  { label: 'Semua', value: 'semua' }
])
const toFlag = computed({
  get () {
    return props.flag
  },
  set (newVal) {
    emits('setFlag', newVal)
  }
})
// iter
const tipeOptions = ref([
  { label: 'semua', value: '' },
  { label: 'Normal', value: 'normal' },
  { label: 'PRB', value: 'prb' },
  { label: 'Iter', value: 'iter' }
])
const tipeResep = computed({
  get () {
    return props.tipe
  },
  set (newVal) {
    emits('setTipe', newVal)
  }
})

// periode
const to = ref(dateDbFormat(new Date()))
const from = ref(dateDbFormat(new Date()))
const periode = ref(1)
const periods = ref([
  { value: 1, label: 'Hari ini' },
  { value: 2, label: 'Minggu Ini' },
  { value: 3, label: 'Bulan Ini' },
  { value: 4, label: 'Bulan Lalu' },
  { value: 5, label: 'Dua Bulan Lalu' }
  // { value: 6, label: 'Tahun Ini' }
])

function hariIni () {
  const cDate = new Date()
  to.value = dateDbFormat(cDate)
  from.value = dateDbFormat(cDate)
}
function mingguIni () {
  const curr = new Date()
  const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
  const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6))
  from.value = dateDbFormat(firstday)
  to.value = dateDbFormat(lastday)
}
function bulanIni () {
  const curr = new Date()
  const firstday = date.formatDate(curr, 'YYYY-MM-01')
  const lastday = date.formatDate(curr, 'YYYY-MM-31')
  from.value = firstday
  to.value = lastday
}
function bulanLalu () {
  const newDate = new Date()
  const curr = date.subtractFromDate(newDate, { months: 1 })
  const firstday = date.formatDate(curr, 'YYYY-MM-01')
  const lastday = date.formatDate(curr, 'YYYY-MM-31')
  from.value = firstday
  to.value = lastday
}
function duaBulanLalu () {
  const newDate = new Date()
  const curr = date.subtractFromDate(newDate, { months: 2 })
  const firstday = date.formatDate(curr, 'YYYY-MM-01')
  const lastday = date.formatDate(curr, 'YYYY-MM-31')
  from.value = firstday
  to.value = lastday
}

function gantiPeriode (val) {
  if (val === 1) {
    hariIni()
  }
  else if (val === 2) {
    mingguIni()
  }
  else if (val === 3) {
    bulanIni()
  }
  else if (val === 4) {
    bulanLalu()
  }
  else if (val === 5) {
    duaBulanLalu()
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
