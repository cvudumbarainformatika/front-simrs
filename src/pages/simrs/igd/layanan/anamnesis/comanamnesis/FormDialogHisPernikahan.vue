<template>
  <q-dialog v-model="store.fixed">
    <q-card>
      <q-form
        ref="refForm"
        @submit="onSubmit"
        class="column full-height"
      >
        <q-card-section>
          <div class="text-h6 text-center">
            Form History Pernikahan
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <div class="row q-gutter-sm">
            <div class="col-12">
              <q-input v-model="store.form.suamike" outlined type="number" dense label="Suami Ke" />
            </div>
            <div class="col-12">
              <q-input v-model="store.form.lamapernikahan" outlined type="number" dense label="Lama Pernikahan(Tahun)" />
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn label="Cancel" color="red" v-close-popup />
          <q-btn label="Simpan" color="primary" type="submit" :loading="store.loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useHistoryPernikahanStore } from 'src/stores/simrs/igd/historypernikahanpasien'
import { ref } from 'vue'

const store = useHistoryPernikahanStore()
const refForm = ref()

function onSubmit () {
  console.log('sasa')
  store.saveData(props.pasien).then(() => {
    refForm.value.resetValidation()
  })
}

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})

</script>
