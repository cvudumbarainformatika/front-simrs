<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-6 full-height">
        <FormPersiapan
          :key="props.pasien"
          :pasien="props.pasien"
        />
      </div>
      <div class="col-6 full-height bg-white" style="overflow: scroll;">
        <ListPersiapan
          :key="props.pasien"
          :pasien="props.pasien"
          :loading-terima="loadingTerima"
        />
      </div>
    </div>

    <!-- dialog -->

    <!-- <HistoryAnamnesis
      :key="props.pasien"
      :seamless="seamless"
      :pasien="props.pasien"
      @close="seamless =!seamless"
    /> -->
    <app-drawer-right-new
      :key="props.pasien"
      :seamless="seamless"
      :pasien="props.pasien"
      @click-btn="clickslideRight"
    >
      <template #content>
        <!-- <HistoryKanan
          :key="pasien"
          :pasien="pasien"
          title="HISTORY ANAMNESSIS LALU"
        /> -->
      </template>
    </app-drawer-right-new>
  </div>
</template>

<script setup>
import ListPersiapan from './comppersiapanoperasi/ListPersiapanoperasi.vue'
import FormPersiapan from './comppersiapanoperasi/FormPersiapanoperasi.vue'
// eslint-disable-next-line no-unused-vars
import { onMounted, onUnmounted, ref } from 'vue'

// const store = useAnamnesis()
const seamless = ref(false)
// const text = ref('')

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  loadingTerima: {
    type: Boolean,
    default: false
  }
})
onMounted(() => {
  // console.log(text.value)
  document.addEventListener('keypress', handleKeypress, false)
})

onUnmounted(() => {
  document.removeEventListener('keypress', handleKeypress, true)
})

const handleKeypress = (evt) => {
  if (evt.key === 'H' && evt.shiftKey) {
    seamless.value = !seamless.value
  }
}

const clickslideRight = () => {
  // console.log('ok')
  seamless.value = !seamless.value
}

</script>
