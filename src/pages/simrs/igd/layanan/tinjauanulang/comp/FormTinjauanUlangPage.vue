<template>
  <q-dialog v-model="store.basic" transition-show="rotate" transition-hide="rotate">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Form Peninjauan Ulang (FPU)
        </div>
        <q-separator />
      </q-card-section>

      <q-card-section class="flat">
        <div class="row">
          <div class="col-12 q-py-sm">
            <q-input label="Keluhan" dense outlined />
          </div>
        </div>
        <div class="row ">
          <div class="col-2 q-pr-xs">
            <q-input label="Nadi" dense outlined type="number" />
          </div>
          <div class="col-2 q-pr-xs">
            <q-input label="Pernafasan" dense outlined type="number" />
          </div>
          <div class="col-2 q-pr-xs">
            <q-input label="Sistole" dense outlined type="number" />
          </div>
          <div class="col-2 q-pr-xs">
            <q-input label="Diastole" dense outlined type="number" />
          </div>
          <div class="col-2 q-pr-xs">
            <q-input label="Suhu" dense outlined type="number" />
          </div>
          <div class="col-2 q-pr-xs">
            <q-input label="SPo2 (%)" dense outlined type="number" />
          </div>
        </div>
        <div class="row ">
          <div class="col-2 q-pr-xs text-center">
            {{ store.form.skornadi }}
          </div>
          <div class="col-2 q-pr-xs text-center">
            {{ store.form.pernafasan }}
          </div>
          <div class="col-2 q-pr-xs text-center">
            {{ store.form.sistole }}
          </div>
          <div class="col-2 q-pr-xs text-center">
            {{ store.form.distole }}
          </div>
          <div class="col-2 q-pr-xs text-center">
            {{ store.form.suhu }}
          </div>
          <div class="col-2 q-pr-xs text-center">
            {{ store.form.spo2 }}
          </div>
        </div>
        <div class="row q-py-sm">
          <div class="col-12 q-pr-xs">
            <q-select v-model="store.form.kesadaran" label="Kesadaran" :options="optionkesadaran" dense outlined />
          </div>
        </div>
        <div class="row">
          <div class="col-4 q-pr-xs">
            <q-select v-model="store.form.eye" label="Eye" :options="optioneye" dense outlined />
          </div>
          <div class="col-4 q-pr-xs">
            <q-select v-model="store.form.verbal" label="Verbal" :options="optionverbal" dense outlined />
          </div>
          <div class="col-4 q-pr-xs">
            <q-select v-model="store.form.motorik" label="Motorik" :options="optionmotorik" dense outlined />
          </div>
        </div>
        <div class="row" v-if="props?.pasien?.anamnesis[0]?.anamnesebps !== null">
          <div class="col-4">
            <q-select
              label="Ekspresi Wajah"
              transition-show="flip-up"
              transition-hide="flip-down"
              dense
              outlined
              :options="ekspresiwajah"
              @update:model-value="(val) => nilaiexpresiwajah(val)"
            />
          </div>
          <div class="col-4">
            <q-select dense outlined v-model="store.form.gerakantangan" :options="gerakantangan" @update:model-value="(val) => nilaigerakantangan(val)" />
          </div>
          <div class="col-4">
            <q-select dense outlined v-model="store.form.kepatuhanventilasimekanik" :options="kepatuhanventilasimekanik" @update:model-value="(val) => nilaikepatuhanventilasi(val)" />
          </div>
        </div>
        <div class="row" v-if="props?.pasien?.anamnesis[0]?.anamnesenips !== null">
          <div class="col-6 text-bold">
            NIPS (Neonatus Infant Pain Scale)
          </div>
          <div class="col-6">
            - Ekspresi Wajah
          </div>
          <div class="col-6">
            <q-select dense outlined v-model="store.form.ekspresiwajahnips" :options="ekspresiwajahnips" @update:model-value="(val) => nilaiekspresiwajahnips(val)" />
          </div>
          <div class="col-6">
            - Menangis
          </div>
          <div class="col-6">
            <q-select dense outlined v-model="store.form.menangis" :options="menangis" @update:model-value="(val) => nilaimenangis(val)" />
          </div>
          <div class="col-6">
            - Pola Nafas
          </div>
          <div class="col-6">
            <q-select dense outlined v-model="store.form.polanafas" :options="polanafas" @update:model-value="(val) => nilaipolanafas(val)" />
          </div>
          <div class="col-6">
            - Lengan
          </div>
          <div class="col-6">
            <q-select dense outlined v-model="store.form.lengan" :options="lengan" @update:model-value="(val) => nilailengan(val)" />
          </div>
          <div class="col-6">
            - Kaki
          </div>
          <div class="col-6">
            <q-select dense outlined v-model="store.form.kaki" :options="kaki" @update:model-value="(val) => nilaikaki(val)" />
          </div>
          <div class="col-6">
            - Keadaan Rangsangan
          </div>
          <div class="col-6">
            <q-select dense outlined v-model="store.form.keadaanrangsangan" :options="keadaanrangsangan" @update:model-value="(val) => nilairangsangan(val)" />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useTinjauanUlangStore } from 'src/stores/simrs/igd/tinjauanulang'
import { ref } from 'vue'

const store = useTinjauanUlangStore()

const optioneye = ref(['0', '1', '2', '3', '4'])
const optionverbal = ref(['0', '1', '2', '3', '4', '5'])
const optionmotorik = ref(['0', '1', '2', '3', '4', '5', '6'])

const optionkesadaran = ref(['Alert', 'Verbal', 'Pain', 'Unrespon'])

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})
</script>
