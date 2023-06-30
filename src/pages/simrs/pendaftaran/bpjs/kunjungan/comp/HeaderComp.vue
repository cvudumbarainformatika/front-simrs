<template>
  <div
    class="row items-center justify-between q-pa-sm"
    :class="`${color} text-${textColor}`"
  >
    <div>
      <q-input
        v-model="text"
        outlined
        dark
        color="white"
        dense
        placeholder="Cari Kunjungan ..."
      />
    </div>
    <div>
      <q-btn
        flat
        :color="textColor"
        icon-right="icon-mat-event"
        label="tanggal"
        size="sm"
        padding="xs"
        class="q-mr-sm"
      >
        <q-popup-proxy>
          <q-date
            v-model="date"
            minimal
            mask="YYYY-MM-DD"
          />
        </q-popup-proxy>
      </q-btn>
      <q-btn
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
      <q-btn
        flat
        :color="textColor"
        :icon="!fullscreen?'icon-mat-open_in_full':'icon-mat-close_fullscreen'"
        size="xs"
        padding="xs"
        @click="emits('fullscreen')"
      />
    </div>
  </div>
</template>

<script setup>
import { dateDbFormat } from 'src/modules/formatter'
import { computed, ref } from 'vue'
const txt = ref('SEMUA')
const txts = ref(['SEMUA', 'TERLAYANI', 'BELUM TERLAYANI'])
const emits = defineEmits(['fullscreen', 'setTanggal'])
const props = defineProps({
  color: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'white'
  },
  tanggal: {
    type: String,
    default: dateDbFormat(new Date())
  },
  fullscreen: { type: Boolean, default: false }
})

const text = ref(null)

const date = computed({
  get() {
    return props.tanggal
  },
  set(newVal) {
    emits('setTanggal', newVal)
  }
})
</script>
