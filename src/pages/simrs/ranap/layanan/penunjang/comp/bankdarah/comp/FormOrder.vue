<template>
  <div class="fit column scroll">
    <q-form @submit="onSubmit" class="q-pa-lg">
      <div class="row">
        <div class="row q-col-gutter-sm full-width">
          <div class="col-3">
            Jenis Darah
          </div>
          <q-select
            dense label="Jenis Darah" outlined standout="bg-yellow-3"
            v-model="store.form.jenis" :options="store.optionsJenis" hide-bottom-space class="col-9"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
            option-label="nama" option-value="nama"
            map-options emit-value
          />
          <div class="col-3">
            Golongan Darah
          </div>
          <q-select
            dense label="Golongan Darah" outlined standout="bg-yellow-3"
            v-model="store.form.gol" :options="store.optionsGol" hide-bottom-space class="col-9"
            :rules="[val => !!val || 'Harap Diisi terlebih dahulu']"
            option-label="nama" option-value="nama"
            map-options emit-value
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { usePermintaanBankDarahStore } from 'src/stores/simrs/ranap/bankdarah'

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  kasus: {
    type: Object,
    default: null
  }
})

const store = usePermintaanBankDarahStore()
console.log(props?.pasien?.noreg)

</script>
