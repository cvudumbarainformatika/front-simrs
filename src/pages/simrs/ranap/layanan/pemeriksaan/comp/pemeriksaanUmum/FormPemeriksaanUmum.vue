<template>
  <div class="row q-col-gutter-xs full-width">
    <q-select
      v-model="store.form.keadaanUmum"
      dense
      standout="bg-yellow-3 text-black"
      outlined
      label="Tingkat Kesadaran"
      :options="store.keadaanUmums"
      stack-label
      class="col-4"
      input-class="ellipsis"
      fill-input
      hide-dropdown-icon
      :rules="[val => !!val || 'Harap diisi']"
      hide-bottom-space
    />
    <app-input-simrs label="BB (kg)" class-tambahan="col-2" v-model="store.form.bb" :valid="{ number: true }" :lazy-rules="false" />
    <app-input-simrs label="TB (cm)" class="col-2" v-model="store.form.tb" :valid="{ number: true }" />
    <app-input-simrs label="N (x/mnt)" class="col-2" v-model="store.form.nadi" :valid="{ number: true }" :lazy-rules="true" />
    <app-input-simrs label="Sis (mmHg)" class="col-2" v-model="store.form.sistole" :valid="{ number: true }" :lazy-rules="true" />
    <app-input-simrs label="Dia (mmHg)" class="col-2" v-model="store.form.diastole" :valid="{ number: true }" :lazy-rules="true" />
    <app-input-simrs label="RR (x/mnt)" class="col-2" v-model="store.form.pernapasan" :valid="{ number: true }" :lazy-rules="true" />
    <q-select
      v-model="store.form.tkKesadaran"
      dense
      standout="bg-yellow-3 text-black"
      outlined
      label="Tingkat Kesadaran"
      :options="store.optionsTingkatkesadaran"
      stack-label
      emit-value
      map-options
      input-class="ellipsis"
      fill-input
      hide-dropdown-icon
      hide-bottom-space
      class="col-8"
    />
  </div>
</template>

<script setup>
import { usePemeriksaanUmumRanapStore } from 'src/stores/simrs/ranap/pemeriksaanumum'
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

const store = usePemeriksaanUmumRanapStore()
</script>
