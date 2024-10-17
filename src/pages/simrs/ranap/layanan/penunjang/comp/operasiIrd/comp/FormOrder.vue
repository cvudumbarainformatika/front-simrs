<template>
  <q-card class="fit q-pa-md">
    <q-form ref="formRef" @submit="onSubmit">
      <q-card-section>
        <div class="text-h6">
          <q-input
            outlined v-model="store.form.permintaan" label="Permintaan Operasi"
            type="textarea" rows="5"
            standout="bg-yellow-3"
            :rules="[val => !!val || 'Harap diisi']"
          />
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
import { usePermintaanOperasiIrdRanapStore } from 'src/stores/simrs/ranap/operasiird'
import { ref } from 'vue'

const store = usePermintaanOperasiIrdRanapStore()
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
