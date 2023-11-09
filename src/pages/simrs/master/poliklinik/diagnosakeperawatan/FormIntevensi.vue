<template>
  <div>
    <div class="q-pa-sm text-weight-bold">
      {{ diagnosa?.kode }} - {{ diagnosa?.nama }}
    </div>
    <q-separator />
    <ObservasiInput />
    <TerapeutikInput />
    <EdukasiInput />
    <KolaborasiInput />
    <q-separator class="q-my-xl" />
  </div>
</template>

<script setup>
import ObservasiInput from './ObservasiInput.vue'
import TerapeutikInput from './TerapeutikInput.vue'
import EdukasiInput from './EdukasiInput.vue'
import KolaborasiInput from './KolaborasiInput.vue'
defineProps({
  diagnosa: {
    type: Object,
    default: null
  }
})

</script>
