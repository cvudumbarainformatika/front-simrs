<template>
  <div
    class="full-height q-pa-sm"
  >
    <div class="row q-col-gutter-x-xs full-height">
      <div class="col-6 full-height">
        <FormKonsul
          :key="props.pasien"
          :pasien="props.pasien"
          tooltip="History Pasien (Shift + H)"
        />
      </div>
      <div class="col-6 full-height">
        <ListKonsul
          v-if="!isDetail"
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
          :auth="user" @detail="lihatDetail"
        />
        <DetailForm
          v-else
          :item="detail"
          :auth="user"
          :pasien="props.pasien"
          @to-list="isDetail = false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useKonsulIgdStore } from 'src/stores/simrs/igd/konsul'
import FormKonsul from './comp/FormKonsul.vue'
import ListKonsul from './comp/ListKonsul.vue'
import DetailForm from './comp/DetailForm.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const seamless = ref(false)
const store = useKonsulIgdStore()

const detail = ref(null)
const isDetail = ref(false)

const lihatDetail = (data) => {
  // console.log('detail', data)
  detail.value = data
  isDetail.value = true
}

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
  store.initReset()
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

</script>
