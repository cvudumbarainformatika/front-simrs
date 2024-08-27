<template>
  <div class="q-pa-md bg-dark text-white">
    <div v-if="store.meta" class="row justify-between items-center">
      <div>Total Data : {{ store.meta?.total }}</div>
      <q-pagination
        v-model="store.params.page"
        :max="store.meta.last_page"
        :max-pages="3"
        boundary-numbers
        color="orange"
        @update:model-value="(val)=>{
          console.log('val', val);
          store.getTindakans()
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { useMappingTindakanStore } from 'src/stores/simrs/rekammedik/mapping'
const store = useMappingTindakanStore()
</script>
