<template>
  <div class="row fit">
    <div class="col fit">
      <div class="full-height row q-col-gutter-x-xs">
        <div class=" full-height" :class="full ? 'col-12' : 'col-8'">
          <q-card flat bordered class="column fit" style="overflow: hidden;">
            <div class="col-auto">
              <BarComp title="Form Penilaian" bg-color="bg-primary" text-color="text-white" @full="full = !full" />
            </div>
            <q-card-section class="col full-height scroll">
              <q-form ref="myForm" class="" @submit="onSubmit">
                <FormComp :pasien="pasien" :kasus="kasus" />
                <q-separator class="q-my-md" />
                <q-btn label="Simpan" type="submit" color="primary" />

                <div style="margin-bottom: 100px;" />
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <div v-if="!full" class="full-height col-4">
          <q-card flat bordered class="fit column bg-transparent">
            <div class="col-auto">
              <BarComp title="Informasi Penilain" bg-color="bg-dark" text-color="text-white" :btn-full="false" />
            </div>
            <div class="col full-height scroll">
              ooo
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePenilaianRanapStore } from 'src/stores/simrs/ranap/penilaian'
import { defineAsyncComponent, ref } from 'vue'

const BarComp = defineAsyncComponent(() => import('../../components/BarComp.vue'))
const FormComp = defineAsyncComponent(() => import('./penilaian/FormComp.vue'))
defineProps({
  pasien: {
    type: Object,
    default: () => null
  },
  kasus: {
    type: Object,
    default: () => null
  }
})

const full = ref(false)
const myForm = ref(null)

const store = usePenilaianRanapStore()

const onSubmit = () => {
  store.saveData()
  // myForm.value.validate().then((success) => {
  //   if (success) {
  //     myForm.value.reset()
  //   }
  // })
}
</script>
