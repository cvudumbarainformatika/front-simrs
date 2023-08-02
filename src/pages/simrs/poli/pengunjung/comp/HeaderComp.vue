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
      <q-btn
        flat
        dense
        :color="textColor"
        icon="icon-mat-event"
        :label="tanggal"
        size="sm"
        class="q-ml-sm"
      >
        <q-popup-proxy ref="popup">
          <q-date

            v-model="date"
            minimal
            mask="YYYY-MM-DD"
            @update:model-value="lihatRef"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn
        flat
        :color="textColor"
        icon="icon-mat-dataset"
        :label="txt"
        size="sm"
        class="q-ml-sm"
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
    </div>
    <div>
      <!-- per_page -->
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
        <!-- <q-menu
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
        </q-menu> -->
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
import { dateDbFormat } from 'src/modules/formatter'
import { computed, ref } from 'vue'
const txt = ref('SEMUA')
const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'refresh'])
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
  full: { type: Boolean, default: false }
})

const popup = ref()

function lihatRef() {
  console.log(popup.value)
  popup.value.hide()
}
// const selectPerPage = computed({
//   get () { return props.perPage },
//   set (val) { emits('setRow', val) }
// })
const date = computed({
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
</script>
