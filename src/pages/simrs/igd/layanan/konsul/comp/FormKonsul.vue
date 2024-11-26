<template>
  <div class="fit column scroll">
    <q-form ref="formRef" @submit="onSubmit" class="q-pa-lg">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <div><b>Mohon bantuan dokter : </b></div>
          <app-autocomplete-new
            ref="refPerawat"
            :model="store.form.kddokterkonsul"
            label="Dokter"
            autocomplete="nama"
            option-value="kdpegsimrs"
            option-label="nama"
            outlined
            :source="store.dokters"
            @on-select="(val)=> {
              store.form.kddokterkonsul = val
            }"
            @clear="store.form.kddokterkonsul = null"
          />
          <div class="q-mt-lg">
            <b>Untuk : </b>
          </div>
          <app-autocomplete-new
            ref="refPerawat"
            :model="store.form.kduntuk"
            label="untuk"
            autocomplete="label"
            option-value="value"
            option-label="label"
            outlined
            :source="store.untuks"
            @on-select="(val)=> {
              store.form.kduntuk = val
              store.form.ketuntuk = store.untuks?.find(e => e?.value === val)?.label
            }"
            @clear="store.form.kduntuk = null"
          />
          <q-input v-model="store.form.permintaan" type="textarea" outlined standout="bg-yellow-3" rows="8" />
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
import { ref } from 'vue'
import { useKonsulIgdStore } from 'src/stores/simrs/igd/konsul'
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

const store = useKonsulIgdStore()
const formRef = ref(null)

function onSubmit () {
  // console.log('onSubmit', store.form)
  store.saveData(props.pasien)
    .then(() => {
      formRef.value.resetValidation()
    })
}

</script>
