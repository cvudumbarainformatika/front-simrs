<template>
  <q-dialog>
    <div id="gue" ref="refGue">
      a
    </div>
  </q-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  html: { type: String, default: '' }
})
const refGue = ref(null)
watch(() => props.html, (obj) => {
  console.log(obj)
  if (obj) refGue.value.innerHtml = obj
  console.log(refGue.value?.innerHtml)
})
</script>
