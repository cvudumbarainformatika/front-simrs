<template>
  <div class="col-auto bg-teal text-white">
    <div class="q-pa-sm text-weight-bold">
      FORM MASTER INTERVENSI  <div class="text-dark">
        {{ store?.diagnosa?.kode }} {{ store.diagnosa?.nama }}
      </div>
    </div>
  </div>
  <div class="col full-height scroll">
    <div class="q-pa-md">
      <div class="row">
        <q-input
          v-model="groupIntervernsi"
          label="Tambah Group Intervensi"
          outlined
          standout="bg-yellow-3"
          dense
          autofocus
          @update:model-value="store.addGroupIntervensi"
        />
      </div>

      <div class="column">
        <template
          v-for="(gr, i) in store.groupIntervensis"
          :key="i"
        >
          <div class="text-weight-bold">
            {{ gr }}
          </div>
        </template>
      </div>
    </div>

    <q-separator />
    <div class="row justify-between q-pa-md">
      <div class="kiri">
        <q-btn
          color="dark"
          @click="store.setIntervensi(null)"
        >
          Kembali
        </q-btn>
      </div>
      <div class="kanan">
        kanan
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMasterDiagnosaKebidanan } from 'src/stores/simrs/master/poliklinik/diagnosakebidanan'
import { ref } from 'vue'

const store = useMasterDiagnosaKebidanan()
const groupIntervernsi = ref(null)
</script>
