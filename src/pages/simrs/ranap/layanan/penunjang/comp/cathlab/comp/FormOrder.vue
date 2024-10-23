<template>
  <div class="fit column scroll">
    <q-form ref="formRef" @submit="onSubmit" class="q-pa-lg">
      <div class="row">
        <div class="row q-col-gutter-sm full-width">
          <div class="col-3">
            Keterangan
          </div>
          <div class="col-9">
            <q-input v-model="store.form.keterangan" label="Keterangan" outlined standout="bg-yellow-3" type="textarea" rows="3" />
          </div>

          <div class="col-3">
            Dokter Pengirim
          </div>
          <div class="col-9">
            <app-autocomplete-new
              ref="refPerawat"
              :model="store.form.dokterpengirim"
              label="Dokter"
              autocomplete="nama"
              option-value="kdpegsimrs"
              option-label="nama"
              outlined
              :source="store.dokters"
              @on-select="(val)=> {
                store.form.dokterpengirim = val
              }"
            />
          </div>
        </div>
      </div>
      <q-separator class="q-my-md" />
      <div class="row full-width justify-end">
        <q-btn :loading="store.loadingOrder" :disable="store.loadingOrder" label="Kirim Permintaan" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { usePermintaanCathlabStore } from 'src/stores/simrs/ranap/cathlab'
import { ref } from 'vue'

// eslint-disable-next-line no-unused-vars
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

const store = usePermintaanCathlabStore()
const formRef = ref(null)

function onSubmit () {
  // console.log('onSubmit', store.form)
  store.saveOrder(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}

</script>
