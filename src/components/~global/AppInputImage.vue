<template>
  <div>
    <q-img
      :src="previewImage"
      fit="fill"
      class="full-height cursor-pointer"
      @click="imgClick()"
    />
    <q-file
      ref="fileRef"
      :model-value="tempImg"
      filled
      dense
      label="Gambar"
      accept="image/*"
      class="q-mb-md"
      @update:model-value="kirim"
    />
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  model: {
    type: [String, Object],
    // type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: null
  }
})

const emits = defineEmits(['update:model', 'onFile'])
function kirim(val) {
  emits('onFile', val)
}
const tempImg = computed({
  get() {
    // console.log('model', props.model)
    return props.model
  },
  set(newVal) {
    emits('update:model', newVal)
  }
})
const fileRef = ref(null)
const previewImage = computed(() => {
  const imgUrl = tempImg.value
  if (imgUrl === null) {
    return new URL('../../assets/images/no-image.png', import.meta.url).href
  }
  return URL.createObjectURL(imgUrl)
})

function imgClick() {
  fileRef.value.pickFiles()
}
</script>
