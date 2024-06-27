<template>
  <div
    class="row items-center justify-between q-pa-sm"
    :class="`${color} text-${textColor}`"
  >
    <div>
      <div class="row">
        <q-input
          v-model="q"
          outlined
          dark
          color="white"
          dense
          placeholder="Cari ..."
          debounce="500"
        />
        <app-autocomplete
          v-model="yearSelected"
          :source="years"
          label="Pilih tahun"
          class="q-ml-sm"
          outlined
          dark
          @update:model-value="gantiTahun"
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
      </div>
    </div>
    <div>
      <q-btn
        v-if="adaTanggal"
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

            v-model="tgl"
            minimal
            mask="YYYY-MM-DD"
            @update:model-value="lihatRef"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn
        v-if="adaFilter"
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
      </q-btn>
      <!-- Tutup -->
      <!-- <q-btn
        v-if="!tutup"
        class="q-mx-md"
        push
        color="orange"
        size="sm"
        padding="xs"
        no-caps
        label="Tutup Opname"
        :loading="loadingTutup"
        @click="emits('tutupOpname')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Tutup Stok Opname
        </q-tooltip>
      </q-btn> -->
      <!-- add -->
      <!-- <q-btn
        v-if="!tutup"
        push
        color="green"
        icon="icon-mat-add"
        size="xs"
        padding="xs"
        @click="emits('add')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Tambah Data
        </q-tooltip>
      </q-btn> -->
      <!-- refresh -->
      <q-btn
        class="q-ml-sm"
        flat
        :color="textColor"
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
      <!-- per_page -->
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
              <!-- <q-item-section> -->
              <q-radio
                v-model="selectPerPage"
                size="xs"
                :val="opt"
                :label="opt + ' Baris'"
                color="primary"
              />
              <!-- </q-item-section> -->
              <!-- <q-item-label /> -->
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <!-- Print stok -->
      <q-btn
        class="q-mx-sm"
        round
        color="dark"
        icon="icon-mat-print"
        size="sm"
        padding="xs"
        @click="emits('print')"
      >
        <q-tooltip
          class="primary"
          :offset="[10, 10]"
        >
          Print
        </q-tooltip>
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
import { date } from 'quasar'
import { dateDbFormat } from 'src/modules/formatter'
import { computed, onMounted, ref } from 'vue'
const txt = ref('SEMUA')
const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'refresh', 'add', 'setPeriode', 'tutupOpname', 'print'])
const options = ref([5, 10, 20, 50, 100])
const props = defineProps({
  adaTanggal: {
    type: Boolean,
    default: false
  },
  adaFilter: {
    type: Boolean,
    default: false
  },
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
  year: {
    type: String,
    default: ''
  },
  perPage: { type: Number, default: 10 },
  tanggal: {
    type: String,
    default: dateDbFormat(new Date())
  },
  fullscreen: { type: Boolean, default: false },
  tutup: { type: Boolean, default: false },
  loadingTutup: { type: Boolean, default: false }
})

const popup = ref()

function lihatRef () {
  console.log(popup.value)
  popup.value.hide()
}
const selectPerPage = computed({
  get () { return props.perPage },
  set (val) { emits('setRow', val) }
})
const tgl = computed({
  get () {
    return props.tanggal
  },
  set (newVal) {
    emits('setTanggal', newVal)
  }
})
const q = computed({
  get () {
    return props.search
  },
  set (newVal) {
    emits('setSearch', newVal)
  }
})

const years = ref([])
const yearSelected = ref(date.formatDate(Date.now(), 'YYYY'))
const periode = ref()
const periods = ref([])
function gantiPeriode (val) {
  console.log('ganti', val)
  // if (val === 1) {
  //   hariIni()
  // } else if (val === 2) {
  //   mingguIni()
  // } else if (val === 3) {
  //   bulanIni()
  // }

  // const per = {
  //   to: to.value,
  //   from: from.value
  // }
  emits('setPeriode', val?.eom)
}
function gantiTahun () {
  const bu = [
    { mth: 1, val: 0, label: 'Januari', eom: '' },
    { mth: 2, val: 1, label: 'Pebruari', eom: '' },
    { mth: 3, val: 2, label: 'Maret', eom: '' },
    { mth: 4, val: 3, label: 'April', eom: '' },
    { mth: 5, val: 4, label: 'Mei', eom: '' },
    { mth: 6, val: 5, label: 'Juni', eom: '' },
    { mth: 7, val: 6, label: 'Juli', eom: '' },
    { mth: 8, val: 7, label: 'Agustus', eom: '' },
    { mth: 9, val: 8, label: 'September', eom: '' },
    { mth: 10, val: 9, label: 'Oktober', eom: '' },
    { mth: 11, val: 10, label: 'Nopember', eom: '' },
    { mth: 12, val: 11, label: 'Desember', eom: '' }

  ]
  const th = yearSelected.value
  bu.forEach(bul => {
    const pe = new Date(parseInt(th), bul.val + 1, 0)
    bul.eom = date.formatDate(pe, 'YYYY-MM-DD')
  })
  periods.value = bu
  periode.value = ''
}
onMounted(() => {
  const curY = parseInt(date.formatDate(Date.now(), 'YYYY'))
  for (let index = 0; index < 11; index++) {
    years.value[index] = curY - 5 + index
  }
  gantiTahun()
  const bulIni = parseInt(date.formatDate(Date.now(), 'M')) !== 1 ? parseInt(date.formatDate(Date.now(), 'M')) - 1 : 12
  const per = periods.value.find(a => a.mth === bulIni)
  if (per) {
    periode.value = per
    gantiPeriode(per)
  }
  // console.log('bulan ini', bulIni, per)
})
</script>
