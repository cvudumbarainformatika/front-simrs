<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-6 full-height">
        <FromChatlab
          :key="props.pasien"
          :pasien="props.pasien"
          tooltip="History Pasien (Shift + H)"
        />
      </div>
      <div class="col-6 full-height">
        <ListCathlab
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
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
    <!-- <app-drawer-right-new
      :key="props.pasien"
      :seamless="seamless"
      :pasien="props.pasien"
      @click-btn="clickslideRight"
    >
      <template #content>
        <HistoryKanan
          :key="pasien"
          :pasien="pasien"
          title="HISTORY ANAMNESSIS LALU"
        />
      </template>
    </app-drawer-right-new> -->
  </div>
</template>

<script setup>
import FromChatlab from './FromChatlab.vue'
import ListCathlab from './ListCathlab.vue'
// eslint-disable-next-line no-unused-vars
// import HistoryAnamnesis from './comanamnesis/HistoryAnamnesis.vue'
// import HistoryKanan from './comanamnesis/HistoryKanan.vue'
import { onMounted, onUnmounted, ref } from 'vue'

// const store = useAnamnesis()
const seamless = ref(false)
// const text = ref('')

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

// const clickslideRight = () => {
//   // console.log('ok')
//   seamless.value = !seamless.value
// }

</script>
