<template>
  <div
    class="row items-center justify-between q-pa-sm no-wrap"
    :class="`${props.color} text-${props.textColor}`"
  >
    <div class="row">
      <div class="q-mr-sm">
        <app-input-date
          :model="store.params.tglawal"
          outlined
          dark
          label="Dari Tanggal"
          :loading="store.loading"
          :disable="store.loading"
          @set-model="store.setParam('tglawal', $event)"
        />
      </div>
      <div class="q-mr-sm">
        <app-input-date
          :model="store.params.tglakhir"
          outlined
          dark
          label="Sampai Tanggal"
          :loading="store.loading"
          :disable="store.loading"
          @set-model="store.setParam('tglakhir', $event)"
        />
      </div>
      <div class="q-mr-sm">
        <app-autocomplete
          v-model="store.params.filter"
          outlined
          dark
          label="Pilih filter"
          autocomplete="nama"
          option-label="nama"
          option-value="value"
          :loading="store.loading"
          :disable="store.loading"
          :source="store.filters"
        />
      </div>
      <div class="q-mr-sm">
        <q-input
          v-model="store.fNama"
          outlined
          dark
          dense
          label="cari nama"
          @update:model-value="store.filterItem"
        />
      </div>
      <div class="q-mr-sm">
        <app-btn
          push
          label="Ambil Data"
          @click="emits('refresh')"
        />
      </div>
    </div>
    <div class="row">
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
          Ambil / Refresh Data
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
import { useSuratKontrolPoliStore } from 'src/stores/simrs/pelayanan/poli/suratkontrol'

const store = useSuratKontrolPoliStore()
const emits = defineEmits(['fullscreen', 'setTanggal', 'setSearch', 'setRow', 'setPeriode', 'filter', 'normal'])
const props = defineProps({
  color: {
    type: String,
    default: 'bg-primary'
  },
  textColor: {
    type: String,
    default: 'white'
  },
  full: { type: Boolean, default: false }
})
</script>
