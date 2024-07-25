<template>
  <div class="row">
    <div class="col-auto">
      <selectObat
        v-model="obat"
        :depo="depo"
      />
    </div>
  </div>
</template>
<script setup>
import { useAplikasiStore } from 'src/stores/app/aplikasi'
import { computed, defineAsyncComponent, ref, shallowRef } from 'vue'
const apps = useAplikasiStore()
const obat = ref(null)
const selectObat = shallowRef(defineAsyncComponent(() => import('./SelectObat.vue')))
const depo = computed(() => {
  const kode = apps?.user?.kdruangansim
  console.log('p', kode)
  return kode
})
</script>
