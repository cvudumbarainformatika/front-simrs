<template>
  <q-card class="fit q-pa-md">
    <q-form ref="formRef" @submit="onSubmit">
      <q-card-section>
        <div class="q-gutter-xs">
          <q-input
            outlined v-model="store.form.permintaan" label="Permintaan Operasi"
            type="textarea" rows="5"
            standout="bg-yellow-3"
            :rules="[val => !!val || 'Harap diisi']"
          />

          <!-- <div v-if="unit==='ranap'" class="col-12"> -->
          <app-autocomplete-new
            ref="refPerawat"
            :model="store.form.kodedokter"
            label="Dokter yg meminta"
            autocomplete="nama"
            option-value="kdpegsimrs"
            option-label="nama"
            outlined
            :source="store.dokters"
            @clear="store.form.kodedokter = null"
            @on-select="(val)=> {
              store.form.kodedokter = val
              const ceck = store.dokters.find(item => item.kdpegsimrs === val) ?? null
              // store.form.perawatyanmeminta = ceck?.nama

            }"
          />
          <!-- </div> -->
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          :loading="store.loadingOrder"
          :disable="store.loadingOrder"
          label="Simpan Permintaan"
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { usePermintaanOperasiRanapStore } from 'src/stores/simrs/ranap/operasi'
import { ref } from 'vue'

const store = usePermintaanOperasiRanapStore()
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
const formRef = ref()
function onSubmit () {
  store.saveOrder(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}
</script>
