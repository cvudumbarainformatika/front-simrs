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
        <!-- <app-autocomplete
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
        /> -->
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
      <!-- add -->
      <!-- <q-btn
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
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'refresh', 'add', 'setPeriode'])
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
  fullscreen: { type: Boolean, default: false }
})

const popup = ref()

function lihatRef() {
  console.log(popup.value)
  popup.value.hide()
}
const selectPerPage = computed({
  get () { return props.perPage },
  set (val) { emits('setRow', val) }
})
const tgl = computed({
  get() {
    return props.tanggal
  },
  set(newVal) {
    emits('setTanggal', newVal)
  }
})
const q = computed({
  get() {
    return props.search
  },
  set(newVal) {
    emits('setSearch', newVal)
  }
})

const years = ref([])
const yearSelected = ref(date.formatDate(Date.now(), 'YYYY'))
const periode = ref()
const periods = ref([])
// function gantiPeriode(val) {
//   console.log('ganti', val)

//   emits('setPeriode', val?.eom)
// }
function gantiTahun() {
  const bu = [
    { val: 0, label: 'Januari', eom: '' },
    { val: 1, label: 'Pebruari', eom: '' },
    { val: 2, label: 'Maret', eom: '' },
    { val: 3, label: 'April', eom: '' },
    { val: 4, label: 'Mei', eom: '' },
    { val: 5, label: 'Juni', eom: '' },
    { val: 6, label: 'Juli', eom: '' },
    { val: 7, label: 'Agustus', eom: '' },
    { val: 8, label: 'September', eom: '' },
    { val: 9, label: 'Oktober', eom: '' },
    { val: 10, label: 'Nopember', eom: '' },
    { val: 11, label: 'Desember', eom: '' }

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
})
</script>
