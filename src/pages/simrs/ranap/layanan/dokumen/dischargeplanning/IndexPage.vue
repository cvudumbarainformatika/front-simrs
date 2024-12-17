<template>
  <div class="fit column">
    <div class="col-auto ">
      <div class="q-pa-md flex justify-between bg-teal text-white items-center">
        <div>{{ menu?.label }}</div>
        <q-btn
          icon="icon-mat-print" flat dense size="md"
          v-print="printObj"
        />
      </div>
    </div>
    <div class="col full-height q-pa-md scroll">
      <SummaryPage id="resume" ref="refResume" :pasien="pasien" :menu="menu" />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue'

const SummaryPage = defineAsyncComponent(() => import('./SummaryPage.vue'))

const refResume = ref()

const printObj = {
  id: 'resume',
  popTitle: 'Resume Medis'

}

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
