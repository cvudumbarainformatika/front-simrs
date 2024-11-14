<template>
  <div class="fit q-pa-xs">
    <q-splitter
      v-model="splitterModel"
      :limits="[0, 100]"
      before-class="overflow-hidden"
      after-class="overflow-hidden"
      class="fit"
    >
      <template #before>
        <div class="column full-height bg-white scroll">
          <FormPage :pasien="pasien" :menu="menu" />
        </div>
      </template>

      <template #after>
        <div class="column full-height">
          <!-- <div v-if="!pasien?.dischargeplanning?.length" class="column full-height flex-center">
            <div>Belum Ada Data</div>
          </div>
          <div v-else class="full-height scroll">
            <LisComp :items="pasien?.dischargeplanning" :pasien="pasien" />
          </div> -->
        </div>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
import { defineAsyncComponent, ref } from 'vue'

const FormPage = defineAsyncComponent(() => {
  return import('./comp/FormPage.vue')
})

// const LisComp = defineAsyncComponent(() => {
//   return import('./comp/ListComp.vue')
// })

const splitterModel = ref(100)

defineProps({
  pasien: {
    type: Object,
    default: null
  },
  menu: {
    type: Object,
    default: null
  }
})
</script>
