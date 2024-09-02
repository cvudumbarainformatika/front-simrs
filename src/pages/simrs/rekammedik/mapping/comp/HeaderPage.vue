<template>
  <div class="bg-primary text-white q-pa-md row justify-between items-center">
    <div class="f-14">
      Mapping Tindakan, ICD & Snowmed CT
      <div class="flex q-gutter-sm items-center q-mt-xs">
        <div>Cari Berdasarkan :</div>
        <q-radio
          dense v-for="b in bys" dark v-model="shape" :val="b" :label="b" color="orange" @update:model-value="(val)=> {
            if (val === 'Semua') {
              store.params.kodepoli = ''
              store.params.koderuangan = ''
              store.getTindakans()
            }
          }"
        />
        <div v-if="shape === 'Poli'">
          <q-select
            v-model="store.params.kodepoli"
            dense outlined dark color="white"
            :options="poli"
            label="Poli"
            emit-value
            map-options
            option-label="polirs"
            option-value="kodepoli"
            @update:model-value="store.getTindakans()"
          />
        </div>
      </div>
    </div>
    <div>
      <q-input
        v-model="store.params.q" dense outlined standout="bg-blue-5 text-dark" color="white" dark label-color="yellow" label="Cari Tindakan, Icd, or Snowmed" style="min-width: 250px;"
        @keydown.enter.prevent="()=> {
          store.params.page = 1
          store.getTindakans()
        }"
      >
        <template v-if="store.params.q !== ''" #append>
          <q-icon
            name="icon-mat-close"
            class="cursor-pointer"
            @click="()=> {
              store.params.q = ''
              store.params.page = 1
              store.getTindakans()
            }"
          />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { useMappingTindakanStore } from 'src/stores/simrs/rekammedik/mapping'
import { computed, onMounted, ref } from 'vue'

const bys = ref(['Semua', 'Poli', 'Ruangan'])

const shape = ref('Semua')

const app = useAplikasiStore()

const store = useMappingTindakanStore()

onMounted(() => {
  console.log('app', app.polis)
})

const poli = computed(() => {
  return app.polis
})
</script>
