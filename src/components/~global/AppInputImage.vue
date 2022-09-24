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
    />
  </div>
</template>
<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  model: {
    type: String,
    default: null
  }
})

const emits = defineEmits(['update:model'])

const tempImg = computed({
  get() {
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
