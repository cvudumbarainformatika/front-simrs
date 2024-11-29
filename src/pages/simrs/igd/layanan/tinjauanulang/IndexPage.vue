<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-12 full-height">
        <ListTinjauanUlangPage
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </div>
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
})

</script>
