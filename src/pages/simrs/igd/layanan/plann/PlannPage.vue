<template>
  <div class="full-height full-width">
    <div class="row full-height ">
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <FormPlann
          :key="props.pasien"
          :pasien="props.pasien"
          :ruangranap="props.ruangranap"
          tooltip="History Pasien (Shift + H)"
        />
      </q-card>
      <q-card
        flat
        bordered
        square
        class="col-6 full-height"
      >
        <ListPlann
          :key="props.pasien"
          :pasien="props.pasien"
          :loadingaja="loadingaja"
        />
      </q-card>
    </div>
  </div>
</template>

<script setup>
import FormPlann from './com/FormPlann.vue'
import ListPlann from './com/ListPlann.vue'
import { onMounted, onUnmounted, ref } from 'vue'

// const store = useAnamnesis()
const seamless = ref(false)
// const text = ref('')

const props = defineProps({
  pasien: {
    type: Object,
    default: null
  },
  ruangranap: {
    type: Object,
    default: null
  },
  loadingaja: {
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

// const clickslideRight = () => {
//   // console.log('ok')
//   seamless.value = !seamless.value
// }

</script>
