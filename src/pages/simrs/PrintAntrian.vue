<template>
  <div id="printMe">
    <div>
      Cobak Print Antrian
    </div>

    <q-btn
      ref="printBtn"
      label="print coba"
      @click="print"
    />
  </div>
</template>

<script setup>
// import VueHtmlToPaper from 'src/boot/VueHtmlToPaper'
import { onMounted, ref } from 'vue'

const printBtn = ref()

onMounted(() => {
  console.log('mounted print')
})

function print() {
  this.$htmlToPaper('printMe')
}
</script>
