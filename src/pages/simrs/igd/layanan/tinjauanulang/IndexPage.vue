<template>
  <div class="full-height full-width">
    <div class="row full-height ">
      <q-card
        flat
        bordered
        square
        class="col-12 full-height"
      >
        <ListTinjauanUlangPage
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ListTinjauanUlangPage from './comp/ListTinjauanUlangPage.vue'
import { useTinjauanUlangStore } from 'src/stores/simrs/igd/tinjauanulang'

const store = useTinjauanUlangStore()

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingaja: {
    type: Boolean,
    default: false
  }
})

onMounted(() => {
  store.ambiltriage(props.pasien?.noreg)
  store.ambilanamnese(props.pasien?.noreg)
})

</script>
