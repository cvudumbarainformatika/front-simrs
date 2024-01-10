<template>
  <div
    class="row full-height full-width bg-grey-4 shadow-1"
  >
    <div class="col-8 full-height q-pa-xs">
      <form-resep
        :pasien="props?.pasien"
        :depo="props?.depo"
      />
    </div>
    <div class="col-4 full-height q-pa-xs">
      <listpage />
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent, shallowRef } from 'vue'
import FormResep from './comp/FormResep.vue'
const props = defineProps({
  pasien: { type: Object, default: null },
  depo: { type: String, default: '' }
})

const listpage = shallowRef(defineAsyncComponent(() => import('./comp/LitsPage.vue')))
</script>
