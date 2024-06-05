<template>
  <div class="fit column relative-position">
    <div class="col-auto">
      <header-comp />
    </div>
    <div class="col fit bg-white scroll">
      {{ store.pasien }}
    </div>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import HeaderComp from './HeaderComp.vue'
import { useListPasienHemodialisaStore } from 'src/stores/simrs/hemodialisa/hemodialisa'

const store = useListPasienHemodialisaStore()

onMounted(() => {
  const thumb = []
  for (let i = 70; i <= 160; i += 5) {
    thumb.push(i)
  }
  console.log(thumb)
})
</script>
