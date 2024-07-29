<template>
  <div class="column full-height">
    <q-bar class="col-auto bg-dark text-white">
      <div class="q-py-sm f-14 ">
        Form Diet
      </div>
    </q-bar>
    <div class="col full-height">
      <q-scroll-area style="height: calc(100% - 1px);">
        <q-form
          ref="formRef"
          class="row q-pa-md q-col-gutter-xs"
          @submit="saveOrder"
        >
          <div class="col-12">
            <q-checkbox
              v-for="(al, i) in store.notas"
              :key="i"
              v-model="store.diets"
              :val="al.rs2"
              :label="al.rs2"
              color="primary"
            />
            <!-- @update:model-value="updateSelection" -->
          </div>
          <div class="col-12">
            <q-input
              v-model="store.form.asessmen"
              label="Asessment"
              autogrow
              outlined
              standout="bg-yellow-3"
              icon="icon-mat-search"
              :rules="[val => !!val || 'Harap Isi pemeriksaan terlebih dahulu']"
              hide-bottom-space
            />
          </div>

          <div class="col-12">
            <q-separator class="q-my-sm" />
          </div>
          <div class="col-12">
            <div class="text-right">
              <q-btn
                label="Simpan & Kirim Permintaan"
                type="submit"
                color="primary"
                :loading="store.loadingOrder"
                :disable="store.loadingOrder"
              />
            </div>
          </div>
        </q-form>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import { useDietPoli } from 'src/stores/simrs/pelayanan/poli/diet'
import { onMounted, ref } from 'vue'

const store = useDietPoli()
const formRef = ref()
const props = defineProps({
  pasien: {
    type: Object,
    default: null
  }
})
console.log(props?.pasien)
// eslint-disable-next-line no-unused-vars
// function updateSelection(val) {
//   console.log(val)
//   console.log(store.diets)
//   store.setForm('diet', store.diets.join('. '))
// }
function saveOrder() {
  store.setForm('diet', store.diets.join('. '))
  store.saveOrder(props.pasien).then(() => {
    if (formRef.value) formRef.value.resetValidation()
  })
}
onMounted(() => {
  if (formRef.value) formRef.value.resetValidation()
})
</script>
