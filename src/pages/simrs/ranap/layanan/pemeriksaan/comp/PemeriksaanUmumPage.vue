<template>
  <div class="row fit">
    <div class="col fit">
      <div class="full-height row q-col-gutter-x-xs">
        <div class=" full-height" :class="full ? 'col-12' : 'col-7'">
          <q-card flat bordered class="column fit" style="overflow: hidden;">
            <div class="col-auto">
              <BarComp title="Form Pemeriksaan Umum" bg-color="bg-primary" text-color="text-white" @full="full = !full" />
            </div>
            <q-card-section class="col full-height scroll">
              <q-form ref="myForm" class="" @submit="onSubmit">
                <FormPemeriksaanUmum :pasien="pasien" />
                <q-separator class="q-my-md" />
                <q-btn label="Simpan" type="submit" color="primary" />
              </q-form>
            </q-card-section>
          </q-card>
        </div>
        <div class="full-height" :class="full ? 'col-0' : 'col-5'">
          <q-card flat bordered class="fit column bg-transparent">
            <div class="col-auto">
              <BarComp title="List Pemeriksaan Umum" bg-color="bg-dark" text-color="text-white" :btn-full="false" />
            </div>
            <div class="col full-height scroll">
              {{ pasien }}
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const BarComp = defineAsyncComponent(() => import('../../components/BarComp.vue'))
const FormPemeriksaanUmum = defineAsyncComponent(() => import('./pemeriksaanUmum/FormPemeriksaanUmum.vue'))

defineProps({
  pasien: {
    type: Object,
    default: () => null
  }
})

const full = ref(false)

const onSubmit = () => {
  console.log('submit')
}
</script>
