<template>
  <div>
    <div class="row q-pa-sm text-weight-bold justify-between">
      <div>{{ diagnosa?.kode }} - {{ diagnosa?.nama }}</div>
      <div>
        <q-btn
          label="back"
          dense
          flat
          size="sm"
          color="primary"
          @click="emits('back')"
        />
      </div>
    </div>
    <q-separator />
    <PlannInput />
    <ObservasiInput />
    <TerapeutikInput />
    <EdukasiInput />
    <KolaborasiInput />
    <q-separator class="q-my-xl" />
  </div>
</template>

<script setup>
import PlannInput from './PlannInput.vue'
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

const emits = defineEmits(['back'])

</script>
