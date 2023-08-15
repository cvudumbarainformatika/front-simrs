<template>
  <!-- <span
    class="image-container"
    :class="{ 'selected': selected || resizing }"
    contenteditable="true"
  > -->
  <img
    :src="url"
    :width="width"
    class="cursor-pointer"
    :class="{ 'selected': selected || resizing}"
    style="z-index: 100;"
    @click="selectImage()"
  >
  <!-- </span> -->
</template>

<script setup>
import { ref } from 'vue'

// import { clamp } from 'src/modules/shared'
// import { computed, onMounted, ref } from 'vue'

const selected = ref(false)

defineProps({
  url: {
    type: String, default: 'http://dummyimage.com/160x90'
  },
  width: {
    type: Number, default: 100
  }
})

const resizing = ref(false)

function selectImage (e) {
  console.log('selectImage', e)
  selected.value = true
}

</script>
