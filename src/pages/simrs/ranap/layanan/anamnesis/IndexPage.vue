<template>
  <div class="row fit q-pa-xs">
    <div class="col">
      <div class="row q-col-gutter-xs fit">
        <div :class="`${full ? 'col-12' : 'col-7'} full-height`">
          <div class="fit bg-white column">
            <div class="col-auto">
              <BarComp title="Form Anamnesse" bg-color="bg-white" text-color="text-dark" @full="full = !full" />
              <q-separator />
            </div>
            <q-form class="col full-height q-pa-md scroll">
              <FormAnamnesis />
            </q-form>
          </div>
        </div>
        <div :class="`full-height ${full ? 'col-0' : 'col-5'}`">
          <div class="fit bg-red">
            LIST
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'
const BarComp = defineAsyncComponent(() => import('./comp/BarComp.vue'))
const FormAnamnesis = defineAsyncComponent(() => import('./FormAnamnesis.vue'))

const full = ref(false)
</script>
